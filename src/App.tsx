import { useState, useEffect } from 'react'
import CloudToCodeBackground from './components/CloudToCodeBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import TracksSection from './components/TracksSection'
import AutomationVisualizer from './components/AutomationVisualizer'
import ServicesSection from './components/ServicesSection'
import ProcessSection from './components/ProcessSection'
import ProjectsSection from './components/ProjectsSection'
import TestimonialsSection from './components/TestimonialsSection'
import ContactSection from './components/ContactSection'
import type { Profile, Service, Project, Testimonial } from './data/portfolioData'
import { STRINGS } from './data/strings'
import fallbackData from '../prisma/dev.db.json'

export default function App() {
  const [profile, setProfile] = useState<Profile>({
    name: 'Joey van der Poel',
    role: 'Full-Stack Mobile App Developer & AI Automation Engineer',
    location: 'Medemblik / Amsterdam, Netherlands',
    availability: 'Available for freelance contracts & small business builds',
  })
  const [services, setServices] = useState<Service[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch('/api/portfolio')
        if (!res.ok) throw new Error(`API error ${res.status}`)
        const data = await res.json()
        if (data.profile) setProfile(data.profile)
        if (data.services?.length) setServices(data.services)
        if (data.projects?.length) setProjects(data.projects)
        if (data.testimonials?.length) setTestimonials(data.testimonials)
      } catch (err) {
        console.warn('Failed to load portfolio data from API, using static JSON fallback:', err)
        // Fallback to static JSON file data for static deployments (like GitHub Pages)
        if (fallbackData.profile?.[0]) {
          setProfile(fallbackData.profile[0])
        }
        
        // Parse projects stack and highlights since they are JSON-stringified in the dev.db.json seed file
        const parsedProjects = (fallbackData.projects || []).map((p: any) => ({
          ...p,
          stack: typeof p.stack === 'string' ? JSON.parse(p.stack) : p.stack,
          highlights: typeof p.highlights === 'string' ? JSON.parse(p.highlights) : p.highlights
        }))
        
        setServices(fallbackData.services || [])
        setProjects(parsedProjects)
        setTestimonials(fallbackData.testimonials || [])
      } finally {
        setLoading(false)
      }
    }
    fetchPortfolio()
  }, [])

  return (
    <div className="min-h-screen relative text-slate-800 selection:bg-sky-500/30 selection:text-sky-950">
      {/* Dynamic Animated Cloud to Code Background Canvas */}
      <CloudToCodeBackground />

      {/* Floating Header Navigation */}
      <Navbar profile={profile} />

      {/* Main Page Sections */}
      <main className="relative z-10 w-full">
        <Hero profile={profile} />
        <AboutSection />
        <TracksSection />
        <AutomationVisualizer />
        <ServicesSection services={services} loading={loading} />
        <ProcessSection />
        <ProjectsSection projects={projects} loading={loading} />
        <TestimonialsSection testimonials={testimonials} loading={loading} />
        <ContactSection />
      </main>

      {/* Footer Links */}
      <footer className="relative z-10 w-full border-t border-theme-20 py-8 bg-white/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 font-mono">
            &copy; {new Date().getFullYear()} Joey van der Poel. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href={STRINGS.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-slate-650 hover:text-theme transition-colors font-mono uppercase tracking-wider"
            >
              LinkedIn
            </a>
            <a
              href={STRINGS.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-slate-650 hover:text-theme transition-colors font-mono uppercase tracking-wider"
            >
              GitHub
            </a>
            <a
              href={STRINGS.links.appStore}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-slate-650 hover:text-theme transition-colors font-mono uppercase tracking-wider"
            >
              Tracks & Taps
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
