---
name: portfolio-hero-design-system
description: >-
  Definitive visual design system, editorial typography, color tokens, and layout
  architecture synthesized from the full-screen unboxed Hero section. Use to maintain
  flawless aesthetic consistency across all sections of Joey van der Poel's founder portfolio.
---

# Portfolio Hero Design System & Architectural Specification

This skill documents the definitive visual language, typography hierarchy, color tokens, and layout mechanics established for Joey van der Poel's personal website. Every section across the site must follow these principles to maintain aesthetic unity, luxury editorial pacing, and technical precision.

---

## 1. Core Visual Philosophy: The "Unboxed Editorial Canvas"

The portfolio deliberately rejects generic template patterns in favor of an **architectural editorial canvas** prioritizing direct visual impact, razor-sharp typography, and seamless studio photography.

### Key Tenets:
1. **Unboxed Full-Screen Immersion**:
   - The canvas spans edge-to-edge (`w-full min-h-[100dvh]`).
   - Never wrap entire sections inside rounded border cards (`rounded-[28px]` with outer margins and drop shadows) that look like isolated floating islands.
   - Sections flow into one another through shared background tokens (`var(--bg)`) and ruled hairline dividers (`border-t border-[var(--line)]`).
2. **Commanding Subject Scale**:
   - Studio imagery commands the canvas (Joey seated in his wicker chair in the Hero section; Joey in his graduation gown in the Contact section).
   - The visual asset anchors the right hemisphere while typography frames the left hemisphere.
3. **Seamless Studio Background Matching**:
   - Photographic assets are shot on studio white (`#ffffff`) and studio pitch black (`#000000`).
   - Section backgrounds match these values with 100% precision, eliminating visible cutout rectangles or compression borders.
4. **Instantaneous Initial Load (Zero Flash / No Initial Animation)**:
   - Initial load defaults strictly to light mode (`#ffffff`).
   - A synchronous head script in `index.html` sets `<html class="light" data-theme="light">` before first render.
   - A `.preload` CSS class suppresses transitions during initial mount so no animation occurs on initial visit.

---

## 2. The Strict 4-Color Palette & Theme Duality

The site strictly adheres to a **curated 4-color palette**:

| Color | Hex Code | Semantic Role |
| :--- | :--- | :--- |
| **Pure White** | `#FFFFFF` | Light mode ground canvas, dark mode primary ink/contrast text |
| **Pure Black** | `#000000` | Dark mode void canvas, light mode primary ink/contrast text |
| **Champagne** | `#FCE9C7` | Warm active indicator (Navbar active link indicator, CTA buttons) |
| **Slate Mist Blue** | `#A3B5C4` | Cool accent, "Founder & AI Engineer" badge, selected project states, card outlines, focus rings |

### 2.1 CSS Theme Tokens

```css
:root {
  --color-white: #ffffff;
  --color-black: #000000;
  --color-champagne: #fce9c7;
  --color-slate-mist: #a3b5c4;

  --bg: #ffffff;
  --ink: #000000;
  --lede: #4f5d6b;
  --accent-warm: #fce9c7;
  --accent-cool: #a3b5c4;
  --btn-bg: #000000;
  --btn-fg: #ffffff;
  --line: rgba(0, 0, 0, 0.08);
  --line-strong: rgba(0, 0, 0, 0.16);
  color-scheme: light;
}

html.dark, :root.dark, [data-theme="dark"] {
  --bg: #000000;
  --ink: #ffffff;
  --lede: #a3b5c4;
  --accent-warm: #fce9c7;
  --accent-cool: #a3b5c4;
  --btn-bg: #fce9c7;
  --btn-fg: #000000;
  --line: rgba(163, 181, 196, 0.14);
  --line-strong: rgba(252, 233, 199, 0.3);
  color-scheme: dark;
}
```

### 2.2 Photographic Asset Blending
Both studio photographs are implemented using dual layered images in the DOM for instantaneous, synchronized 200ms transitions:

- **Hero Studio Portrait**:
  - Light mode: `/JoeyWhiteBackground.jpg` with `mix-blend-multiply` against `#ffffff`.
  - Dark mode: `/JoeyBlackBackground.jpg` with `mix-blend-screen` against `#000000`.
  - Transition: `transition: opacity 200ms ease-out`.

