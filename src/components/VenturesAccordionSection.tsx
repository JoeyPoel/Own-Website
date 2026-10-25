import React, { useState, useEffect, useCallback } from 'react'
import TabsCard, { type TabItem } from './TabsCard'

const VENTURE_TABS: TabItem[] = [
  {
    id: 'tracks',
    title: 'Tracks & Taps',
    subtitle: 'Your Gamified Tour Guide',
    description:
      'Transforming standard walking routes into outdoor scavenger hunts & city adventures. Solved through real-world landmarks, interactive challenges, and trivia, complete with translation into all languages.',
    tags: 'App Store 5.0 ★, iOS Adventure, Scavenger Hunts',
    badge: 'Live App',
    buttonText: 'Download on App Store',
    link: 'https://apps.apple.com/nl/app/tracks-taps-your-tour-guide/id6756650785?l=en-GB',
    image: {
      src: '/tracks_preview.jpg',
      alt: 'Tracks & Taps Amsterdam Canal Tour Guide & Scavenger Hunt',
    },
    rating: '5.0 ★ (4 Ratings)',
  },
  {
    id: 'connectcultures',
    title: 'Connect Cultures',
    subtitle: 'The Dream Venture',
    description:
      'Connect Cultures is not yet an actual company, but my dream company and personal ambition to make a reality: a global cultural collective connecting travelers with real local homes, shared meals, and authentic living rooms across borders.',
    tags: 'Dream Company, Cultural Homestays, Shared Tables, Global Community',
    badge: 'Dream Company',
    buttonText: 'Explore connectcultures.world',
    link: 'https://www.connectcultures.world/',
    image: {
      src: '/connectcultures_preview.png',
      alt: 'Connect Cultures 3D Earth and Global Hospitality Platform',
    },
    rating: 'Dream Company Vision',
  },
  {
    id: 'lostsouls',
    title: 'LØST SØULS',
    subtitle: 'Techno Event Startup',
    description:
      'A community-driven underground rave collective in development. An uncommercialized space with no VIP enclosures: a place to stay present, get lost in high-pressure sound, and provide a proving ground for emerging talent.',
    tags: '145-160 BPM, Underground Techno, In Development',
    badge: 'In Development',
    buttonText: 'Explore lostsouls-events.com',
    link: 'https://lostsouls-events.com/',
    image: {
      src: '/lostsouls_preview.png',
      alt: 'LØST SØULS Underground Techno Rave Void',
    },
    rating: 'Nightlife Startup',
  },
]

/**
 * Derives the initial active tab ID based on the URL hash.
 *
 * @returns {string} Initial active project ID.
 */
function getInitialActiveId(): string {
  if (typeof window === 'undefined') return 'tracks'
  const hash = window.location.hash.toLowerCase()
  if (hash === '#tracks') return 'tracks'
  if (hash === '#connectcultures') return 'connectcultures'
  if (hash === '#lostsouls') return 'lostsouls'
  return 'tracks'
}

/**
 * VenturesAccordionSection (Selected Projects):
 * Interactive showcase for selected products and projects powered by the Framer Tabs-card architecture:
 * Tracks and Taps (live App Store iOS app), Connect Cultures (global hospitality platform),
 * and LØST SØULS (underground techno event startup).
 *
 * Features inverted superellipse fillet corners, smooth spring transitions,
 * responsive mobile stacking, and hash-based deep linking.
 *
 * @returns {React.JSX.Element} Master Projects showcase section.
 */
export default function VenturesAccordionSection(): React.JSX.Element {
  const [activeId, setActiveId] = useState<string>(getInitialActiveId)

  // Listen to hash changes to select the corresponding project tab
  const syncHashToActive = useCallback(() => {
    const hash = window.location.hash.toLowerCase()
    if (hash === '#tracks') {
      setActiveId('tracks')
    } else if (hash === '#connectcultures') {
      setActiveId('connectcultures')
    } else if (hash === '#lostsouls') {
      setActiveId('lostsouls')
    }
  }, [])

  useEffect(() => {
    window.addEventListener('hashchange', syncHashToActive)
    return () => window.removeEventListener('hashchange', syncHashToActive)
  }, [syncHashToActive])

  return (
    <section id="projects" className="relative pt-12 pb-16 sm:pt-28 sm:pb-32 bg-[var(--bg)] text-[var(--ink)] overflow-hidden transition-colors duration-400 ease-in-out">
      {/* Anchor landmarks for navigation */}
      <div id="ventures" className="absolute -top-24" aria-hidden="true" />
      <div id="tracks" className="absolute -top-24" aria-hidden="true" />
      <div id="connectcultures" className="absolute -top-24" aria-hidden="true" />
      <div id="lostsouls" className="absolute -top-24" aria-hidden="true" />

      {/* Subtle Ambient Glow Behind Card */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] opacity-30 blur-[150px] rounded-full transition-all duration-700"
          style={{
            background: 'radial-gradient(circle, rgba(163, 181, 196, 0.35) 0%, transparent 70%)',
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

      <div className="max-w-[1254px] mx-auto px-5 sm:px-6 relative z-10">
        {/* Section Header: Chapter Badge & Headline */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-10">
          <div>

            <h2 className="font-editorial text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.04] tracking-tight">
              Selected Projects
            </h2>

            <p className="text-[var(--lede)] text-xs sm:text-base leading-relaxed max-w-2xl mt-2 sm:mt-3">
              Explore my published iOS app, dream company vision, and underground event startup in development. Hover or tap any tab to inspect.
            </p>
          </div>
        </div>

        {/* Master Framer Tabs Card Component */}
        <TabsCard
          items={VENTURE_TABS}
          activeId={activeId}
          onSelect={setActiveId}
        />
      </div>
    </section>
  )
}
