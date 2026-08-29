import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ServicesSection from './components/ServicesSection'
import ProjectsSection from './components/ProjectsSection'
import TestimonialsSection from './components/TestimonialsSection'
import ContactSection from './components/ContactSection'
import type { Profile, Service, Project, Testimonial } from './data/portfolioData'

export default function App() {
  const [profile, setProfile] = useState<Profile | null>(null)
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
        console.error('Failed to load portfolio data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPortfolio()
  }, [])

  if (loading) {
    return (
      <div className="bg-[#09090b] min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-zinc-500 font-mono text-sm">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="bg-[#09090b] min-h-screen flex items-center justify-center">
        <p className="text-zinc-500 font-mono text-sm">Failed to load portfolio. Please refresh.</p>
      </div>
    )
  }

  return (
    <div className="bg-[#09090b] text-zinc-300 min-h-screen relative overflow-hidden selection:bg-emerald-500/25 selection:text-white">
      {/* Background Grids */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.25] pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.35] pointer-events-none" />

      {/* Floating Header */}
      <Navbar profile={profile} />

      {/* Main Pages */}
      <main className="relative w-full">
        <Hero profile={profile} />
        <ServicesSection services={services} />
        <ProjectsSection projects={projects} />
        <TestimonialsSection testimonials={testimonials} />
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-900 bg-zinc-950/20 backdrop-blur-sm relative z-10 font-sans">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-500 font-mono">
          <span>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#home" className="hover:text-emerald-450 transition-colors">Back to top</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