- **Contact Studio Portrait**:
  - Light mode: `/GraduationWhiteBackground.jpg` with `mix-blend-multiply` against `#ffffff`.
  - Dark mode: `/GraduationBlackBackground.jpg` with `mix-blend-screen` against `#000000`.
  - Transition: `transition: opacity 200ms ease-out`.

### 2.3 Global Text Selection & Focus Outlines
```css
::selection {
  background: #a3b5c4;
  color: #000000;
}

*:focus-visible {
  outline: 2px solid #a3b5c4;
  outline-offset: 2px;
}
```

---

## 3. Typographic Hierarchy

The system pairs **three specialized typographic voices**:

### 3.1 Structural Sans: `Inter Tight` (`--font-sans`)
- **Weights**: Bold (`700`), Black (`900`).
- **Tracking**: Tight (`tracking-[-0.035em]` to `tracking-tight`).
- **Application**: Primary headlines, category titles, section numbers.

### 3.2 Editorial Poetry: `Instrument Serif` (`--font-serif` / `.font-editorial`)
- **Weights**: Normal (`400`), Italic (`italic`).
- **Application**: High-concept punchlines, venture hero titles, reflective statements.

### 3.3 Engineering Telemetry: `DM Mono` / `JetBrains Mono` (`font-mono`)
- **Weights**: Medium (`500`), Bold (`700`).
- **Casing & Spacing**: Uppercase, wide tracking (`uppercase tracking-[0.2em]`).
- **Size**: Micro (`text-[10px]` to `text-xs`).
- **Application**: Chapter kickers, live status pills, metric labels, technology tags.

---

## 4. Section Architecture & Components

### 4.1 Navbar
- **Brand Title**: "Joey van der Poel" with accompanying `"Founder & AI Engineer"` badge styled in Slate Mist Blue (`text-[#a3b5c4] font-mono text-[10px] sm:text-xs`).
- **Active Navigation Item**: Highlighted in Champagne (`#fce9c7`), avoiding any blue bleed or blur against the timeline.
- **Theme Toggle**: Displays Moon in light mode (to switch to dark) and Sun in dark mode (to switch to light).

### 4.2 Hero Section
- Clean unboxed canvas without artificial white ambient shadows or haze in dark mode.
- Direct alignment between headline ("Joey van der Poel • Mobile Developer & AI Engineer") and wicker chair portrait.
- Dual call-to-actions ("Explore Ventures", "Get in Touch").

### 4.3 Selected Projects (`TabsCard`)
Interactive showcase featuring the signature Framer Tabs-Card architecture with concave superellipse fillets:
- **Card Outline**: Styled in blue (`border border-[#a3b5c4]/40 dark:border-[#a3b5c4]/30 shadow-[0_4px_30px_rgba(163,181,196,0.12)]`).
- **Active Tab Selection**: Highlighted in blue tint with accent left edge (`bg-[#a3b5c4]/20 dark:bg-[#a3b5c4]/15 border-l-2 border-[#a3b5c4]`).
- **Inverted Fillets**: Concave superellipse SVG corners seamlessly connecting the tab to the right showcase panel (`text-[#a3b5c4]/20 dark:text-[#a3b5c4]/15 hidden lg:block`).
- **Showcase Preview Frame**: Blue accent border (`border border-[#a3b5c4]/30 dark:border-[#a3b5c4]/25`).
- **Venture Tags**:
  - **Tracks & Taps**: `App Store 5.0 ★, iOS Adventure, Scavenger Hunts`
  - **Connect Cultures**: `Cultural Homestays, Shared Tables, Global Community`
  - **LØST SØULS**: `145-160 BPM, Underground Techno, Community Driven`
- **Clean Showcase**: Top-right rating badge removed for minimalist focus.

### 4.4 Contact Section
- Full architectural planning interface with theme-adaptive graduation photography.
- Interactive timeline selector pills, service category tags, and direct submission.

---

## 5. Developer Rules of Thumb

1. **Strict 4-Color Compliance**: Use only `#ffffff`, `#000000`, `#fce9c7`, and `#a3b5c4`.
2. **Photography Transitions**: Always synchronize opacity changes to `200ms ease-out` so image background swaps match body background swaps without lag.
3. **No Flashing on Initial Load**: Maintain `html.light` and synchronous `.preload` execution in `index.html`.
4. **No Card Boxing of Outer Sections**: Only functional nested components (`TabsCard`, input forms) have borders; outer sections breathe edge-to-edge.
5. **Always Verify Dual-Theme Contrast**: Check both Light and Dark mode for every component update.
