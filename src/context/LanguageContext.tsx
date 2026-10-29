import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import { STRINGS, STRINGS_NL, type PortfolioStrings } from '../data/strings'

export type Language = 'en' | 'nl'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  strings: PortfolioStrings
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const LANGUAGE_STORAGE_KEY = 'jp_portfolio_language'

/**
 * Provider component for managing global language localization state (EN / NL).
 * Defaults to 'en' with persistent preference saved to localStorage.
 * Updates DOM documentElement lang attribute on change.
 *
 * @param props.children - Child React nodes.
 * @returns {React.JSX.Element} Master LanguageProvider context provider.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en'
    try {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY)
      if (stored === 'en' || stored === 'nl') return stored
    } catch {
      // ignore storage access error
    }
    return 'en'
  })

  const setLanguage = useCallback((nextLang: Language): void => {
    setLanguageState(nextLang)
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLang)
    } catch {
      // ignore storage access error
    }
  }, [])

  const toggleLanguage = useCallback((): void => {
    setLanguage(language === 'en' ? 'nl' : 'en')
  }, [language, setLanguage])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language
    }
  }, [language])

  const strings = useMemo<PortfolioStrings>(() => {
    return language === 'nl' ? STRINGS_NL : STRINGS
  }, [language])

  const contextValue = useMemo<LanguageContextType>(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      strings,
    }),
    [language, setLanguage, toggleLanguage, strings]
  )

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>
}

/**
 * Hook to consume active language state ('en' | 'nl'), switcher methods, and localized strings.
 *
 * @returns {LanguageContextType} Active language context object.
 */
export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
