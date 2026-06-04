import { Project, Experience, SkillCategory, Testimonial } from './types';

export const PERSONAL_INFO = {
  name: 'Abhisek Koyal',
  title: 'Full-Stack Engineer & Interactive UI Architect',
  subtitle: 'Building flawless digital products combining rigorous backends with state-of-the-art frontends.',
  tagline: 'Designing immersive web experiences that load fast, look brilliant, and scale elegantly.',
  shortBio: 'I am a passionate software engineer specializing in building high-performance web applications. Focused on UI details, elegant animations, robust API design, and creating delightful user journeys from concept to production deployment.',
  avatarUrl: 'https://photos.app.goo.gl/6V1jsEbTqv7xCAZRA?auto=format&fit=crop&q=80&w=260&h=260', // Elegant professional placeholder portraits
  location: 'Hyderabad, India / Available Worldwide',
  email: 'abhisekkoyal334@gmail.com',
  socials: {
    github: 'github.com/Abhisek2025',
    linkedin: 'inkedin.com/in/abhisek-koyal-0528a3288',
    twitter: 'https://twitter.com',
    resume: 'https://github.com/Abhisek2025/My-CV.git',
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
    title: 'Blood Bank Management System',
    description:
      'A full-stack blood bank management platform for managing donors, hospitals, organizations, and blood inventory.',

    longDescription:
      'Blood Bank Management System (BBMS) is a MERN Stack application designed to streamline blood donation and inventory management. It includes secure authentication, role-based dashboards, donor and hospital management, blood stock tracking, and analytics for efficient healthcare coordination.',

    tags: [
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'JWT',
      'Bootstrap'
    ],

    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT89eiWkDp4lwS-a0EBdCb4epxR4E_5l8F40A&s',

    link: 'https://bbms-client.onrender.com/',

    github: 'https://github.com/Abhisek2025',

    category: 'web',

    featured: true,

    metrics: 'Role-Based Dashboard'
  },

  {
    id: '2',
    title: 'MyBookHub',

    description:
      'A modern book management and discovery platform for readers and book enthusiasts.',

    longDescription:
      'MyBookHub is a full-stack web application that enables users to browse, organize, and manage books through a clean and responsive interface. The platform focuses on user-friendly design, efficient book categorization, and seamless navigation while showcasing modern MERN Stack development practices.',

    tags: [
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Tailwind CSS'
    ],

    image: 'https://yi-files.yellowimages.com/products/1007000/1007769/1689458-full.jpg',

    link: 'https://mybookhub-13zh.onrender.com/',

    github: 'https://github.com/Abhisek2025',

    category: 'web',

    featured: true,

    metrics: 'Responsive Design'
  }
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
    location: 'Hyderabad, IN',
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
