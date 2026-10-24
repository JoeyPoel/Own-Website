/* eslint-disable */
// @ts-nocheck
"use client";
import FibreArc from "@/components/originkit/ui/hero-68/fibre-arc"
import PulseLines from "@/components/originkit/ui/hero-68/pulse-lines"

const NAV = ["Platform", "Solutions", "Resources", "Pricing", "Company"]

const RIBBON = {
  light: { background: "#EEEDEA", ink: "#000000" },
  dark: { background: "#08070E", ink: "#FFFFFF", glow: 70 },
}
const scheme = (document.documentElement.dataset.scheme as "light" | "dark" | undefined)
  ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")

const Chevron = () => (
  <svg width="7" height="12" viewBox="0 0 7 12" aria-hidden="true">
    <path d="M1 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.2" />
  </svg>
)

const Arrow = () => (
  <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true">
    <path d="M0 6h14.5M9.5 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.3" />
  </svg>
)

export default function App() {
  return (
    <section className="hero">
      <FibreArc {...RIBBON[scheme]} style={{ position: "absolute", inset: 0 }} />

      <div className="grid" aria-hidden="true">
        <div className="wrap cols">
          {[99, 66, 33].map((speed) => (
            <i key={speed}>
              {}
              {scheme === "dark" && (
                <PulseLines
                  gap={100000}
                  lineWidth={2}
                  pulseWidth={6}
                  duration={5}
                  speed={speed}
                  backgroundColor="transparent"
                  lineColor="rgba(255, 255, 255, 0.08)"
                  colors={{ paletteCount: 2, color1: "#6A00F4", color2: "#F20089" }}
                />
              )}
            </i>
          ))}
        </div>
        <span className="hline" style={{ top: "29.1%" }} />
      </div>

      <header className="nav">
        <div className="wrap nav-inner">
          <a href="/" className="logo">
            {}
            <svg width="26" height="20" viewBox="0 0 26 20" aria-hidden="true">
              <path d="M3 17A10 10 0 0 1 23 17" fill="none" stroke="currentColor" strokeWidth="3" />
              <circle cx="3" cy="17" r="3" fill="currentColor" />
              <circle cx="23" cy="17" r="3" fill="currentColor" />
            </svg>
            Arcline
          </a>
          <nav className="links">
            {NAV.map((l) => <a key={l} href={`#${l.toLowerCase()}`}>{l}</a>)}
          </nav>
          <div className="actions">
            <a href="#contact" className="btn btn-sm">Contact us <Chevron /></a>
          </div>
        </div>
      </header>

      <div className="content">
        <h1 className="wrap headline">Engineered for the<br />Demands of Tomorrow.</h1>
        <div className="cta-row">
          <div className="wrap cta-inner">
            <a href="#platform" className="btn btn-lg">Explore the Platform <Arrow /></a>
            <p className="lede">
              Build a more resilient network with intelligent optimization, reduced latency,
              and real-time visibility across your infrastructure.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}