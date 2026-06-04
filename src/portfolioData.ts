import { Project, Experience, SkillCategory, Testimonial } from './types';

export const PERSONAL_INFO = {
  name: 'Abhisek Koyal',
  title: 'Full-Stack Engineer & Interactive UI Architect',
  subtitle: 'Building flawless digital products combining rigorous backends with state-of-the-art frontends.',
  tagline: 'Designing immersive web experiences that load fast, look brilliant, and scale elegantly.',
  shortBio: 'I am a passionate software engineer specializing in building high-performance web applications. Focused on UI details, elegant animations, robust API design, and creating delightful user journeys from concept to production deployment.',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=260&h=260', // Elegant professional placeholder portraits
  location: 'Kolkata, India / Available Worldwide',
  email: 'abhisekkoyal334@gmail.com',
  socials: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    resume: '#',
  },
  metrics: [
    { label: 'Years Experience', value: '5+' },
    { label: 'Completed Projects', value: '40+' },
    { label: 'Satisfied Clients', value: '100%' },
    { label: 'Performance Metric', value: '99' }, // PageSpeed rating
  ]
};

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Nova AI Design Studio',
    description: 'An interactive, collaborative canvas engine with integrated Generative AI tools and instant vector exports.',
    longDescription: 'Nova AI is a real-time multiplayer vector editor designed for modern designers. Combining canvas performance with advanced server-side Gemini API generation, users can create layered illustrations, iterate drafts, and export designs instantly.',
    tags: ['React', 'TypeScript', 'Node.js', 'Canvas API', 'Gemini API', 'Tailwind CSS'],
    image: 'https://picsum.photos/seed/nova-studio/800/600',
    link: 'https://github.com',
    github: 'https://github.com',
    category: 'ai',
    featured: true,
    metrics: '+45% creation speed'
  },
  {
    id: '2',
    title: 'Aether Telemetry Dashboard',
    description: 'High-throughput visual analytics and system monitoring dashboard with interactive charts and low-latency rendering.',
    longDescription: 'Aether aggregates distributed server logs and active processes, outputting clean, interactive visualization nodes. Features dense custom charts, customizable grid layouts, and lazy-loaded WebGL layouts for heavy datasets.',
    tags: ['React', 'D3.js', 'Vite', 'Express', 'Tailwind CSS', 'WebSockets'],
    image: 'https://picsum.photos/seed/telemetry/800/600',
    link: 'https://github.com',
    github: 'https://github.com',
    category: 'web',
    featured: true,
    metrics: '< 15ms render loop'
  },
  {
    id: '3',
    title: 'Helix Mobile Commerce',
    description: 'An elegant, fluid web e-commerce framework specialized for mobile devices with high-fidelity swipe gestures.',
    longDescription: 'Helix is a React Native-inspired mobile web experience that redefines shopping on smaller displays. Crafted with pure native gesture bounds, cached product states, and a highly customizable design layout.',
    tags: ['React', 'Motion', 'Tailwind CSS', 'Redux Toolkit', 'Stripe API'],
    image: 'https://picsum.photos/seed/helix-mobile/800/600',
    link: 'https://github.com',
    github: 'https://github.com',
    category: 'mobile',
    featured: false,
    metrics: '98% Checkout Retention'
  },
  {
    id: '4',
    title: 'Scribe Smart Note System',
    description: 'A cloud-native rich text editor feature-packed with semantic categorizations and contextual summary tools.',
    longDescription: 'Scribe parses handwritten, voice, or typed documents to dynamically map ideas into mind-map nodes. Uses smart vector embeddings to group concepts and suggest references securely.',
    tags: ['TypeScript', 'Fastify', 'PostgreSQL', 'Tiptap Editor', 'S3 Storage'],
    image: 'https://picsum.photos/seed/scribenotes/800/600',
    link: 'https://github.com',
    github: 'https://github.com',
    category: 'ai',
    featured: false,
    metrics: '12k Monthly Active Users'
  },
];

