import React from 'react'

interface LazySectionProps {
  id?: string
  className?: string
  minHeight?: string | number
  rootMargin?: string
  children: React.ReactNode
}

/**
 * LazySection Component:
 * Leverages native browser `content-visibility: auto` to defer layout and rendering
 * of offscreen section subtrees without any React state flips, layout shifts, or scroll jank.
 * Keeps anchors stable in the DOM for instant hash navigation.
 *
 * @param props.id - Anchor target ID for navigation.
 * @param props.className - Wrapper CSS classes.
 * @param props.minHeight - Estimated height for intrinsic sizing (default '800px').
 * @param props.children - Section content.
 * @returns {React.JSX.Element} High-performance content-visibility container.
 */
export const LazySection: React.FC<LazySectionProps> = ({
  id,
  className = '',
  minHeight = '800px',
  children,
}) => {
  const intrinsicHeight = typeof minHeight === 'number' ? `${minHeight}px` : minHeight

  return (
    <div
      id={id}
      className={className}
      style={{
        contentVisibility: 'auto',
        containIntrinsicSize: `auto ${intrinsicHeight}`,
      }}
    >
      {children}
    </div>
  )
}

export default LazySection
