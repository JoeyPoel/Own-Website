import React, { useState, useEffect, useRef } from 'react'

interface LazySectionProps {
  id?: string
  className?: string
  minHeight?: string | number
  rootMargin?: string
  children: React.ReactNode
}

/**
 * LazySection Component:
 * Defers mounting and execution of heavy section subtrees (including WebGL shaders,
 * dynamic canvases, and image grids) until the user scrolls within range.
 * Preserves the section DOM anchor and reserved height to guarantee smooth scrolling
 * without layout shifts.
 *
 * @param props.id - Anchor target ID for navigation before mounting.
 * @param props.className - Wrapper CSS classes.
 * @param props.minHeight - Reserved layout height (default '100vh').
 * @param props.rootMargin - Lookahead boundary margin before mounting (default '300px 0px').
 * @param props.children - Section content to mount when in view.
 * @returns {JSX.Element} Responsive lazy section container.
 */
export const LazySection: React.FC<LazySectionProps> = ({
  id,
  className = '',
  minHeight = '100vh',
  rootMargin = '300px 0px',
  children,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [hasEnteredView, setHasEnteredView] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return true
    }
    return false
  })

  useEffect(() => {
    const el = containerRef.current
    if (!el || hasEnteredView) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry?.isIntersecting) {
          setHasEnteredView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin,
        threshold: 0.01,
      }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [hasEnteredView, rootMargin])

  return (
    <div
      ref={containerRef}
      id={hasEnteredView ? undefined : id}
      className={className}
      style={{
        minHeight: hasEnteredView ? undefined : minHeight,
      }}
    >
      {hasEnteredView ? (
        children
      ) : (
        <div
          aria-hidden="true"
          className="w-full flex items-center justify-center pointer-events-none select-none opacity-20"
          style={{ minHeight }}
        >
          <div className="w-8 h-8 rounded-full border border-current border-t-transparent animate-spin" />
        </div>
      )}
    </div>
  )
}

export default LazySection
