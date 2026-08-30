import { useState, useEffect } from 'react'
import CloudToCodeBackground from './components/CloudToCodeBackground'
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
      <div className="bg-sky-100 min-h-screen flex items-center justify-center font-mono">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-sky-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sky-800 text-xs font-semibold tracking-wider">CONNECTING TO CLOUD DB...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="bg-sky-100 min-h-screen flex items-center justify-center font-mono">
        <p className="text-sky-900 text-sm">Failed to load portfolio. Please refresh.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative text-slate-800 selection:bg-sky-500/30 selection:text-sky-950">
      {/* Dynamic Animated Cloud to Code Background Canvas */}
      <CloudToCodeBackground />

      {/* Floating Header Navigation */}
      <Navbar profile={profile} />

      {/* Main Page Sections */}
      <main className="relative z-10 w-full">
        <Hero profile={profile} />
        <ServicesSection services={services} />
        <ProjectsSection projects={projects} />
        <TestimonialsSection testimonials={testimonials} />
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-sky-500/25 bg-white/45 backdrop-blur-md relative z-10 font-sans">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-600 font-mono">
          <span>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#home" className="hover:text-sky-600 transition-colors">Back to top</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
