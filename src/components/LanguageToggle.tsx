import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage, type Language } from '../context/LanguageContext'

interface LanguageToggleProps {
  className?: string
}

/**
 * Editorial segmented Language Toggle component.
 * Allows visitors to switch between English ('EN') and Dutch ('NL') with a sliding indicator pill.
 * Follows the 4-color palette, hairline borders, and smooth micro-animations.
 *
 * @param props.className - Optional extra classes.
 * @returns {React.JSX.Element} Interactive Language Toggle switch.
 */
export default function LanguageToggle({ className = '' }: LanguageToggleProps): React.JSX.Element {
  const { language, setLanguage } = useLanguage()

  const languages: { id: Language; label: string; title: string }[] = [
    { id: 'en', label: 'EN', title: 'English' },
    { id: 'nl', label: 'NL', title: 'Nederlands' },
  ]

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={`relative inline-flex items-center p-0.5 rounded-full border border-[var(--line-strong)] bg-black/5 dark:bg-white/10 text-[var(--ink)] shadow-xs select-none ${className}`}
    >
      {languages.map((item) => {
        const isActive = language === item.id

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setLanguage(item.id)}
            aria-pressed={isActive}
            title={`Switch to ${item.title}`}
            className={`relative z-10 px-2 py-1 text-[11px] font-mono font-bold tracking-wider rounded-full transition-colors cursor-pointer ${
              isActive
                ? 'text-[#000000]'
                : 'text-[var(--lede)] hover:text-[var(--ink)]'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="language-toggle-pill"
                className="absolute inset-0 rounded-full bg-[#fce9c7] shadow-xs -z-10"
                transition={{ type: 'spring', stiffness: 420, damping: 30 }}
              />
            )}
            <span>{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}