export const SKILLS: SkillCategory[] = [
  {
    title: 'Frontend Engineering',
    description: 'Crafting expressive, responsive, and pixel-perfect modular user interfaces.',
    skills: [
      { name: 'React / Next.js', level: 95, iconName: 'Layers' },
      { name: 'TypeScript', level: 90, iconName: 'ShieldCheck' },
      { name: 'Tailwind CSS', level: 98, iconName: 'Sparkles' },
      { name: 'Motion / Framer', level: 85, iconName: 'Wind' },
      { name: 'HTML5 / CSS / modern JS', level: 98, iconName: 'FileCode' },
    ]
  },
  {
    title: 'Backend & Databases',
    description: 'Building secure, high-throughput, and scalable distributed system architectures.',
    skills: [
      { name: 'Node.js / Express', level: 88, iconName: 'Server' },
      { name: 'GraphQL / REST APIs', level: 92, iconName: 'Cpu' },
      { name: 'PostgreSQL / MongoDB', level: 85, iconName: 'Database' },
      { name: 'Redis Caching', level: 80, iconName: 'Zap' },
      { name: 'Docker / Kubernetes', level: 75, iconName: 'Ship' },
    ]
  },
  {
    title: 'AI & Cloud Infrastructure',
    description: 'Integrating machine learning workflows and deploying cloud-native web services.',
    skills: [
      { name: 'Google Cloud Platform (GCP)', level: 82, iconName: 'Cloud' },
      { name: 'Firebase Systems', level: 90, iconName: 'Flame' },
      { name: 'Gemini API & LLM Orchestration', level: 88, iconName: 'Sparkles' },
      { name: 'CI/CD Pipelines (Github Actions)', level: 85, iconName: 'GitBranch' },
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp1',
    period: '2024 - Present',
    role: 'Senior UI Engineer & Full-Stack Architect',
    company: 'Saga Interactive',
    location: 'Remote',
    description: 'Leading UX engineering for SaaS products, engineering robust systems with rich micro-frontends.',
    achievements: [
      'Architected a highly responsive vector editing interface that increased user session length by 40%.',
      'Configured custom bundlers reducing core JS payload size by 35%, boosting Lighthouse scores above 95.',
      'Mentored four junior and mid-level developers, enforcing modern clean architecture and strict TypeScript typings.'
    ],
    skills: ['React', 'TypeScript', 'Tailwind', 'Node.js', 'Google Cloud']
  },
  {
    id: 'exp2',
    period: '2022 - 2024',
    role: 'Full-Stack Developer',
    company: 'Zenith Tech Labs',
    location: 'Hybrid',
    description: 'Re-engineered high-throughput REST and GraphQL backend services and revamped the product core web app client.',
    achievements: [
      'Designed and deployed an automated file conversion microservice, scaling seamlessly up to 10k parallel requests.',
      'Integrated Stripe Checkout and billing loops, supporting dynamic tax structures and securing a custom enterprise pipeline.',
      'Migrated three traditional legacy applications into unified, responsive Tailwind components.'
    ],
    skills: ['Node.js', 'React', 'MongoDB', 'Redis', 'Docker', 'Stripe']
  },
  {
    id: 'exp3',
    period: '2021 - 2022',
    role: 'Frontend Engineer',
    company: 'Apex Code Ventures',
    location: 'Kolkata, IN',
    description: 'Developed mobile-first, high-performance UI systems, pixel-perfecting visual mockups with high interactivity.',
    achievements: [
      'Delivered 15+ completely responsive client websites operating with rapid loading times.',
      'Transitioned the engineering workflow from plain CSS to customized scalable Tailwind utility layouts.',
      'Collaborated closely with designers on precise Figma-to-code conversions.'
    ],
    skills: ['Vanilla JS', 'Sass', 'Webpack', 'CSS Grid', 'SEO Best Practices']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    role: 'Product Director',
    company: 'Saga Interactive',
    quote: "Abhisek's attention to detail is remarkable. He does not just code static wireframes; he brings layouts to life with fluid animations and bulletproof responsive logic. He is a rare designer-engineer combo.",
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120'
  },
  {
    id: 't2',
    name: 'Marcus Chen',
    role: 'Engineering Lead',
    company: 'Zenith Tech Labs',
    quote: 'An outstanding developer who consistently ensures backend routes are optimized, and TypeScript types are fully sound. He single-handedly modernised our core dashboard under pressure. Highly recommended!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120'
  },
];
