export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  image: string;
  link?: string;
  github?: string;
  category: 'web' | 'mobile' | 'ai' | 'design';
  featured: boolean;
  metrics?: string; // e.g., "30% performance boost" or "15k+ active users"
}

export interface Experience {
  id: string;
  period: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  description: string;
  achievements: string[];
  skills: string[];
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  iconName: string; // Dynamic icon rendering lookup name
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

export interface DiscussionReply {
  id: string;
  sender: 'admin' | 'client';
  message: string;
  timestamp: string;
}

export interface Discussion {
  id: string;
  clientName: string;
  clientEmail: string;
  budget: string;
  projectType: string;
  message: string;
  status: 'new' | 'in-progress' | 'completed';
  replies: DiscussionReply[];
  createdAt: string;
}

export interface ChartNode {
  date: string;
  visits: number;
  inquiries: number;
}

export interface AnalyticsData {
  visits: ChartNode[];
  totalVisits: number;
  projectViews: Record<string, number>;
}
