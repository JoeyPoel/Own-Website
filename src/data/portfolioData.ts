/** TypeScript interfaces for portfolio data — consumed by components. */

export interface Profile {
  id?: string
  name: string
  role: string
  location: string
  availability: string
}

export interface Project {
  id: string
  title: string
  category: string
  tagline: string
  stack: string[]
  highlights: string[]
  linkLabel?: string | null
  linkUrl?: string | null
  image: string
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  company: string
}

export interface Service {
  id: string
  title: string
  description: string
  timeframe: string
}
