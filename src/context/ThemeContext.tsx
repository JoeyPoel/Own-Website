import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'

export type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const THEME_STORAGE_KEY = 'jp_portfolio_theme'

/**
 * Provider component for managing global light/dark theme state.
 * Defaults to 'light' as requested by the user, and persists preference in localStorage.
 * Updates DOM root classes and data attributes so CSS variables and Tailwind classes synchronize.
 *
 * @param props.children - Child React components.
 * @returns Master ThemeProvider wrapping context.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY)
      if (stored === 'dark' || stored === 'light') {
        return stored
      }
    } catch {
      // ignore localStorage security errors
    }
    // Default to white/light theme as requested
    return 'light'
  })

  const setTheme = (nextTheme: Theme) => {
    setThemeState(nextTheme)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
    } catch {
      // ignore
    }
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
      root.setAttribute('data-theme', 'dark')
      root.setAttribute('data-scheme', 'dark')
      root.style.colorScheme = 'dark'
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
      root.setAttribute('data-theme', 'light')
      root.setAttribute('data-scheme', 'light')
      root.style.colorScheme = 'light'
    }
  }, [theme])

  const contextValue = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [theme]
  )

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}

/**
 * Hook to consume the current active theme ('light' | 'dark') and toggle methods.
 *
 * @returns Theme context value containing theme and toggle functions.
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
