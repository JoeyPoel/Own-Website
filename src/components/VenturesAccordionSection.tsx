import React, { useState, useEffect, useCallback } from 'react'
import SwatchAccordion, { type SwatchItem } from './SwatchAccordion'

const VENTURE_SWATCHES: SwatchItem[] = [
  {
    id: 'tracks',
    title: 'Tracks & Taps',
    subtitle: 'Your Gamified Tour Guide',
    description:
      'Transforming standard walking routes into outdoor scavenger hunts & city adventures. Solved via real-world landmarks, medieval weighing houses, and historic canals with multi-language voice narration.',
    tags: 'App Store 5.0 ★, iOS Adventure, Scavenger Hunts, Voice Narrated',
    button: 'Download on App Store',
    link: 'https://apps.apple.com/nl/app/tracks-taps-your-tour-guide/id6756650785?l=en-GB',
    newTab: true,
    image: {
      src: '/tracks_preview.jpg',
      alt: 'Tracks & Taps Amsterdam Canal Tour Guide & Scavenger Hunt',
    },
    icon: '/tracks_icon.png',
    rating: '5.0 ★ (4 Ratings)',
    color: '#064e3b',
    focus: 45,
  },
  {
    id: 'connectcultures',
    title: 'Connect Cultures',
    subtitle: 'The Dream Company',
    description:
      'A global cultural hospitality collective connecting travelers with real homes, local meals, and shared living rooms across borders. Replacing tourist bubbles with authentic human connection.',
    tags: 'Co-Founding, Cultural Homestays, Shared Tables, Global Community',
    button: 'Explore connectcultures.world',
    link: 'https://www.connectcultures.world/',
    newTab: true,
    image: {
      src: '/connectcultures_preview.png',
      alt: 'Connect Cultures 3D Earth and Global Hospitality Platform',
    },
    rating: 'Dream Venture',
    color: '#0369a1',
    focus: 65,
  },
  {
    id: 'lostsouls',
    title: 'LØST SØULS',
    subtitle: 'Techno Event Startup',
    description:
      'An underground techno music and event venture in development. Dedicated to high-energy rhythm, dark intimate spaces, acoustic scenography, and raw sound culture.',
    tags: '145-160 BPM, Underground Techno, Acoustic Scenography, No Phones',
    button: 'Explore lostsouls-events.com',
    link: 'https://lostsouls-events.com/',
    newTab: true,
    image: {
      src: '/lostsouls_preview.png',
      alt: 'LØST SØULS Underground Techno Rave Void',
    },
    rating: 'Event Startup',
    color: '#1e3a8a',
    focus: 50,
  },
]

/**
 * Derives the initial active index based on URL hash if present.
 *
 * @returns {number} Initial active swatch index.
 */
function getInitialActiveIndex(): number {
  if (typeof window === 'undefined') return 0
  const hash = window.location.hash.toLowerCase()
  if (hash === '#tracks') return 0
  if (hash === '#connectcultures') return 1
  if (hash === '#lostsouls') return 2
  return 0
}

/**
 * VenturesAccordionSection:
 * Interactive swatch accordion showcase for selected ventures:
 * Tracks and Taps (live App Store iOS app), Connect Cultures (global hospitality platform),
 * and LØST SØULS (underground techno event startup).
 *
 * Supports URL hash navigation (#tracks, #connectcultures, #lostsouls) to auto-select swatches.
 *
 * @returns Master Ventures interactive showcase section.
 */
export default function VenturesAccordionSection(): React.JSX.Element {
  const [activeIndex, setActiveIndex] = useState<number>(getInitialActiveIndex)

  // Listen to hash changes to select the corresponding venture swatch
  const syncHashToActive = useCallback(() => {
    const hash = window.location.hash.toLowerCase()
    if (hash === '#tracks') {
      setActiveIndex(0)
    } else if (hash === '#connectcultures') {
      setActiveIndex(1)
    } else if (hash === '#lostsouls') {
      setActiveIndex(2)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('hashchange', syncHashToActive)
    return () => window.removeEventListener('hashchange', syncHashToActive)
  }, [syncHashToActive])

  return (
    <section id="ventures" className="relative pt-24 pb-28 sm:pt-32 sm:pb-36 bg-[var(--bg)] text-[var(--ink)] overflow-hidden">
      {/* Invisible anchor landmarks so existing navbar & card links land smoothly */}
      <div id="tracks" className="absolute -top-24" aria-hidden="true" />
      <div id="connectcultures" className="absolute -top-24" aria-hidden="true" />
      <div id="lostsouls" className="absolute -top-24" aria-hidden="true" />

      {/* Subtle Ambient Glow Behind Accordion */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] opacity-25 blur-[150px] rounded-full transition-all duration-700"
          style={{
            background:
              activeIndex === 0
                ? 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(56, 189, 248, 0.15) 50%, transparent 75%)'
                : activeIndex === 1
                ? 'radial-gradient(circle, rgba(56, 189, 248, 0.35) 0%, rgba(37, 99, 235, 0.15) 50%, transparent 75%)'
                : 'radial-gradient(circle, rgba(59, 130, 246, 0.35) 0%, rgba(147, 51, 234, 0.15) 50%, transparent 75%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.6) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-[1254px] mx-auto px-6 relative z-10">
        {/* Section Header: Chapter Badge & Headline */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="mb-4">
              <span className="text-[10px] font-bold tracking-[0.2em] font-mono uppercase px-3 py-1 bg-white/5 border border-[var(--line-strong)] inline-flex items-center gap-2 rounded-sm shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span>03 • VENTURES & VENTURE HIGHLIGHTS</span>
              </span>
            </div>

            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.04] tracking-tight">
              Selected Ventures
            </h2>

            <p className="text-[var(--lede)] text-sm sm:text-base leading-relaxed max-w-2xl mt-3">
              Explore my published iOS app, cultural hospitality platform, and underground event startup.
              Hover or tap any swatch to expand.
            </p>
          </div>

          {/* Quick Tab Selector for direct switching */}
          <div className="flex items-center gap-2 p-1.5 card-ruled rounded-full bg-black/5 dark:bg-black/40 backdrop-blur-xl border border-[var(--line-strong)]">
            {VENTURE_SWATCHES.map((swatch, idx) => (
              <button
                key={swatch.title}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  activeIndex === idx
                    ? 'bg-[var(--ink)] text-[var(--bg)] font-bold shadow-md'
                    : 'text-[var(--ink)] opacity-65 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10'
                }`}
              >
                {swatch.title}
              </button>
            ))}
          </div>
        </div>

        {/* Master Swatch Accordion Interactive Showcase */}
        <div className="w-full card-ruled p-3 sm:p-4 rounded-[28px] border border-[var(--line)] shadow-2xl bg-black/[0.02] dark:bg-black/30 backdrop-blur-md">
          <div className="w-full h-[540px] sm:h-[600px] lg:h-[640px]">
            <SwatchAccordion
              items={VENTURE_SWATCHES}
              activeItem={activeIndex}
              onActiveChange={setActiveIndex}
              trigger="hover"
              stripLink={false}
              direction="auto"
              stripWidth={88}
              barHeight={66}
              radius="20px"
              padding="32px 36px 36px 36px"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
