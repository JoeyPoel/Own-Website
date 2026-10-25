import React, { useState, useEffect, useRef, useId, useCallback, Fragment } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import './swatch-accordion.css'

export interface SwatchItem {
  id?: string
  title: string
  subtitle?: string
  description: string
  tags?: string
  color?: string
  focus?: number
  button?: string
  link?: string
  newTab?: boolean
  image: {
    src: string
    alt?: string
    srcSet?: string
  }
  icon?: string
  rating?: string
}

export interface SwatchAccordionProps {
  items: SwatchItem[]
  defaultOpenIndex?: number
  activeItem?: number
  onActiveChange?: (index: number) => void
  trigger?: 'hover' | 'click'
  stripLink?: boolean
  autoplay?: boolean
  interval?: number
  direction?: 'auto' | 'horizontal' | 'vertical'
  stripWidth?: number
  barHeight?: number
  numbers?: boolean
  scrim?: boolean
  textColor?: string
  buttonColor?: string
  buttonTextColor?: string
  radius?: string
  padding?: string
  gap?: string
  className?: string
  style?: React.CSSProperties
}

const NAMED_EASE: Record<string, string> = {
  linear: 'linear',
  easeIn: 'cubic-bezier(0.42, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.58, 1)',
  easeInOut: 'cubic-bezier(0.42, 0, 0.58, 1)',
  circIn: 'cubic-bezier(0.55, 0, 1, 0.45)',
  circOut: 'cubic-bezier(0, 0, 0.55, 0.45, 1)',
  circInOut: 'cubic-bezier(0.85, 0, 0.15, 1)',
  backIn: 'cubic-bezier(0.31, 0.01, 0.66, -0.59)',
  backOut: 'cubic-bezier(0.33, 1.53, 0.69, 0.99)',
  backInOut: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
}
const FALLBACK_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

/**
 * Converts a Framer-style spring or tween transition into CSS timing values.
 *
 * @param t - Transition definition with duration, bounce, or ease.
 * @returns CSS transition descriptor with linear keyframe easing curve.
 */
function toCssTransition(t: { type?: string; duration?: number; bounce?: number; delay?: number; ease?: string }) {
  const delay = Math.max(0, Number(t?.delay) || 0)
  if (t && t.type && t.type !== 'spring') {
    const ease = (t.ease && NAMED_EASE[t.ease]) || FALLBACK_EASE
    return { ease, fallback: ease, duration: Math.max(0.05, Number(t.duration) || 0.6), delay }
  }

  const d = Math.max(0.1, Number(t?.duration) || 0.75)
  const zeta = Math.min(1, Math.max(0.05, 1 - (Number.isFinite(t?.bounce) ? (t.bounce as number) : 0.1)))
  const omega = zeta >= 1 ? 6.64 / d : Math.log(100 / Math.sqrt(1 - zeta * zeta)) / (zeta * d)

  const x = (time: number) => {
    if (zeta >= 1) return 1 - (1 + omega * time) * Math.exp(-omega * time)
    const wd = omega * Math.sqrt(1 - zeta * zeta)
    return 1 - Math.exp(-zeta * omega * time) * (Math.cos(wd * time) + (zeta * omega / wd) * Math.sin(wd * time))
  }

  let total = 0.05
  while (total < 4) {
    let settled = true
    for (let k = 0; k <= 10; k++) {
      if (Math.abs(1 - x(total + k * 0.02)) > 0.001) {
        settled = false
        break
      }
    }
    if (settled) break
    total += 0.02
  }

  const steps = 40
  const pts: string[] = []
  for (let i = 0; i <= steps; i++) {
    const v = i === steps ? 1 : x((total * i) / steps)
    pts.push(String(Math.round(v * 1e4) / 1e4))
  }

  return { ease: `linear(${pts.join(', ')})`, fallback: FALLBACK_EASE, duration: total, delay }
}

function pad2(n: number): string {
  return n < 9 ? `0${n + 1}` : `${n + 1}`
}

function parseBox(value?: string, fallback = '28px') {
  const parts = String(value || fallback).trim().split(/\s+/).filter(Boolean)
  const [t, r = t, b = t, l = r] = parts.length ? parts : [fallback]
  return { t, r, b, l }
}

