import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileText, Cpu, Database, Play, RefreshCw } from 'lucide-react'

export default function AutomationVisualizer() {
  const [terminalStep, setTerminalStep] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)

  // Raw mock input
  const rawInput = `city,theme,stops,pubgolf,bingo,lang,instructions
"Rome","Ancient Ruins",30,YES,YES,EN,"Focus on Colosseum"`

  // Parsed structured JSON output
  const structuredOutput = {
    title: "Rome: Ancient Ruins",
    theme: "history",
    pubgolf: true,
    stops: [
      {
      name: "Colosseum",
      coordinates: [41.8902, 12.4922],
      type: "historic",
      challenge: {
        type: "TRIVIA",
        question: "Which emperor completed the Colosseum?",
        answer: "Titus"
      },
      pubgolf: {
        hole: 1,
        par: 3,
        drink: "Glass of White Wine"
      }
    },
    {
      name: "Roman Forum",
      coordinates: [41.8925, 12.4853],
      type: "historic",
      challenge: {
        type: "RIDDLE",
        question: "I was the heart of public life in ancient Rome. What am I?",
        answer: "The Roman Forum"
      }
    }
  ]
};

  const logSteps = [
    { text: "📥 [1/8] INGEST  ─── Ingested Rome CSV row", color: "text-slate-400" },
    { text: "🔍 [2/8] SEARCH  ─── Discovered landmarks & gems", color: "text-theme" },
    { text: "📍 [3/8] GEOMAP  ─── Geocoded coordinates (Photon)", color: "text-cyan-400" },
    { text: "🚲 [4/8] ROUTE   ─── Solved TSP walking route", color: "text-cyan-400" },
    { text: "🛡️ [5/8] VERIFY  ─── Injected 4 missed sights", color: "text-amber-400" },
    { text: "✍️ [6/8] WRITE   ─── Generated story & games", color: "text-cyan-400" },
    { text: "📸 [7/8] COVER   ─── Fetched Unsplash image", color: "text-slate-400" },
    { text: "🚀 [8/8] PUBLISH ─── Synced tour to Database", color: "text-emerald-400 font-bold" }
  ]

  useEffect(() => {
    if (!isProcessing) return
    setTerminalStep(0)
    
    const interval = setInterval(() => {
      setTerminalStep((prev) => {
        if (prev >= logSteps.length - 1) {
          clearInterval(interval)
          setIsProcessing(false)
          return prev
        }
        return prev + 1
      })
    }, 450)

    return () => clearInterval(interval)
  }, [isProcessing])

  return (
    <section id="automation-visualizer" className="py-24 relative bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.5 }}
        className="max-w-7xl mx-auto px-6 relative z-10 transform-gpu will-change-transform"
      >
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-bold tracking-widest text-theme font-mono uppercase bg-theme-10 px-3 py-1 rounded-full">
            Automatic Tour Generator
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-slate-850 mt-4 mb-4">
            Autonomous Pipelines
          </h2>
          <p className="text-slate-650 max-w-xl mx-auto text-sm md:text-base font-sans">
            A visual simulation of the multi-model AI pipeline built for Tracks & Taps. It reads tour themes, discovers sights, geocodes and routes stops, verifies quality, writes narratives, and posts production-ready tours on autopilot.
          </p>
        </div>

        {/* 1. Node Pipeline Diagram */}
        <div className="bg-white/40 border border-white/70 rounded-2xl p-6 md:p-8 mb-12 shadow-sm backdrop-blur-md">
          <h3 className="text-xs font-bold font-mono text-slate-500 uppercase tracking-widest mb-6 text-center">
            Automatic Tour Generator & Routing Flow
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            
            {/* Node 1 */}
            <div className="flex flex-col items-center text-center p-4 bg-theme-10 border border-theme-30 rounded-xl w-48 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-0.5 bg-theme animate-pulse" />
              <FileText className="w-6 h-6 text-theme mb-2" />
              <span className="text-[11px] font-bold font-mono text-theme uppercase tracking-wide">1. CSV Input</span>
              <span className="text-[9px] text-slate-600 mt-1">tours.csv | City + Theme</span>
            </div>

            {/* Connector 1 */}
            <div className="hidden md:block text-slate-400 font-extrabold">➔</div>
            <div className="md:hidden text-slate-400 font-extrabold my-1">⬇</div>

            {/* Node 2 */}
            <div className="flex flex-col items-center text-center p-4 bg-theme-10 border border-theme-30 rounded-xl w-48 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-0.5 bg-theme animate-pulse" />
              <Cpu className="w-6 h-6 text-theme mb-2" />
              <span className="text-[11px] font-bold font-mono text-theme uppercase tracking-wide">2. Two-Phase Solver</span>
              <span className="text-[9px] text-slate-600 mt-1">AI + Geocoding + TSP Routing</span>
            </div>

            {/* Connector 2 */}
            <div className="hidden md:block text-slate-400 font-extrabold">➔</div>
            <div className="md:hidden text-slate-400 font-extrabold my-1">⬇</div>

            {/* Node 3 */}
            <div className="flex flex-col items-center text-center p-4 bg-theme-10 border border-theme-30 rounded-xl w-48 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-0.5 bg-theme animate-pulse" />
              <Database className="w-6 h-6 text-theme mb-2" />
              <span className="text-[11px] font-bold font-mono text-theme uppercase tracking-wide">3. Production Sync</span>
              <span className="text-[9px] text-slate-600 mt-1">POST json | Live Release</span>
            </div>

          </div>
        </div>

        {/* 2. Side-by-Side Data Transformation & Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-12">
          
          {/* Left Column: Data Parser visualizer */}
          <div className="flex flex-col gap-6 p-6 md:p-8 bg-white/50 border border-white/70 rounded-2xl shadow-xs backdrop-blur-md">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold font-mono text-slate-650 uppercase tracking-wide">
                Live Data Transformation
              </h4>
              <button
                onClick={() => setIsProcessing(true)}
                disabled={isProcessing}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-theme text-white text-[10px] font-bold uppercase tracking-wider transition-all disabled:opacity-50"
              >
                {isProcessing ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
                <span>{isProcessing ? "Generating..." : "Trigger Generator"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
              
              {/* Messy Raw Input */}
              <div className="md:col-span-5 flex flex-col gap-2">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">tours.csv Row</span>
                <div className="bg-slate-900 rounded-xl p-3.5 border border-slate-700/50 aspect-[4/3] overflow-auto">
                  <pre className="text-[10px] text-slate-300 font-mono whitespace-pre-wrap select-none">
                    {rawInput}
                  </pre>
                </div>
              </div>

              {/* Parser middle badge */}
              <div className="md:col-span-1 flex justify-center py-2">
                <div className="px-3 py-1 rounded-lg bg-theme-15 border border-theme-30 text-theme text-[8px] font-bold uppercase tracking-widest font-mono text-center rotate-0 md:-rotate-90 md:whitespace-nowrap shadow-xs">
                  Tour Builder
                </div>
              </div>

              {/* Structured JSON Output */}
              <div className="md:col-span-5 flex flex-col gap-2">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider flex justify-between block">
                  <span>Structured Tour Payload (JSON)</span>
                  <span className="text-emerald-500 font-bold lowercase">stops matched: 100%</span>
                </span>
                <div className="bg-slate-900 rounded-xl p-3.5 border border-slate-700/50 aspect-[4/3] overflow-auto">
                  <pre className="text-[10px] text-cyan-400 font-mono leading-relaxed select-none">
                    {JSON.stringify(structuredOutput, null, 2)}
                  </pre>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Simulated Terminal Log Box */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-xl flex flex-col justify-between overflow-hidden">
            
            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
              <span className="text-[9px] text-slate-500 font-mono">tour-pipeline@tracks-and-taps: ~</span>
              <div className="w-10" />
            </div>

            {/* Terminal Body Console */}
            <div className="p-6 flex-1 flex flex-col gap-2.5 font-mono text-[11px] leading-relaxed overflow-y-auto min-h-[220px]">
              {terminalStep === 0 && !isProcessing ? (
                <div className="text-slate-500 italic text-xs py-4 text-center">
                  Click 'Trigger Generator' to simulate a live execution trace...
                </div>
              ) : (
                logSteps.slice(0, terminalStep + 1).map((log, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: 'tween', ease: 'easeOut', duration: 0.25 }}
                    className={log.color}
                  >
                    {log.text}
                  </motion.div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* 3. Metric Highlight Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white/60 border border-white/70 shadow-xs text-center">
            <span className="block text-3xl font-extrabold text-theme font-mono mb-1">~2 Hours</span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">Saved Per Tour Generation</span>
          </div>
          <div className="p-5 rounded-2xl bg-white/60 border border-white/70 shadow-xs text-center">
            <span className="block text-3xl font-extrabold text-theme font-mono mb-1">Quota-Safe</span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">Optimized Prompt Split-Ups & Model Picking</span>
          </div>
          <div className="p-5 rounded-2xl bg-white/60 border border-white/70 shadow-xs text-center">
            <span className="block text-3xl font-extrabold text-theme font-mono mb-1">90%</span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">Automating Creation (Manual Checks)</span>
          </div>
        </div>

      </motion.div>
    </section>
  )
}
