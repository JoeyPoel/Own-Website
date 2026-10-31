/**
 * Centralized User-Facing String Constants for Joey van der Poel's Portfolio.
 * Single source of truth for all copy, headlines, micro-copy, labels, and placeholders.
 * Enforces zero hardcoded literals, zero em dashes, zero // slashes, and a clean minimalist aesthetic.
 */

export const STRINGS = {
  meta: {
    title: "Joey van der Poel | Mobile Developer & AI Automation Engineer",
    description: "Joey van der Poel is a Mobile Developer and AI Automation Engineer (MSc Applied AI candidate) building high-impact iOS apps, AI workflows, and digital platforms.",
  },

  hero: {
    chapterBadge: "PROFILE",
    availabilityBadge: "Founder • Builder • Creative Technologist",
    headlineStart: "Joey van der Poel",
    headlineTitle: "Builder & Founder",
    headlineMain: "Software & products",
    headlineItalic: "for bold visions.",
    bio: "Currently pursuing an MSc in Applied AI. Alongside my studies, I partner with ambitious founders and teams to engineer intelligent systems, performant mobile apps, and high-impact digital platforms.",
    btnWork: "See my work",
    btnContact: "Let's collaborate",
    roleBadge: "Mobile Developer & AI Engineer",
    academicBadge: "MSc Applied AI Candidate",
    subheading: "I design and build software, mobile apps, and real-world experiences. From solo-publishing iOS apps to developing event startups and building cultural platforms.",
    credentials: [
      "Underground Rave Collective (LØST SØULS)",
      "Connect Cultures (My Dream Company)",
      "Tracks & Taps (Live on iOS App Store)",
      "MSc Applied AI & BSc Software Engineering"
    ],
    btnExploreVentures: "View Work",
    btnPartnerUp: "Get in Touch",
    scrollIndicator: "SCROLL",
    quickAnchors: [
      { label: "Projects", href: "#projects" },
      { label: "Experience", href: "#experience" },
      { label: "Capabilities", href: "#creative-offerings" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Contact", href: "#contact" }
    ]
  },

  navbar: {
    availabilityFallback: "Mobile Developer & AI Engineer",
    founderRoleBadge: "Mobile Developer & AI Engineer",
    btnDiscuss: "Get in Touch",
    btnCollaborate: "Contact",
    navigationLabel: "NAVIGATION",
    links: [
      { name: "Projects", href: "#projects" },
      { name: "Experience", href: "#experience" },
      { name: "Capabilities", href: "#creative-offerings" },
      { name: "Testimonials", href: "#testimonials" },
    ]
  },

  about: {
    chapterBadge: "FOUNDER STORY",
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
    cardCCTag: "My Dream Company",
    cardCCTitle: "Connect Cultures",
    cardCCDesc: "Not yet an actual company, but my dream company and personal ambition to make a reality.",
    cardCCCta: "View Vision",
    cardLSTag: "Event Startup",
    cardLSTitle: "LØST SØULS",
    cardLSDesc: "Community-driven underground rave collective focused on uncommercialized spaces and emerging talent.",
    cardLSCta: "View Concept"
  },

  projects: {
    title: "Selected Projects",
    description: "Explore my published iOS app, my vision for Connect Cultures, and an underground events concept in development.",
    tabs: [
      {
        id: "tracks",
        subtitle: "Your Gamified Tour Guide",
        description: "Turn city walks into interactive scavenger hunts with real-world landmarks, challenges, and trivia. The app is available in multiple languages.",
        tags: "App Store 5.0 ★, iOS Adventure, Scavenger Hunts",
        badge: "Live App",
        buttonText: "Download on App Store",
        rating: "5.0 ★ (4 Ratings)",
      },
      {
        id: "connectcultures",
        subtitle: "My Dream Company",
        description: "Connect Cultures is not yet an actual company, but my dream company and personal ambition to make a reality: a global cultural collective connecting travelers with real local homes, shared meals, and authentic living rooms across borders.",
        tags: "My Dream Company, Cultural Homestays, Shared Tables, Global Community",
        badge: "My Dream Company",
        buttonText: "Explore connectcultures.world",
        rating: "My Dream Company Vision",
      },
      {
        id: "lostsouls",
        subtitle: "Techno Event Startup",
        description: "A community-driven underground rave collective in development. An uncommercialized space with no VIP enclosures: a place to stay present, get lost in high-pressure sound, and provide a proving ground for emerging talent.",
        tags: "145-160 BPM, Underground Techno, In Development",
        badge: "In Development",
        buttonText: "Explore lostsouls-events.com",
        rating: "Nightlife Startup",
      },
    ]
  },

  experience: {
    title: "Engineering Journey",
    description: "Hands-on enterprise engineering, startup publishing, and academic leadership. Click or scrub through the milestones below.",
    downloadCvBtn: "Download Resume",
    prevBtn: "Prev",
    nextBtn: "Next",
    counterOf: "of",
    milestones: [
      {
        id: 'auas',
        role: 'Student Mentor',
        type: 'Academic • Parttime',
        period: 'Sep 2026 – Present',
        location: 'Amsterdam, NL',
        headline: 'Mentoring Future AI & Software Engineers',
        summary: 'Guiding students through core applied AI curricula, providing constructive feedback on algorithms and software design, and coaching cohorts in foundational computer science.',
        highlights: [
          'Delivered constructive technical reviews on code quality and AI models',
          'Coached cohorts in software design patterns and mathematical problem-solving',
          'Fostered collaborative engineering habits and autonomous troubleshooting',
        ],
        caption: 'Amsterdam University of Applied Sciences',
      },
      {
        id: 'swap-club',
        role: 'Mobile Application Developer',
        type: 'Circular Economy • Internship',
        period: 'Nov 2025 – Jan 2026',
        location: 'Amsterdam, NL (Hybrid)',
        headline: 'Cross-Platform React Native App for Circular Economy',
        summary: 'Engineered the mobile client for The Swap Club, focusing on strict architectural stability, modular design patterns, and real-time inventory trading flows.',
        highlights: [
          'Built production client in React Native with Expo and end-to-end TypeScript strict typing',
          'Architected reactive state flows and Supabase PostgreSQL data persistence',
          'Enforced component-driven reusability and strict linting standards from day one',
        ],
        caption: 'The Swap Club',
      },
      {
        id: 'tracks-taps',
        role: 'Founder & Lead Developer',
        type: 'Product Owner • Solo Build',
        period: 'Jun 2025 – Present',
        location: 'App Store Worldwide',
        headline: 'Solo-Engineered Travel Quest App Live on iOS App Store',
        summary: 'Spent over a year architecting, building, and deploying Tracks & Taps solo from initial wireframes to production release on the Apple App Store.',
        highlights: [
          'Engineered cross-platform mobile client with offline-first local caching',
          'Built interactive scavenger hunts, canal routes, and Pub Golf challenges',
          'Navigated complete Apple App Store review, TestFlight cycles, and StoreKit deployment',
        ],
        caption: 'Tracks & Taps',
      },
      {
        id: 'dept',
        role: 'Android Developer',
        type: 'Agency Project • 5-Person Team',
        period: 'Mar 2025 – Jun 2025',
        location: 'Rotterdam, NL (Hybrid)',
        headline: 'Native Kotlin App with OpenAI & Universal Accessibility',
        summary: 'Engineered a native Android application prioritizing intelligent AI integration, geospatial features with Mapbox, and full TalkBack screen reader accessibility.',
        highlights: [
          'Built native dynamic UI with Jetpack Compose featuring TalkBack support, high-contrast display options, and scalable text',
          'Integrated intelligent OpenAI chatbot API and custom on-device computer vision models',
          'Implemented real-time authentication and cloud synchronization with Firebase and Mapbox SDK',
        ],
        caption: 'DEPT® Global Agency',
      },
      {
        id: 'tata-steel',
        role: 'Strategic HR Analytics & RPA Engineer',
        type: 'Enterprise Systems • 1 yr 10 mo',
        period: 'Sep 2024 – Jun 2026',
        location: 'IJmuiden, NL (Hybrid)',
        headline: 'SAP SuccessFactors Restructuring & Core RPA Pipelines',
        summary: 'Graduation research diagnosing and optimizing Tata Steel talent pipelines within SAP SuccessFactors, coupled with building enterprise-scale document understanding automations.',
        highlights: [
          'Formulated strategic framework replacing subjective potential labels with growth tracking in SAP SuccessFactors',
          'Engineered Digital Order Entry RPA utilizing Document Understanding models for unstructured data',
          'Automated legacy mainframe price lists, eliminating 90% of repetitive manual data entry',
          'Spearheaded TSP Non-Prime order automation and executed critical server migrations',
        ],
        caption: 'Tata Steel',
      },
      {
        id: 'youngones',
        role: 'Independent Freelance Professional',
        type: 'Freelance Operations • 2 yr 2 mo',
        period: 'Feb 2023 – Mar 2025',
        location: 'North Holland, NL',
        headline: 'Dynamic On-Demand Operations & Adaptability',
        summary: 'Executed diverse commercial operations across retail, events, and logistics while managing independent scheduling, client administration, and invoicing.',
        highlights: [
          'Demonstrated rapid adaptability across fast-paced event, retail, and logistics environments',
          'Managed full independent freelance administration, bookkeeping, and invoicing',
          'Cultivated hands-on problem-solving, real-time crisis triage, and team coordination',
        ],
        caption: 'YoungOnes Platform',
      },
    ]
  },

  creativity: {
    chapterBadge: "WHAT I BUILD",
    badge: "CAPABILITIES",
    title: "What I Build",
    description: "Alongside my own ventures, I help teams build high-quality digital products.",
    categories: [
      { id: "all", label: "All" },
      { id: "web", label: "Web Applications" },
      { id: "mobile", label: "Mobile Apps" },
      { id: "ai", label: "AI & Automations" }
    ],
    btnRequest: "Start a Project",
    manifestoQuote: "I don't just write code: I build products from the ground up and care about every detail.",
    manifestoSub: "Whether you need a website, an iOS/Android app, an automated AI workflow, or want to partner on a new venture: let's connect.",
    btnDiscussCollab: "Let's Collaborate",
    offerings: [
      {
        id: "web",
        category: "web",
        badge: "Web Applications",
        metric: "Fast & Fluid Motion",
        title: "Modern Websites & Web Apps",
        desc: "Bespoke digital experiences with editorial typography, fluid micro-animations, and fast performance. Engineered from scratch with modern frontend architecture.",
        deliverables: [
          "Custom Responsive Layouts & Interactions",
          "Component-Driven Architecture & Clean Code",
          "Fast Performance & SEO Optimization",
          "End-to-End TypeScript Type Safety"
        ],
        techStack: ["React", "TypeScript", "TailwindCSS", "Vite", "Framer Motion", "Next.js"]
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
    chapterBadge: "FEEDBACK",
    badge: "RECOMMENDATIONS",
    verifiedReviewsPill: "VERIFIED REVIEWS",
    title: "Testimonials",
    description: "Recommendations from leaders at The Swap Club, DEPT®, and Tata Steel.",
    ratingValue: "3 Recommendations",
    ratingSub: "Verified on LinkedIn",
    ratingVerifyLink: "View on LinkedIn",
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
    fallbackRole: "Engineering & Delivery",
    translationNotice: "",
    items: [
      {
        id: "1",
        quote: "Joey took real ownership without needing much direction. Communication was clear and practical, deadlines were consistently met, and he brought a steady, solution-focused energy.",
        author: "Megan de Klein",
        role: "Co-Founder",
        company: "The Swap Club",
      },
      {
        id: "2",
        quote: "Joey pushed the boundaries of the assignment by integrating AI features such as a chatbot and a custom image recognition model. He approached the stack with curiosity and depth.",
        author: "Ramon Nagelhout",
        role: "Product Owner",
        company: "DEPT®",
      },
      {
        id: "3",
        quote: "Highly eager to learn, quickly grasps new concepts and consistently takes a solution-oriented approach. His application of AI within our workflows proved particularly valuable.",
        author: "Sarah Lee Otto",
        role: "Team Lead",
        company: "Tata Steel",
      },
    ]
  },

  contact: {
    chapterBadge: "GET IN TOUCH",
    badge: "CONTACT",
    title: "Let's build together.",
    titleItalic: "together.",
    description: "Have a venture idea, need a mobile or AI product built, or want to collaborate? Send a direct note or reach out via email.",
    statusTitle: "Available for Ventures & Digital Products",
    statusSub: "Reply within 24 hours",
    directEmailTitle: "Direct Email",
    directEmailValue: "Joeywognum@gmail.com",
    linkedinTitle: "LinkedIn",
    linkedinValue: "Joey van der Poel",
    githubTitle: "GitHub",
    githubValue: "github.com/JoeyPoel",
    quickMessageTitle: "Quick Message",
    nameLabel: "Your Name",
    namePlaceholder: "e.g. Alex Miller",
    emailLabel: "Your Email",
    emailPlaceholder: "alex@example.com",
    messageLabel: "Message",
    messagePlaceholder: "Tell me about your idea, project, or venture...",
    privacyNote: "Your name, email address, and message are used solely to reply to your inquiry. No personal data is stored in databases or shared with third parties.",
    btnSubmit: "Send Message",
    btnSubmitting: "Sending...",
    copyBtn: "Copy",
    btnCopy: "Copy Email",
    copiedFeedback: "Copied to clipboard",
    successTitle: "Message Sent!",
    successDesc: "Thank you for reaching out! I've received your note and dispatched a confirmation to your inbox. I will get back to you shortly.",
    errorGeneric: "Failed to send message. Please verify your details or email me directly at Joeywognum@gmail.com.",
    resetBtn: "Send another note",
  },

  wayfinder: {
    ariaLabel: "Portfolio Journey Navigation",
    steps: [
      { id: "tracks", num: "01", label: "Tracks & Taps", href: "#tracks" },
      { id: "connectcultures", num: "02", label: "Connect Cultures", href: "#connectcultures" },
      { id: "lostsouls", num: "03", label: "LØST SØULS", href: "#lostsouls" },
      { id: "creative-offerings", num: "04", label: "Capabilities", href: "#creative-offerings" },
      { id: "contact", num: "05", label: "Contact", href: "#contact" }
    ]
  },

  footer: {
    tagline: "Mobile Developer & AI Engineer",
    allRightsReserved: "All rights reserved.",
    links: [
      { name: "Resume", href: "/Resume_Joey_van_der_Poel.pdf" },
      { name: "Connect Cultures", href: "https://www.connectcultures.world/" },
      { name: "LØST SØULS", href: "https://lostsouls-events.com/" },
      { name: "Tracks & Taps", href: "https://apps.apple.com/nl/app/tracks-taps-your-tour-guide/id6756650785?l=en-GB" },
      { name: "LinkedIn", href: "https://www.linkedin.com/in/joey-van-der-poel-974203302/" },
      { name: "GitHub", href: "https://github.com/JoeyPoel" }
    ]
  },

  links: {
    cv: "/Resume_Joey_van_der_Poel.pdf",
    linkedin: "https://www.linkedin.com/in/joey-van-der-poel-974203302/",
    appStore: "https://apps.apple.com/nl/app/tracks-taps-your-tour-guide/id6756650785?l=en-GB",
    github: "https://github.com/JoeyPoel",
    recommendations: "https://www.linkedin.com/in/joey-van-der-poel-974203302/details/recommendations/?detailScreenTabIndex=0",
    connectCultures: "https://www.connectcultures.world/",
    lostSouls: "https://lostsouls-events.com/"
  }
}

/**
 * Type contract ensuring identical shape across all language localizations.
 */
export type PortfolioStrings = typeof STRINGS

/**
 * Explicit English localization alias.
 */
export const STRINGS_EN: PortfolioStrings = STRINGS

/**
 * Complete Dutch (Nederlands) localization for Joey van der Poel's Portfolio.
 * Mirrors STRINGS 1:1 with natural, editorial-grade Dutch copy.
 */
export const STRINGS_NL: PortfolioStrings = {
  meta: {
    title: "Joey van der Poel | Mobile Developer & AI Automation Engineer",
    description: "Joey van der Poel is een Mobile Developer en AI Automation Engineer (MSc Applied AI) die hoogwaardige mobiele apps, AI-workflows en digitale platformen bouwt.",
  },

  hero: {
    chapterBadge: "PROFIEL",
    availabilityBadge: "Founder • Builder • Creative Technologist",
    headlineStart: "Joey van der Poel",
    headlineTitle: "Builder & Founder",
    headlineMain: "Software en digitale producten",
    headlineItalic: "voor ambitieuze visies.",
    bio: "Momenteel volg ik de master Applied AI. Daarnaast help ik ambitieuze oprichters en teams met het ontwikkelen van intelligente systemen, hoogwaardige mobiele apps en doordachte digitale platformen.",
    btnWork: "Bekijk mijn werk",
    btnContact: "Kennismaken",
    roleBadge: "Mobile Developer & AI Engineer",
    academicBadge: "MSc Applied AI",
    subheading: "Ik ontwerp en ontwikkel software, mobiele applicaties en fysieke ervaringen. Van zelfstandig gepubliceerde iOS-apps tot innovatieve evenementen en culturele platformen.",
    credentials: [
      "Underground rave-concept (LØST SØULS)",
      "Connect Cultures (Mijn droombedrijf)",
      "Tracks & Taps (Live in de App Store)",
      "MSc Applied AI & BSc Software Engineering"
    ],
    btnExploreVentures: "Bekijk werk",
    btnPartnerUp: "Neem contact op",
    scrollIndicator: "SCROLL",
    quickAnchors: [
      { label: "Projecten", href: "#projects" },
      { label: "Ervaring", href: "#experience" },
      { label: "Expertise", href: "#creative-offerings" },
      { label: "Aanbevelingen", href: "#testimonials" },
      { label: "Contact", href: "#contact" }
    ]
  },

  navbar: {
    availabilityFallback: "Mobile Developer & AI Engineer",
    founderRoleBadge: "Mobile Developer & AI Engineer",
    btnDiscuss: "Kennismaken",
    btnCollaborate: "Contact",
    navigationLabel: "NAVIGATIE",
    links: [
      { name: "Projecten", href: "#projects" },
      { name: "Ervaring", href: "#experience" },
      { name: "Expertise", href: "#creative-offerings" },
      { name: "Aanbevelingen", href: "#testimonials" },
    ]
  },

  about: {
    chapterBadge: "OPRICHTERSVERHAAL",
    badge: "OVER MIJ",
    title: "Meer dan een developer: een bouwer die écht oplevert",
    description: "Ik breng ideeën het liefst van concept tot een echt werkend product. Code is daarbij een middel: doordacht design, een hechte community en het daadwerkelijk lanceren van producten zijn wat mij drijft.",
    locationPill: "Medemblik / Amsterdam, NL",
    degreeTitle: "MSc Applied AI • BSc Software Eng.",
    degreeDesc: "Een solide academische en technische fundering achter ieder product dat ik ontwikkel.",
    entrepreneurTitle: "Hands-on bouwen",
    entrepreneurDesc: "Ik bouw alles zelf van begin tot eind: van het eerste concept en UI-design tot backend, deployment en lancering.",
    creativityTitle: "Design & technologie",
    creativityDesc: "Strakke code gecombineerd met oog voor design. Van 3D-interacties op het web tot native iOS-apps en slimme automatiseringen.",
    partnerSearchTitle: "Op zoek naar partners",
    partnerSearchDesc: "Actief op zoek naar een groeipartner voor Tracks & Taps, creatieve krachten voor LØST SØULS en medeoprichters voor Connect Cultures.",
    venturesHeader: "ACTIEVE PROJECTEN",
    venturesSubheader: "SELECTEER OM TE VERKENNEN",
    cardTracksTag: "App Store",
    cardTracksTitle: "Tracks & Taps",
    cardTracksDesc: "Zelf ontwikkelde speurtocht-app voor iOS. Zoekt een gedreven marketing- en groeipartner.",
    cardTracksCta: "Bekijk app",
    cardCCTag: "Mijn droombedrijf",
    cardCCTitle: "Connect Cultures",
    cardCCDesc: "Nog geen bestaand bedrijf, maar mijn ultieme droom en ambitie om werkelijkheid te maken.",
    cardCCCta: "Bekijk visie",
    cardLSTag: "Evenementenconcept",
    cardLSTitle: "LØST SØULS",
    cardLSDesc: "Een underground rave-collectief in ontwikkeling, gericht op intieme locaties, rauwe clubcultuur en een podium voor opkomend talent.",
    cardLSCta: "Bekijk concept"
  },

  projects: {
    title: "Geselecteerde projecten",
    description: "Een overzicht van mijn gepubliceerde iOS-app, de visie achter mijn droombedrijf en een evenementenconcept in ontwikkeling. Selecteer een tabblad voor meer toelichting.",
    tabs: [
      {
        id: "tracks",
        subtitle: "Interactieve reisgids & speurtochten",
        description: "Maakt van traditionele stadswandelingen interactieve speurtochten. Navigeer langs bezienswaardigheden, los raadsels op en voltooi uitdagingen. De app is beschikbaar in meerdere talen.",
        tags: "App Store 5.0 ★, iOS Avontuur, Speurtochten",
        badge: "Live in App Store",
        buttonText: "Bekijk in App Store",
        rating: "5.0 ★ (4 beoordelingen)",
      },
      {
        id: "connectcultures",
        subtitle: "Mijn droombedrijf",
        description: "Connect Cultures is nu nog een droombedrijf en mijn grote ambitie: een internationaal platform dat reizigers verbindt met locals via gezamenlijke diners, echte gastvrijheid en ontmoetingen in huiskamers wereldwijd.",
        tags: "Mijn droombedrijf, Culturele uitwisseling, Gastvrijheid, Wereldwijde community",
        badge: "Mijn droombedrijf",
        buttonText: "Ontdek connectcultures.world",
        rating: "Visie & ambitie",
      },
      {
        id: "lostsouls",
        subtitle: "Underground rave-collectief",
        description: "Een underground rave-collectief in ontwikkeling. Een pure setting zonder VIP-gedoe: een plek om helemaal op te gaan in de muziek en een podium voor opkomend dj-talent.",
        tags: "145–160 BPM, Underground techno, In ontwikkeling",
        badge: "In ontwikkeling",
        buttonText: "Ontdek lostsouls-events.com",
        rating: "Nightlife-concept",
      },
    ]
  },

  experience: {
    title: "Mijn ervaring",
    description: "Praktijkervaring bij toonaangevende organisaties, zelfstandig gelanceerde producten en het begeleiden van studenten. Klik of blader door de tijdlijn hieronder.",
    downloadCvBtn: "Download CV",
    prevBtn: "Vorige",
    nextBtn: "Volgende",
    counterOf: "van",
    milestones: [
      {
        id: 'auas',
        role: 'Studentmentor',
        type: 'Academisch • Deeltijd',
        period: 'Sep 2026 – heden',
        location: 'Amsterdam, NL',
        headline: 'Begeleiding van toekomstige AI- & software-engineers',
        summary: 'Begeleiden van studenten bij de lesstof van Applied AI, inhoudelijke feedback geven op algoritmes en studenten coachen in softwareontwerp.',
        highlights: [
          'Feedback gegeven op codekwaliteit en AI-modellen van studenten',
          'Studenten gecoacht in softwareontwerp en wiskundige vraagstukken',
          'Studenten geholpen om zelfstandig problemen op te lossen en nette code te schrijven',
        ],
        caption: 'Hogeschool van Amsterdam',
      },
      {
        id: 'swap-club',
        role: 'Mobile Application Developer',
        type: 'Circulaire economie • Stage',
        period: 'Nov 2025 – Jan 2026',
        location: 'Amsterdam, NL (Hybride)',
        headline: 'Cross-platform React Native-app voor de circulaire economie',
        summary: 'De mobiele app voor The Swap Club gebouwd, met een stabiele architectuur en soepele ruilprocessen.',
        highlights: [
          'Complete productie-app gebouwd met React Native, Expo en TypeScript',
          'Supabase PostgreSQL-database en realtime datastromen opgezet',
          'Herbruikbare componenten en nette codestandaarden vanaf dag één gehanteerd',
        ],
        caption: 'The Swap Club',
      },
      {
        id: 'tracks-taps',
        role: 'Oprichter & Lead Developer',
        type: 'Eigen project • Solo build',
        period: 'Jun 2025 – heden',
        location: 'Wereldwijd in de App Store',
        headline: 'Zelfstandig ontwikkelde reisapp live in de App Store',
        summary: 'Ruim een jaar zelfstandig gebouwd aan Tracks & Taps: van de allereerste schetsen tot de release in de Apple App Store.',
        highlights: [
          'Cross-platform app gebouwd die ook offline snel en soepel blijft werken',
          'Interactieve speurtochten, routes langs de grachten en challenges geïntegreerd',
          'Het hele traject doorlopen: van TestFlight en App Store review tot betalingen via StoreKit',
        ],
        caption: 'Tracks & Taps',
      },
      {
        id: 'dept',
        role: 'Android Developer',
        type: 'Bureauproject • 5-koppig team',
        period: 'Mar 2025 – Jun 2025',
        location: 'Rotterdam, NL (Hybride)',
        headline: 'Native Kotlin-app met OpenAI en universele toegankelijkheid',
        summary: 'Een native Android-app ontwikkeld met AI-integratie, kaarten via Mapbox en volledige toegankelijkheid voor schermlezers (TalkBack).',
        highlights: [
          'Dynamische native UI gebouwd met Jetpack Compose, voorzien van TalkBack-ondersteuning, opties voor hoog contrast en schaalbare tekst',
          'OpenAI-chatbot-API en on-device computervisiemodellen geïntegreerd',
          'Realtime authenticatie en cloudsynchronisatie gerealiseerd via Firebase en de Mapbox SDK',
        ],
        caption: 'DEPT® Global Agency',
      },
      {
        id: 'tata-steel',
        role: 'Strategic HR Analytics & RPA Engineer',
        type: 'Enterprise Systems • 1 jr 10 mnd',
        period: 'Sep 2024 – Jun 2026',
        location: 'IJmuiden, NL (Hybride)',
        headline: 'Verbetering SAP SuccessFactors & automatisering met RPA',
        summary: 'Afstudeeronderzoek naar het verbeteren van talentprocessen binnen SAP SuccessFactors, plus de bouw van automatiseringen met documentherkenning.',
        highlights: [
          'Strategisch raamwerk ontworpen om subjectieve beoordelingen te vervangen door groeitracking in SAP SuccessFactors',
          'Orderinvoer geautomatiseerd met Document Understanding voor ongestructureerde data',
          'Verouderde prijslijsten geautomatiseerd en 90% van het handmatige werk weggenomen',
          'Automatisering voor TSP Non-Prime geleid en belangrijke servermigraties uitgevoerd',
        ],
        caption: 'Tata Steel',
      },
      {
        id: 'youngones',
        role: 'Zelfstandig ondernemer / Freelancer',
        type: 'Freelance werkzaamheden • 2 jr 2 mnd',
        period: 'Feb 2023 – Mar 2025',
        location: 'Noord-Holland, NL',
        headline: 'Zelfstandig werken & snel schakelen',
        summary: 'Uiteenlopende opdrachten uitgevoerd bij evenementen, retail en logistiek, inclusief zelfstandige planning, administratie en facturatie.',
        highlights: [
          'Snel kunnen schakelen in drukke omgevingen binnen evenementen, retail en logistiek',
          'Zelfstandig de planning, administratie en facturatie verzorgd',
          'Praktisch leren meedenken en direct problemen oplossen op de werkvloer',
        ],
        caption: 'YoungOnes Platform',
      },
    ]
  },

  creativity: {
    chapterBadge: "WAT IK BOUW",
    badge: "EXPERTISE",
    title: "Wat ik bouw",
    description: "Naast mijn eigen initiatieven help ik vooruitstrevende teams en organisaties met het ontwerpen en bouwen van hoogwaardige digitale producten.",
    categories: [
      { id: "all", label: "Alles" },
      { id: "web", label: "Webapplicaties" },
      { id: "mobile", label: "Mobiele apps" },
      { id: "ai", label: "AI & automatisering" }
    ],
    btnRequest: "Start een project",
    manifestoQuote: "Ik schrijf niet zomaar code: ik bouw producten van de grond af op en besteed aandacht aan ieder detail.",
    manifestoSub: "Of je nu een moderne website zoekt, een native app, een slimme AI-workflow, of wilt sparren over een samenwerking: laten we kennismaken.",
    btnDiscussCollab: "Laten we samenwerken",
    offerings: [
      {
        id: "web",
        category: "web",
        badge: "Webapplicaties",
        metric: "Snel & vloeiend",
        title: "Moderne websites & webapplicaties",
        desc: "Digitale ervaringen op maat, met verfijnde typografie, subtiele animaties en snelle laadtijden. Gebouwd met moderne webtechnologieën.",
        deliverables: [
          "Ontwerpen op maat met soepele animaties en interacties",
          "Modulaire componenten-architectuur en schone code",
          "Snelle laadtijden en goede vindbaarheid in Google (SEO)",
          "Volledige typeveiligheid met TypeScript"
        ],
        techStack: ["React", "TypeScript", "TailwindCSS", "Vite", "Framer Motion", "Next.js"]
      },
      {
        id: "mobile",
        category: "mobile",
        badge: "Mobiele apps",
        metric: "In de App Store",
        title: "Native mobiele applicaties",
        desc: "Soepele iOS- en Android-apps die logisch in elkaar zitten, ook offline goed werken en klaar zijn voor de App Store.",
        deliverables: [
          "Publicatie in de App Store & Google Play",
          "Offline dataopslag en cloudsynchronisatie",
          "Verfijnde animaties en haptische feedback",
          "Integratie van native sensoren en apparaatfuncties"
        ],
        techStack: ["React Native", "Expo", "Swift", "Supabase", "StoreKit", "Mapbox"]
      },
      {
        id: "ai",
        category: "ai",
        badge: "AI-systemen",
        metric: "Slimme automatisering",
        title: "AI & workflowautomatisering",
        desc: "Slimme datapijplijnen, AI-assistenten en beeldherkenningsmodellen die saai herhaalwerk wegnemen en processen een stuk sneller maken.",
        deliverables: [
          "Geautomatiseerde data- en contentpijplijnen",
          "Beeldherkennings- en computervisiemodellen",
          "Op maat ontwikkelde AI-workflows en assistenten",
          "Robuuste API-koppelingen en clouddiensten"
        ],
        techStack: ["Python", "PyTorch", "OpenAI / Claude API", "LangChain", "FastAPI", "Docker"]
      }
    ]
  },

  testimonials: {
    chapterBadge: "FEEDBACK",
    badge: "AANBEVELINGEN",
    verifiedReviewsPill: "GEVERIFIEERDE REVIEWS",
    title: "Aanbevelingen",
    description: "Ervaringen van opdrachtgevers en teamleiders bij The Swap Club, DEPT® en Tata Steel.",
    ratingValue: "3 Aanbevelingen",
    ratingSub: "Geverifieerd op LinkedIn",
    ratingVerifyLink: "Bekijk op LinkedIn",
    trustItem1: "Oplevering binnen de afgesproken deadline",
    trustItem2: "Echte betrokkenheid en direct eigenaarschap",
    trustItem3: "Pragmatische aanpak met technische diepgang",
    badgeSwap: "Mobiele app MVP",
    badgeDept: "AI-chatbot & beeldherkenning",
    badgeTata: "Workflowautomatisering",
    roleSwap: "iOS / Android App",
    roleDept: "AI-chatbot & computer vision",
    roleTata: "Geautomatiseerde pijplijn",
    fallbackTrustBadge: "Geverifieerd project",
    fallbackRole: "Engineering & oplevering",
    translationNotice: "Vertaald uit het Engels",
    items: [
      {
        id: "1",
        quote: "Joey pakte zelfstandig dingen op zonder dat hij veel sturing nodig had. De communicatie was helder en direct, deadlines werden altijd gehaald en hij bracht een rustige, oplossingsgerichte energie mee.",
        author: "Megan de Klein",
        role: "Medeoprichter",
        company: "The Swap Club",
      },
      {
        id: "2",
        quote: "Joey ging echt een stap verder in de opdracht door AI-functionaliteiten toe te voegen, zoals een chatbot en een eigen beeldherkenningsmodel. Hij dook met veel nieuwsgierigheid in de techniek.",
        author: "Ramon Nagelhout",
        role: "Product Owner",
        company: "DEPT®",
      },
      {
        id: "3",
        quote: "Enorm leergierig, pakt nieuwe concepten snel op en kiest altijd voor een praktische aanpak. Zijn werk met AI binnen onze processen was ontzettend waardevol.",
        author: "Sarah Lee Otto",
        role: "Team Lead",
        company: "Tata Steel",
      },
    ]
  },

  contact: {
    chapterBadge: "CONTACT",
    badge: "KENNISMAKEN",
    title: "Laten we samen bouwen.",
    titleItalic: "bouwen.",
    description: "Heb je een goed idee, zoek je een ontwikkelaar voor een app of AI-oplossing, of wil je sparren over een samenwerking? Stuur gerust een bericht of mail direct.",
    statusTitle: "Beschikbaar voor nieuwe projecten & samenwerkingen",
    statusSub: "Reactie binnen 24 uur",
    directEmailTitle: "Rechtstreeks e-mailen",
    directEmailValue: "Joeywognum@gmail.com",
    linkedinTitle: "LinkedIn",
    linkedinValue: "Joey van der Poel",
    githubTitle: "GitHub",
    githubValue: "github.com/JoeyPoel",
    quickMessageTitle: "Kort bericht",
    nameLabel: "Jouw naam",
    namePlaceholder: "Bijvoorbeeld Alex de Vries",
    emailLabel: "Jouw e-mailadres",
    emailPlaceholder: "alex@bedrijf.nl",
    messageLabel: "Jouw bericht",
    messagePlaceholder: "Vertel over jouw idee of project...",
    privacyNote: "Je naam, e-mailadres en bericht worden uitsluitend gebruikt om je aanvraag te beantwoorden. Er worden geen persoonsgegevens in databases opgeslagen of met derden gedeeld.",
    btnSubmit: "Verstuur bericht",
    btnSubmitting: "Bezig met verzenden...",
    copyBtn: "Kopiëren",
    btnCopy: "Kopieer e-mailadres",
    copiedFeedback: "Gekopieerd naar klembord",
    successTitle: "Bericht verzonden!",
    successDesc: "Bedankt voor je bericht! Ik heb het binnen en kom er zo snel mogelijk bij je op terug.",
    errorGeneric: "Het versturen is helaas niet gelukt. Neem gerust rechtstreeks contact op via Joeywognum@gmail.com.",
    resetBtn: "Nog een bericht versturen",
  },

  wayfinder: {
    ariaLabel: "Navigatie portfolioreis",
    steps: [
      { id: "tracks", num: "01", label: "Tracks & Taps", href: "#tracks" },
      { id: "connectcultures", num: "02", label: "Connect Cultures", href: "#connectcultures" },
      { id: "lostsouls", num: "03", label: "LØST SØULS", href: "#lostsouls" },
      { id: "creative-offerings", num: "04", label: "Expertise", href: "#creative-offerings" },
      { id: "contact", num: "05", label: "Contact", href: "#contact" }
    ]
  },

  footer: {
    tagline: "Mobile Developer & AI Engineer",
    allRightsReserved: "Alle rechten voorbehouden.",
    links: [
      { name: "CV", href: "/Resume_Joey_van_der_Poel.pdf" },
      { name: "Connect Cultures", href: "https://www.connectcultures.world/" },
      { name: "LØST SØULS", href: "https://lostsouls-events.com/" },
      { name: "Tracks & Taps", href: "https://apps.apple.com/nl/app/tracks-taps-your-tour-guide/id6756650785?l=en-GB" },
      { name: "LinkedIn", href: "https://www.linkedin.com/in/joey-van-der-poel-974203302/" },
      { name: "GitHub", href: "https://github.com/JoeyPoel" }
    ]
  },

  links: {
    cv: "/Resume_Joey_van_der_Poel.pdf",
    linkedin: "https://www.linkedin.com/in/joey-van-der-poel-974203302/",
    appStore: "https://apps.apple.com/nl/app/tracks-taps-your-tour-guide/id6756650785?l=en-GB",
    github: "https://github.com/JoeyPoel",
    recommendations: "https://www.linkedin.com/in/joey-van-der-poel-974203302/details/recommendations/?detailScreenTabIndex=0",
    connectCultures: "https://www.connectcultures.world/",
    lostSouls: "https://lostsouls-events.com/"
  }
} satisfies PortfolioStrings