function PlusIcon({ className }: { className?: string }): React.JSX.Element {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 2.5V11.5M2.5 7H11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function ArrowIcon(): React.JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function graphemes(text: string): string[] {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const Seg = (Intl as unknown as { Segmenter: new (locales?: string, opts?: { granularity: string }) => { segment: (input: string) => Iterable<{ segment: string }> } }).Segmenter
    return Array.from(new Seg(undefined, { granularity: 'grapheme' }).segment(text), (s) => s.segment)
  }
  return Array.from(text)
}

/**
 * Splits title text into staggered words and individual sharpening letter spans.
 *
 * @param props.text - Title string to split.
 * @returns Animated split title fragment.
 */
function SplitTitle({ text }: { text: string }): React.JSX.Element {
  const words = String(text || '').split(/\s+/).filter(Boolean)
  let c = 0
  return (
    <span aria-hidden="true">
      {words.map((word, wi) => (
        <Fragment key={wi}>
          <span className="swa-w" style={{ '--wi': String(wi) } as React.CSSProperties}>
            {graphemes(word).map((ch, k) => (
              <span key={k} className="swa-c" style={{ '--c': String(c++) } as React.CSSProperties}>
                {ch}
              </span>
            ))}
          </span>
          {wi < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </span>
  )
}

function countChars(text: string): number {
  return Math.max(1, String(text || '').replace(/\s+/g, '').length)
}

/**
 * SwatchAccordion component replicated from Framer architecture:
 * Features horizontally expandable image swatches with letter-by-letter title reveals,
 * vertical rotated labels in closed state, plus icon state morphing, and automatic
 * responsive stacking into vertical bars on narrow devices.
 *
 * @param props - Swatch accordion options, items, and event handlers.
 * @returns Master SwatchAccordion interactive component.
 */
export default function SwatchAccordion({
  items,
  defaultOpenIndex = 0,
  activeItem,
  onActiveChange,
  trigger = 'hover',
  stripLink = true,
  autoplay = false,
  interval = 6,
  direction = 'auto',
  stripWidth = 84,
  barHeight = 64,
  numbers = true,
  scrim = true,
  textColor = '#ffffff',
  buttonColor = '#ffffff',
  buttonTextColor = '#050508',
  radius = '24px',
  padding = '28px',
  gap = '10px',
  className = '',
  style = {},
}: SwatchAccordionProps): React.JSX.Element {
  const count = items.length
  const reduced = !!useReducedMotion()
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const rootRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rootRef, { margin: '0px 0px -10% 0px' })
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([])
  const hoverTimer = useRef<number | null>(null)

  const isControlled = typeof activeItem === 'number'
  const initial = Math.min(Math.max(defaultOpenIndex, 0), count - 1)

  const [{ active, prev }, setOpenState] = useState<{ active: number; prev: number }>({
    active: isControlled ? activeItem : initial,
    prev: isControlled ? activeItem : initial,
  })

  // Synchronize controlled activeItem if provided
  useEffect(() => {
    if (isControlled && activeItem !== active) {
      setOpenState((s) => ({ active: activeItem, prev: s.active }))
    }
  }, [isControlled, activeItem, active])

  const setActive = useCallback(
    (next: number | ((prevIndex: number) => number)) => {
      setOpenState((s) => {
        const val = typeof next === 'function' ? next(s.active) : next
        if (val === s.active) return s
        if (onActiveChange) onActiveChange(val)
        return { active: val, prev: s.active }
      })
    },
    [onActiveChange]
  )

  const [hoverPause, setHoverPause] = useState(false)
  const [focusPause, setFocusPause] = useState(false)
  const paused = hoverPause || focusPause
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    return () => {
      if (hoverTimer.current !== null) window.clearTimeout(hoverTimer.current)
    }
  }, [])

  const autoplayOn = autoplay && !reduced && count > 1

  const open = useCallback(
    (index: number) => {
      setCycle((c) => c + 1)
      setActive(index)
    },
    [setActive]
  )

  const advance = useCallback(() => {
    setCycle((c) => c + 1)
    setActive((a) => (a + 1) % count)
  }, [count, setActive])

  const onStripEnter = (e: React.PointerEvent, index: number) => {
    if (trigger !== 'hover' || e.pointerType !== 'mouse') return
    if (hoverTimer.current !== null) window.clearTimeout(hoverTimer.current)
    hoverTimer.current = window.setTimeout(() => {
      hoverTimer.current = null
      open(index)
    }, 110)
  }

  const onStripLeave = () => {
    if (hoverTimer.current !== null) {
      window.clearTimeout(hoverTimer.current)
      hoverTimer.current = null
    }
  }

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    let next = -1
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (index + 1) % count
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (index - 1 + count) % count
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = count - 1
    if (next >= 0) {
      e.preventDefault()
      triggerRefs.current[next]?.focus()
      open(next)
    }
  }

  const t = toCssTransition(
    reduced ? { type: 'tween', duration: 0.01, ease: 'linear' } : { type: 'spring', duration: 0.75, bounce: 0.1 }
  )

  const pad = parseBox(padding, '28px')
  const gapParts = String(gap || '10px').trim().split(/\s+/).filter(Boolean)
  const rowGap = gapParts[0] || '10px'
  const colGap = gapParts[1] || rowGap

  const stripPx = Math.max(48, stripWidth)
  const barPx = Math.max(48, barHeight)
  const closedSize = `${stripPx}px`
  const barSize = `${barPx}px`

  const rootStyle: React.CSSProperties = {
    ...style,
    position: 'relative',
    color: textColor,
    ['--swa-n' as string]: String(count),
    ['--swa-closed' as string]: closedSize,
    ['--swa-bar' as string]: barSize,
    ['--swa-gap' as string]: colGap,
    ['--swa-gap-row' as string]: rowGap,
    ['--swa-radius' as string]: radius,
    ['--swa-pt' as string]: pad.t,
    ['--swa-pr' as string]: pad.r,
    ['--swa-pb' as string]: pad.b,
    ['--swa-pl' as string]: pad.l,
    ['--swa-text' as string]: textColor,
    ['--swa-btn' as string]: buttonColor,
    ['--swa-btn-text' as string]: buttonTextColor,
    ['--swa-btn-r' as string]: '999px',
    ['--swa-plus-r' as string]: '999px',
    ['--swa-tag-r' as string]: '999px',
    ['--swa-title-size' as string]: '52px',
    ['--swa-strip-size' as string]: '22px',
    ['--swa-body-size' as string]: '15px',
    ['--swa-label-size' as string]: '11px',
    ['--swa-dur' as string]: `${t.duration}s`,
    ['--swa-delay' as string]: `${t.delay}s`,
    ['--swa-ease' as string]: t.ease,
    ['--swa-ease-fallback' as string]: t.fallback,
  }

  return (
    <div
      ref={rootRef}
      className={`swa ${className}`}
      data-dir={direction}
      data-auto-height=""
      data-scrim={scrim ? '' : undefined}
      style={rootStyle}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHoverPause(true)}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') setHoverPause(false)
        onStripLeave()
      }}
      onFocus={(e) => {
        let keyboard = true
        try {
          keyboard = (e.target as HTMLElement).matches(':focus-visible')
        } catch {
          // ignore
        }
        setFocusPause(keyboard)
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusPause(false)
      }}
    >
      <div className="swa-track">
        {items.map((item, index) => {
          const isOpen = index === active
          const pinEnd = (isOpen && index > prev) || (index === prev && !isOpen && index > active)
          const focus = Math.min(100, Math.max(0, Number.isFinite(item.focus) ? (item.focus as number) : 50)) / 100
          const tags = String(item.tags || '')
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
          const linked = Boolean(item.link && item.link.trim().length > 0)
          const triggerId = `swa-${uid}-t${index}`
          const panelId = `swa-${uid}-p${index}`
          const headingId = `swa-${uid}-h${index}`

          const stripStyle = {
            ['--swa-color' as string]: item.color || '#1e293b',
            ['--swa-focus' as string]: String(focus),
          } as React.CSSProperties

          return (
            <div
              key={item.id || item.title || index}
              className="swa-strip"
              data-open={isOpen ? '' : undefined}
              data-pin={pinEnd ? 'end' : undefined}
              style={stripStyle}
              onPointerEnter={(e) => onStripEnter(e, index)}
              onPointerLeave={onStripLeave}
            >
              {/* Media Layer */}
              <div className="swa-media" aria-hidden="true">
                <img
                  className="swa-img"
                  src={item.image.src}
                  srcSet={item.image.srcSet}
                  sizes="(max-width: 640px) 100vw, 1200px"
                  alt={item.image.alt || ''}
                  draggable={false}
                  loading="eager"
                  decoding="async"
                />
                <div className="swa-scrim" />
              </div>

              {/* Accessible Click / Keyboard Trigger */}
              <button
                ref={(el) => {
                  triggerRefs.current[index] = el
                }}
                id={triggerId}
                type="button"
                className="swa-trigger"
                aria-label={item.title || `Venture ${index + 1}`}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => open(index)}
                onKeyDown={(e) => onKeyDown(e, index)}
              />

              {/* Full strip link fallback if configured */}
              {isOpen && stripLink && linked ? (
                <a
                  className="swa-strip-link"
                  href={item.link}
                  target={item.newTab ? '_blank' : undefined}
                  rel={item.newTab ? 'noopener noreferrer' : undefined}
                  tabIndex={-1}
                  aria-hidden="true"
                />
              ) : null}

              {/* Collapsed Strip View */}
              <div className="swa-closed" aria-hidden="true">
                {numbers ? <span className="swa-num">{pad2(index)}</span> : <span />}
                <span className="swa-vt">
                  <span className="swa-vtitle">{item.title}</span>
                </span>
                <span className="swa-plw">
                  <span className="swa-plus">
                    <PlusIcon className="swa-pi" />
                    <span className="swa-pf">
                      <PlusIcon className="swa-pi" />
                    </span>
                  </span>
                </span>
              </div>

              {/* Expanded Open Panel */}
              <div
                id={panelId}
                role="region"
                aria-labelledby={headingId}
                className="swa-open"
                style={{ ['--cn' as string]: String(countChars(item.title)) } as React.CSSProperties}
                {...(isOpen ? {} : { inert: true, 'aria-hidden': true })}
              >
                {/* Header row: Number + Tags & Rating */}
                <div className="swa-top">
                  {numbers ? (
                    <span className="swa-rv swa-rv-num" aria-hidden="true">
                      <span className="swa-num">{pad2(index)}</span>
                    </span>
                  ) : (
                    <span />
                  )}

                  <div className="flex items-center gap-2">
                    {item.rating ? (
                      <span className="swa-tag text-amber-300 font-mono font-bold bg-amber-500/15 border-amber-400/30">
                        {item.rating}
                      </span>
                    ) : null}

                    {tags.length ? (
                      <ul className="swa-tags" aria-label="Tags">
                        {tags.map((tag, i) => (
                          <li
                            key={tag}
                            className="swa-tag"
                            style={{ ['--i' as string]: String(i) } as React.CSSProperties}
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>

                {/* Content block: App icon/badge + Title + Description + CTA */}
                <div className="swa-content">
                  {item.icon ? (
                    <div className="mb-3.5 flex items-center gap-3">
                      <img
                        src={item.icon}
                        alt={`${item.title} icon`}
                        className="w-10 h-10 rounded-xl shadow-lg border border-white/25 bg-black/40 object-cover"
                      />
                      {item.subtitle ? (
                        <span className="text-xs font-mono tracking-wider uppercase text-white/80 font-semibold px-2.5 py-1 rounded bg-black/40 border border-white/15 backdrop-blur-md">
                          {item.subtitle}
                        </span>
                      ) : null}
                    </div>
                  ) : item.subtitle ? (
                    <span className="text-xs font-mono tracking-wider uppercase text-white/80 font-semibold mb-2 px-2.5 py-1 rounded bg-black/40 border border-white/15 backdrop-blur-md inline-block">
                      {item.subtitle}
                    </span>
                  ) : null}

                  <h3 id={headingId} className="swa-title" aria-label={item.title || undefined}>
                    <SplitTitle text={item.title} />
                  </h3>

                  {item.description ? (
                    <div className="swa-rv swa-rv-desc">
                      <p className="swa-desc">{item.description}</p>
                    </div>
                  ) : null}

                  {item.button && item.button.trim() ? (
                    <div className="swa-rc">
                      {linked ? (
                        <a
                          className="swa-cta"
                          href={item.link}
                          target={item.newTab ? '_blank' : undefined}
                          rel={item.newTab ? 'noopener noreferrer' : undefined}
                        >
                          <span>{item.button}</span>
                          <ArrowIcon />
                        </a>
                      ) : (
                        <span className="swa-cta swa-cta-static">
                          <span>{item.button}</span>
                          <ArrowIcon />
                        </span>
                      )}
                    </div>
                  ) : null}
                </div>

                {/* Progress bar for autoplay */}
                {autoplayOn && isOpen ? (
                  <div className="swa-progress" aria-hidden="true">
                    <i
                      style={{
                        animationDuration: `${Math.max(1, interval)}s`,
                        animationPlayState: paused || !inView ? 'paused' : 'running',
                      }}
                      onAnimationEnd={advance}
                      key={`${index}-${cycle}`}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
