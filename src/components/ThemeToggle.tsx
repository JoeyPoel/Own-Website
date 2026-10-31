import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

interface ThemeToggleProps {
  className?: string
  showLabel?: boolean
}

/**
 * Interactive toggle button allowing visitors to switch between default light theme and dark mode.
 * Matches Originkit architectural hairline borders and smooth micro-animations.
 *
 * @param props.className - Optional additional classes.
 * @param props.showLabel - Whether to show the text label next to the icon.
 * @returns Master ThemeToggle button component.
 */
export default function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps): React.JSX.Element {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.button
      type="button"
      data-theme-toggle="true"
      onClick={toggleTheme}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.92 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative inline-flex items-center gap-2 p-2 rounded-full border border-[var(--line-strong)] bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 text-[var(--ink)] cursor-pointer shadow-sm group select-none ${className}`}
      style={{ viewTransitionName: 'none' }}
    >
      <div className="relative w-4 h-4 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 450, damping: 24 }}
              className="flex items-center justify-center text-[#fce9c7]"
            >
              <Sun className="w-4 h-4" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 450, damping: 24 }}
              className="flex items-center justify-center text-[#a3b5c4]"
            >
              <Moon className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showLabel && (
        <span className="text-xs font-mono uppercase tracking-wider pr-1">
          {isDark ? 'Dark' : 'Light'}
        </span>
      )}
    </motion.button>
  )
}
