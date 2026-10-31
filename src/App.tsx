import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import VenturesAccordionSection from './components/VenturesAccordionSection'
import ExperienceTimelineSection from './components/ExperienceTimelineSection'
import CreativeOfferingsSection from './components/CreativeOfferingsSection'
import TestimonialsSection from './components/TestimonialsSection'
import ContactSection from './components/ContactSection'
import LazySection from './components/common/LazySection'
import type { Profile, Testimonial } from './data/portfolioData'

const defaultProfile: Profile = {
  name: 'Joey van der Poel',
  role: 'MSc Applied AI Candidate • Mobile Developer & Builder',
  location: 'Amsterdam / Medemblik, Netherlands',
  availability: 'Pursuing MSc in Applied AI • Available for builds',
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
    author: 'Sarah Lee Otto',
    role: 'Team Lead',
    company: 'Tata Steel',
  },
]

/**
 * Architectural Ruled Footer reactive to active language context.
 *
 * @param props.profileName - Founder's name.
 * @returns {React.JSX.Element} Localized footer.
 */
function Footer({ profileName }: { profileName: string }): React.JSX.Element {
  const { strings } = useLanguage()

  return (
    <footer className="relative z-10 w-full py-12 border-t border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-xs font-mono opacity-75">
          &copy; {new Date().getFullYear()} {profileName} &bull; <span className="text-[#a3b5c4] font-medium">{strings.footer.tagline}</span>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono uppercase tracking-wider">
          {strings.footer.links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              download={link.href.endsWith('.pdf') ? 'Resume_Joey_van_der_Poel.pdf' : undefined}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#a3b5c4] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

/**
 * Master Root Application Component assembled using the Originkit Hero 68 design system:
 * Unifies the entire portfolio with warm sandstone / luxury void palette,
 * Instrument Serif typography, ruled hairline architecture, and founder company showcases.
 *
 * @returns Master React application.
 */
export default function App() {
  const profile = defaultProfile
  const testimonials = defaultTestimonials

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen w-full relative bg-[var(--bg)] text-[var(--ink)] font-sans-tight selection:bg-[#a3b5c4] selection:text-[#000000] dark:selection:bg-[#a3b5c4] dark:selection:text-[#000000] transition-colors duration-400 ease-in-out">
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

            {/* Interactive Company Showcase: Framer Tabs Card (Tracks & Taps, Connect Cultures, Lost Souls) */}
            <VenturesAccordionSection />

            {/* Interactive Experience & Career Flowing Timeline */}
            <LazySection id="experience" minHeight="650px">
              <ExperienceTimelineSection />
            </LazySection>

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
          <Footer profileName={profile.name} />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}

