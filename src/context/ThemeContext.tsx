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
  // Always initialize to white/light mode on initial load as requested
  const [theme, setThemeState] = useState<Theme>('light')

  const applyDomTheme = (nextTheme: Theme) => {
    const root = document.documentElement
    if (nextTheme === 'dark') {
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
  }

  const setTheme = (nextTheme: Theme) => {
    applyDomTheme(nextTheme)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
    } catch {
      // ignore
    }
    setThemeState(nextTheme)
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    // Remove preload class shortly after mount to allow seamless transitions on user toggle
    const timer = setTimeout(() => {
      document.body.classList.remove('preload')
    }, 60)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    applyDomTheme(theme)
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
