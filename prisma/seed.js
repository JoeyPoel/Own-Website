import 'dotenv/config'
import postgres from '@prisma/orm-postgres/runtime'
import contractJson from './schema.json' with { type: 'json' }

const prisma = postgres({
  contractJson,
  url: process.env.DATABASE_URL,
})

async function main() {
  console.log('Starting database seeding to Supabase...')
  await prisma.connect()

  // 1. Clean existing records (optional, avoids duplicates on re-run)
  await prisma.orm.public.Profile.deleteAll()
  await prisma.orm.public.Service.deleteAll()
  await prisma.orm.public.Project.deleteAll()
  await prisma.orm.public.Testimonial.deleteAll()

  // 2. Seed Profile
  const profile = await prisma.orm.public.Profile.create({
    name: 'Joey van der Poel',
    role: 'Full-Stack Mobile App Developer & AI Automation Engineer',
    location: 'Medemblik / Amsterdam, Netherlands',
    availability: 'Available for freelance contracts & small business builds',
  })
  console.log('Seeded Profile:', profile.name)

  // 3. Seed Services
  const services = [
    {
      title: 'End-to-End Mobile App MVP',
      description: 'I design and code performant iOS and Android apps using React Native. From structural state logic to App Store and Google Play publication.',
      timeframe: '4–6 Weeks Delivery',
    },
    {
      title: 'Business Process & Document Automation',
      description: 'I connect your documents, spreadsheets, and mainframe tools with custom AI extraction pipelines, eliminating hours of manual typing.',
      timeframe: '3–4 Weeks Delivery',
    },
    {
      title: 'AI Feature Integration',
      description: 'Add intelligence to existing software. I integrate large language models, custom image classification APIs, and conversational assistance.',
      timeframe: '2–3 Weeks Delivery',
    },
  ]

  for (const s of services) {
    await prisma.orm.public.Service.create(s)
  }
  console.log(`Seeded ${services.length} Services.`)

  // 4. Seed Projects
  const projects = [
    {
      title: 'Tracks & Taps (iOS App)',
      category: 'mobile',
      tagline: 'Gamified travel & city exploration mobile SaaS published to the Apple App Store.',
      stack: ['React Native', 'Expo', 'TypeScript', 'Supabase'],
      highlights: [
        'Live interactive quest system & navigation logic',
        'Pub Golf group exploration mode',
        'Dynamic typography & text scaling accessibility features',
        'Robust offline-first synchronization engine',
      ],
      linkLabel: 'iOS App Store Link',
      linkUrl: 'https://apps.apple.com/nl/app/tracks-taps-gamified-guide/id6756650785?l=en-GB',
      image: '/projects/swift_runner_app.jpg',
      status: 'App Store Published',
    },
    {
      title: 'Mainframe Pricelist RPA (Tata Steel)',
      category: 'automation',
      tagline: 'Autonomous RPA pipeline typing supplier price grids directly into legacy mainframe screens.',
      stack: ['Python', 'UiPath', 'RPA', 'Mainframe', 'Automation'],
      highlights: [
        'Replaced a manual entry process that previously required 2 full-time employees typing for 2 weeks straight',
        'Engineered a highly resilient, exception-resistant robot optimized to run autonomously overnight',
        'Handled dozens of legacy screen transition states and validation errors with zero mismatches',
        'Automated price catalog synchronization directly into heritage mainframe databases',
      ],
      image: '/projects/neural_net_dashboard.jpg',
      status: 'Enterprise Shipped',
    },
    {
      title: 'Intelligent Document & RPA Pipeline (Tata Steel)',
      category: 'automation',
      tagline: 'Enterprise document extraction and order entry automation system.',
      stack: ['Python', 'UiPath Document Understanding', 'Data Pipelines'],
      highlights: [
        'Replaced manual pricing and mainframe data entry logs',
        'Substantially reduced line-item mismatches',
        'Cut manual processing overhead by 90% across the department',
      ],
      image: '/projects/neural_net_dashboard.jpg',
      status: 'Enterprise Shipped',
    },
    {
      title: 'AI Zoo Guide Chatbot (DEPT®)',
      category: 'mobile',
      tagline: 'Chatbot and animal recognition app to help zoo visitors (conceptual, not official Artis app).',
      stack: ['Kotlin', 'Python', 'OpenAI API', 'RAG', 'CNN'],
      highlights: [
        'Trained custom Python CNN model for on-device animal species recognition',
        'Integrated ChatGPT chatbot using Retrieval-Augmented Generation (RAG) and prompt engineering',
        'Built native Android Kotlin interface to assist visitors with conceptual zoo maps',
      ],
      image: 'https://gosxavjlqavyosqihpvh.supabase.co/storage/v1/object/public/images/DeptChatbot.png',
      status: 'AI MVP Delivered',
    },
    {
      title: 'SwapClub Marketplace App',
      category: 'mobile',
      tagline: 'Cross-platform circular economy marketplace app built with strict type safety.',
      stack: ['React Native', 'Expo', 'TypeScript'],
      highlights: [
        'Modular layered codebase decoupling business logic from UI elements',
        'Dynamic multi-tag catalog filtering pipelines',
        'Optimized image uploading and compression assets',
      ],
      image: '/projects/swift_runner_app.jpg',
      status: 'Marketplace MVP',
    },
  ]

  for (const p of projects) {
    await prisma.orm.public.Project.create(p)
  }
  console.log(`Seeded ${projects.length} Projects.`)

  // 5. Seed Testimonials
  const testimonials = [
    {
      quote: 'Joey took real ownership without needing much direction. Communication was clear and practical, deadlines were consistently met, and he brought a steady, solution-focused energy.',
      author: 'Megan de Klein',
      role: 'Co-Founder',
      company: 'The Swap Club',
    },
    {
      quote: 'Joey pushed the boundaries of the assignment by integrating AI features such as a chatbot and a custom image recognition model. He approached the stack with curiosity and depth.',
      author: 'Ramon Nagelhout',
      role: 'Product Owner',
      company: 'DEPT®',
    },
    {
      quote: 'Highly eager to learn, quickly grasps new concepts and consistently takes a solution-oriented approach. His application of AI within our workflows proved particularly valuable.',
      author: 'Sarah Otto',
      role: 'Team Lead',
      company: 'Tata Steel',
    },
  ]

  for (const t of testimonials) {
    await prisma.orm.public.Testimonial.create(t)
  }
  console.log(`Seeded ${testimonials.length} Testimonials.`)

  console.log('Database seeding finished successfully.')
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e)
    process.exit(1)
  })
