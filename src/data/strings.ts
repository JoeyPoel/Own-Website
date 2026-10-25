/**
 * Centralized User-Facing String Constants for Joey van der Poel's Portfolio.
 * Single source of truth for all copy, headlines, micro-copy, labels, and placeholders.
 * Enforces zero hardcoded literals, zero em dashes, zero // slashes, and a clean minimalist aesthetic.
 */

export const STRINGS = {
  hero: {
    chapterBadge: "01 • PROFILE",
    availabilityBadge: "Founder • Builder • Creative Technologist",
    headlineStart: "Joey van der Poel",
    headlineTitle: "Builder & Founder",
    subheading: "I design and build software, mobile apps, and real-world experiences. From solo-publishing iOS apps to developing event startups and building cultural platforms.",
    credentials: [
      "Techno Event Startup (LØST SØULS)",
      "Connect Cultures (The Dream Venture)",
      "Tracks & Taps (Live on iOS App Store)",
      "MSc Applied AI & BSc Software Engineering"
    ],
    btnExploreVentures: "View Work",
    btnPartnerUp: "Get in Touch",
    scrollIndicator: "SCROLL",
    quickAnchors: [
      { label: "Tracks & Taps", href: "#tracks" },
      { label: "Connect Cultures", href: "#connectcultures" },
      { label: "LØST SØULS", href: "#lostsouls" },
      { label: "Capabilities", href: "#creative-offerings" },
      { label: "Contact", href: "#contact" }
    ]
  },

  navbar: {
    availabilityFallback: "Founder & Creative Technologist",
    founderRoleBadge: "Founder",
    btnDiscuss: "Let's Talk",
    btnCollaborate: "Contact",
    navigationLabel: "MENU",
    links: [
      { name: "About", href: "#about" },
      { name: "Tracks & Taps", href: "#tracks" },
      { name: "Connect Cultures", href: "#connectcultures" },
      { name: "LØST SØULS", href: "#lostsouls" },
      { name: "Capabilities", href: "#creative-offerings" },
      { name: "Feedback", href: "#testimonials" },
      { name: "Contact", href: "#contact" }
    ]
  },

  about: {
    chapterBadge: "02 • FOUNDER STORY",
    badge: "ABOUT",
    title: "More Than A Developer : A Founder Who Ships",
    description: "I like taking ideas from zero to production. Code is just one part of the equation: design, community, and shipping real products are what drive me.",
    locationPill: "Medemblik / Amsterdam, NL",
    degreeTitle: "MSc Applied AI • BSc Software Eng.",
    degreeDesc: "Solid technical foundation behind every product I build.",
    entrepreneurTitle: "Hands-On Execution",
    entrepreneurDesc: "I build end-to-end: from initial concept and UI design to backend architecture, deployment, and marketing.",
    creativityTitle: "Design & Technology",
    creativityDesc: "Clean code paired with thoughtful visual craft. Whether it is 3D on the web, a native iOS app, or an automated pipeline.",
    partnerSearchTitle: "Looking For Partners",
    partnerSearchDesc: "Actively seeking a growth partner for Tracks & Taps, collaborators for Lost Souls, and co-founders for Connect Cultures.",
    venturesHeader: "ACTIVE PROJECTS",
    venturesSubheader: "SELECT TO EXPLORE",
    cardTracksTag: "App Store",
    cardTracksTitle: "Tracks & Taps",
    cardTracksDesc: "Solo-built iOS travel quest app. Seeking a marketing and growth partner.",
    cardTracksCta: "View App",
    cardCCTag: "Dream Company",
    cardCCTitle: "Connect Cultures",
    cardCCDesc: "Global cultural homestay platform. Seeking co-founders and mission partners.",
    cardCCCta: "View Vision",
    cardLSTag: "Event Startup",
    cardLSTitle: "LØST SØULS",
    cardLSDesc: "Techno event startup currently in development. Focused on intimate spaces and sound culture.",
    cardLSCta: "View Concept"
  },

  creativity: {
    chapterBadge: "04 • WHAT I BUILD",
    badge: "CAPABILITIES",
    title: "What I Build",
    description: "Beside my own ventures, I partner with forward-thinking teams to build high-end digital products.",
    categories: [
      { id: "all", label: "All" },
      { id: "web", label: "Web & 3D" },
      { id: "mobile", label: "Mobile Apps" },
      { id: "ai", label: "AI & Automations" }
    ],
    btnRequest: "Start a Project",
    manifestoQuote: "I don't just write code: I build products from the ground up and care about every detail.",
    manifestoSub: "Whether you need a flagship website, an iOS/Android app, an automated AI workflow, or want to partner on a venture: let's connect.",
    btnDiscussCollab: "Let's Collaborate",
    offerings: [
      {
        id: "web",
        category: "web",
        badge: "Web & 3D",
        metric: "60-120 FPS WebGL",
        title: "Flagship Websites & 3D",
        desc: "Bespoke digital experiences with smooth 3D interactions, editorial typography, and fast performance. Built from scratch without generic templates.",
        deliverables: [
          "Interactive WebGL & Three.js",
          "Responsive Layouts & Micro-Animations",
          "Fast Performance & SEO Optimization",
          "Modern Headless Architecture"
        ],
        techStack: ["Three.js", "React", "TypeScript", "TailwindCSS", "WebGL", "Vite"]
      },
      {
        id: "mobile",
        category: "mobile",
        badge: "Mobile Apps",
        metric: "App Store Shipped",
        title: "Native Mobile Applications",
        desc: "Smooth iOS and Android apps designed for intuitive usability, offline storage, and reliable App Store delivery.",
        deliverables: [
          "App Store & Google Play Publishing",
          "Offline Data & Cloud Sync",
          "Fluid Animations & Haptics",
          "Native Device Sensor Integration"
        ],
        techStack: ["React Native", "Expo", "Swift", "Supabase", "StoreKit", "Mapbox"]
      },
      {
        id: "ai",
        category: "ai",
        badge: "AI Systems",
        metric: "Automated Workflows",
        title: "AI & Workflow Automations",
        desc: "Automated pipelines, intelligent assistants, and computer vision models that streamline operations and eliminate manual work.",
        deliverables: [
          "Automated Content & Data Pipelines",
          "Computer Vision & Recognition Models",
          "Custom AI Workflows & Assistants",
          "API Integrations & Cloud Services"
        ],
        techStack: ["Python", "PyTorch", "OpenAI / Claude API", "LangChain", "FastAPI", "Docker"]
      }
    ]
  },

  testimonials: {
    chapterBadge: "05 • FEEDBACK",
    badge: "RECOMMENDATIONS",
    verifiedReviewsPill: "VERIFIED REVIEWS",
    title: "Client & Team Feedback",
    description: "Recommendations from leaders at The Swap Club, DEPT®, and Tata Steel.",
    ratingValue: "5.0 / 5.0 Rating",
    ratingVerifyLink: "Verify on LinkedIn",
    trustItem1: "On-Time Production Delivery",
    trustItem2: "Direct Founder Ownership",
    trustItem3: "Technical & Practical Rigor",
    badgeSwap: "Mobile App MVP",
    badgeDept: "AI Chatbot & Vision",
    badgeTata: "Workflow Automation",
    roleSwap: "iOS / Android App",
    roleDept: "AI Chatbot & CV",
    roleTata: "Automated Pipeline",
    fallbackTrustBadge: "Verified Project",
    fallbackRole: "Engineering & Delivery"
  },

  contact: {
    chapterBadge: "06 • GET IN TOUCH",
    badge: "COLLABORATE",
    title: "Let's Build Together",
    description: "Whether you want to partner on a venture, collaborate on rave events, co-found Connect Cultures, or hire me to build a product.",
    statusTitle: "Available for Ventures & Builds",
    statusSub: "Direct reply within 24 hours",
    directEmailTitle: "Email",
    directEmailValue: "Joeywognum@gmail.com",
    linkedinTitle: "LinkedIn",
    linkedinValue: "Joey van der Poel",
    githubTitle: "GitHub",
    githubValue: "github.com/JoeyPoel",
    step1Title: "Select a topic *",
    step1Hint: "Choose one",
    step2Title: "Target timeline",
    step3NameLabel: "Name *",
    step3NamePlaceholder: "Your name",
    step3CompanyLabel: "Company / Project (Optional)",
    step3CompanyPlaceholder: "Brand, startup, or venue",
    step4EmailLabel: "Email *",
    step4EmailPlaceholder: "your@email.com",
    step4PhoneLabel: "Phone / WhatsApp (Optional)",
    step4PhonePlaceholder: "+31 6 12345678",
    step5LinksLabel: "Links or Deck (Optional)",
    step5AddLinkBtn: "Add Link",
    step6MessageLabel: "Message *",
    step6MessagePlaceholder: "Tell me about your project, idea, or partnership vision...",
    otherPlaceholder: "Please describe your topic...",
    errorMessageDefault: "Something went wrong. Please try again or email directly.",
    btnSubmitting: "Sending...",
    btnSubmit: "Send Message",
    successTitle: "Message Sent",
    successDesc: "Thank you for reaching out. I will get back to you within 24 hours.",
    collaborationOptions: [
      { id: "tracks", label: "Tracks & Taps (Marketing & Growth Partner)", category: "Mobile App" },
      { id: "lostsouls", label: "LØST SØULS (Startup Collaborator / Venue Partner)", category: "Music Startup" },
      { id: "connectcultures", label: "Connect Cultures (Co-Founder / Partner)", category: "Travel Venture" },
      { id: "bespoke", label: "Bespoke Build (Web / App / AI)", category: "Client Project" },
      { id: "other", label: "Other Venture / Opportunity", category: "General" }
    ],
    timelineOptions: [
      "Immediate / Priority",
      "Within 1-2 Months",
      "Flexible"
    ]
  },

  wayfinder: {
    ariaLabel: "Portfolio Journey Navigation",
    steps: [
      { id: "about", num: "01", label: "Story", href: "#about" },
      { id: "tracks", num: "02", label: "Tracks & Taps", href: "#tracks" },
      { id: "connectcultures", num: "03", label: "Connect Cultures", href: "#connectcultures" },
      { id: "lostsouls", num: "04", label: "LØST SØULS", href: "#lostsouls" },
      { id: "creative-offerings", num: "05", label: "Capabilities", href: "#creative-offerings" },
      { id: "contact", num: "06", label: "Contact", href: "#contact" }
    ]
  },

  footer: {
    tagline: "Founder & Creative Technologist",
    allRightsReserved: "All rights reserved.",
    links: [
      { name: "Connect Cultures", href: "https://www.connectcultures.world/" },
      { name: "LØST SØULS", href: "https://lostsouls-events.com/" },
      { name: "Tracks & Taps", href: "https://apps.apple.com/nl/app/tracks-taps-your-tour-guide/id6756650785?l=en-GB" },
      { name: "LinkedIn", href: "https://www.linkedin.com/in/joey-van-der-poel-974203302/" },
      { name: "GitHub", href: "https://github.com/JoeyPoel" }
    ]
  },

  links: {
    linkedin: "https://www.linkedin.com/in/joey-van-der-poel-974203302/",
    appStore: "https://apps.apple.com/nl/app/tracks-taps-your-tour-guide/id6756650785?l=en-GB",
    github: "https://github.com/JoeyPoel",
    recommendations: "https://www.linkedin.com/in/joey-van-der-poel-974203302/details/recommendations/?detailScreenTabIndex=0",
    connectCultures: "https://www.connectcultures.world/",
    lostSouls: "https://lostsouls-events.com/"
  }
}
