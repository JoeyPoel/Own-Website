import { useState, useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import VenturesAccordionSection from './components/VenturesAccordionSection'
import CreativeOfferingsSection from './components/CreativeOfferingsSection'
import TestimonialsSection from './components/TestimonialsSection'
import ContactSection from './components/ContactSection'
import LazySection from './components/common/LazySection'
import type { Profile, Testimonial } from './data/portfolioData'
import { STRINGS } from './data/strings'

const defaultProfile: Profile = {
  name: 'Joey van der Poel',
  role: 'Entrepreneur, Founder & Creative Technologist',
  location: 'Medemblik / Amsterdam, Netherlands',
  availability: 'Available for venture co-founding & bespoke builds',
}

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'Joey took real ownership without needing much direction. Communication was clear and practical, deadlines were consistently met, and he brought a steady, solution-focused energy.',
    author: 'Megan de Klein',
    role: 'Co-Founder',
    company: 'The Swap Club',
  },
  {
    id: '2',
    quote: 'Joey pushed the boundaries of the assignment by integrating AI features such as a chatbot and a custom image recognition model. He approached the stack with curiosity and depth.',
    author: 'Ramon Nagelhout',
    role: 'Product Owner',
    company: 'DEPT®',
  },
  {
    id: '3',
    quote: 'Highly eager to learn, quickly grasps new concepts and consistently takes a solution-oriented approach. His application of AI within our workflows proved particularly valuable.',
    author: 'Sarah Otto',
    role: 'Team Lead',
    company: 'Tata Steel',
  },
]

/**
 * Master Root Application Component assembled using the Originkit Hero 68 design system:
 * Unifies the entire portfolio with warm sandstone / luxury void palette,
 * Instrument Serif typography, ruled hairline architecture, and founder venture showcases.
 *
 * @returns Master React application.
 */
export default function App() {
  const [profile, setProfile] = useState<Profile>(defaultProfile)
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials)

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch('/api/portfolio')
        if (!res.ok) throw new Error(`API error ${res.status}`)
        const data = await res.json()
        if (data.profile) setProfile(data.profile)
        if (data.testimonials?.length) setTestimonials(data.testimonials)
      } catch (err) {
        console.warn('Portfolio API unavailable; using fallback founder data:', err)
      }
    }
    fetchPortfolio()
  }, [])

  return (
    <ThemeProvider>
      <div className="min-h-screen w-full relative bg-[var(--bg)] text-[var(--ink)] font-sans-tight selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-300">
        {/* Subtle Analog Grain / Physical Texture Overlay Unifying All Sections */}
        <div
          className="fixed inset-0 pointer-events-none z-30 opacity-[0.02] dark:opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />

        {/* Floating Architectural Navigation Bar */}
        <Navbar profile={profile} />

        {/* Main Page Sections */}
        <main className="relative z-10 w-full">
          {/* Originkit Hero 68 Section */}
          <Hero profile={profile} />

          {/* The Founder Mindset & Story */}
          <AboutSection />

          {/* Interactive Venture Showcase: Swatch Accordion (Tracks & Taps, Connect Cultures, Lost Souls) */}
          <VenturesAccordionSection />

          {/* Bespoke Creative & Technical Capabilities */}
          <LazySection id="creative-offerings" minHeight="700px">
            <CreativeOfferingsSection />
          </LazySection>

          {/* Feedback from Past Teams & Leaders (Preserved) */}
          <LazySection id="testimonials" minHeight="500px">
            <TestimonialsSection testimonials={testimonials} />
          </LazySection>

          {/* Partnership & Collaboration Contact Planner */}
          <LazySection id="contact" minHeight="750px">
            <ContactSection />
          </LazySection>
        </main>

        {/* Architectural Ruled Footer */}
        <footer className="relative z-10 w-full py-12 border-t border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] transition-colors">
          <div className="max-w-[1254px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-xs font-mono opacity-65">
              &copy; {new Date().getFullYear()} {profile.name} &bull; {STRINGS.footer.tagline}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono uppercase tracking-wider">
              {STRINGS.footer.links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-60 transition-opacity"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}
