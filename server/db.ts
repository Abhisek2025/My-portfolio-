import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { Project, Discussion, ChartNode, AnalyticsData, DiscussionReply } from '../src/types';

const DB_DIR = path.join(process.cwd(), 'server-data');
const DB_FILE = path.join(DB_DIR, 'db.json');

export interface DbSchema {
  projects: Project[];
  discussions: Discussion[];
  analytics: AnalyticsData;
  adminPasswordHash: string; // Plain string password for simplicity in this dev workspace environment: "password123"
}

// -------------------------------------------------------------
// Mongoose Schema Definitions
// -------------------------------------------------------------

const ProjectSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: String,
  tags: [String],
  image: String,
  link: String,
  github: String,
  category: { type: String, required: true },
  featured: { type: Boolean, default: false },
  metrics: String
});

const ReplySchema = new mongoose.Schema({
  id: String,
  sender: String,
  message: String,
  timestamp: String
});

const DiscussionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: true },
  budget: String,
  projectType: String,
  message: { type: String, required: true },
  status: { type: String, default: 'new' },
  replies: [ReplySchema],
  createdAt: { type: String, required: true }
});

const ChartVisitSchema = new mongoose.Schema({
  date: String,
  visits: { type: Number, default: 0 },
  inquiries: { type: Number, default: 0 }
});

const AnalyticsSchema = new mongoose.Schema({
  id: { type: String, default: 'main_analytics', unique: true },
  totalVisits: { type: Number, default: 0 },
  visits: [ChartVisitSchema],
  projectViews: { type: Map, of: Number, default: () => new Map() }
});

// Resilient Models Lookup (safely handles dual-compilation contexts)
const ProjectModel = (mongoose.models.Project || mongoose.model('Project', ProjectSchema)) as any;
const DiscussionModel = (mongoose.models.Discussion || mongoose.model('Discussion', DiscussionSchema)) as any;
const AnalyticsModel = (mongoose.models.Analytics || mongoose.model('Analytics', AnalyticsSchema)) as any;

// Connection Status Monitor
let isConnected = false;

export async function connectMongo(): Promise<boolean> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return false; // Dynamic fallback to local file store
  }
  if (isConnected) {
    return true;
  }
  try {
    // Graceful connectivity settings
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log('[Database] Connected successfully to MongoDB Atlas database!');
    
    // Auto-seed if database is empty to preserve visual integrity
    await seedMongoIfEmpty();
    
    return true;
  } catch (err) {
    console.error('[Database] MongoDB connection failed. Falling back to local db.json storage:', err);
    return false;
  }
}

async function seedMongoIfEmpty() {
  try {
    const projCount = await ProjectModel.countDocuments();
    if (projCount === 0) {
      const localData = getLocalDb();
      console.log('[Database] Seeding default projects into newly configured MongoDB...');
      for (const p of localData.projects) {
        await new ProjectModel(p).save();
      }
    }

    const discCount = await DiscussionModel.countDocuments();
    if (discCount === 0) {
      const localData = getLocalDb();
      console.log('[Database] Seeding default discussion channels into newly configured MongoDB...');
      for (const d of localData.discussions) {
        await new DiscussionModel(d).save();
      }
    }

    const analyticCount = await AnalyticsModel.countDocuments();
    if (analyticCount === 0) {
      const localData = getLocalDb();
      console.log('[Database] Seeding analytics data log into newly configured MongoDB...');
      
      const mongoViews = new Map<string, number>();
      if (localData.analytics.projectViews) {
        Object.entries(localData.analytics.projectViews).forEach(([k, v]) => {
          mongoViews.set(k, v);
        });
      }

      await new AnalyticsModel({
        id: 'main_analytics',
        totalVisits: localData.analytics.totalVisits,
        visits: localData.analytics.visits,
        projectViews: mongoViews
      }).save();
    }
  } catch (err) {
    console.error('[Database] Failed to register seeded elements in MongoDB:', err);
  }
}

// -------------------------------------------------------------
// Seed Generator Helper for Local File Store
// -------------------------------------------------------------

function generateSeedVisits(): ChartNode[] {
  const list: ChartNode[] = [];
  const days = 7;
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toLocaleDateString([], { month: 'short', day: 'numeric' });
    list.push({
      date: dateStr,
      visits: Math.floor(Math.random() * 45) + 20,
      inquiries: Math.floor(Math.random() * 3)
    });
  }
  return list;
}

const DEFAULT_PROJECTS: Project[] = [
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
  }
];

const DEFAULT_DISCUSSIONS: Discussion[] = [
  {
    id: 'disc_1',
    clientName: 'Alice Henderson',
    clientEmail: 'alice@innovate.co',
    budget: '$5,000 - $10,000',
    projectType: 'ai',
    message: 'We are looking to implement a smart custom recommendation pipeline parsing consumer product tags. Needs to load seamlessly in React with rapid throughput.',
    status: 'in-progress',
    createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    replies: [
      {
        id: 'rep_1',
        sender: 'admin',
        message: 'Hello Alice, that sounds like a fantastic venture! I can map out some Gemini AI embeddings or localized fine-tuning options for optimal latency metrics. Let us discuss the specific dataset size.',
        timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
      }
    ]
  },
  {
    id: 'disc_2',
    clientName: 'Richard Gable',
    clientEmail: 'richard@hyperion.io',
    budget: '$10,000+',
    projectType: 'web',
    message: 'Need a fast SaaS corporate portal from scratch with high-contrast elegant layouts, dark slate theme, and smooth transition views. Absolute performance is critical.',
    status: 'new',
    createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    replies: []
  }
];

// -------------------------------------------------------------
// Synchronous Fallback Core (db.json file handlers)
// -------------------------------------------------------------

export function getLocalDb(): DbSchema {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const freshDb: DbSchema = {
      projects: DEFAULT_PROJECTS,
      discussions: DEFAULT_DISCUSSIONS,
      analytics: {
        visits: generateSeedVisits(),
        totalVisits: 382,
        projectViews: { '1': 112, '2': 89 }
      },
      adminPasswordHash: 'password123'
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(freshDb, null, 2), 'utf-8');
    return freshDb;
  }

  try {
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(content) as DbSchema;
  } catch (err) {
    console.error('Error parsing databases content, rebuilding fallback:', err);
    const freshDb: DbSchema = {
      projects: DEFAULT_PROJECTS,
      discussions: DEFAULT_DISCUSSIONS,
      analytics: {
        visits: generateSeedVisits(),
        totalVisits: 382,
        projectViews: {}
      },
      adminPasswordHash: 'password123'
    };
    return freshDb;
  }
}

export function saveLocalDb(data: DbSchema): void {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Match legacy names for complete safety coverage
export function getDb(): DbSchema {
  return getLocalDb();
}

export function saveDb(data: DbSchema): void {
  saveLocalDb(data);
}

// -------------------------------------------------------------
// High-Level Async Interface Layer (Supports both DB modes)
// -------------------------------------------------------------

export async function getAdminPasswordHash(): Promise<string> {
  const envPass = process.env.ADMIN_PASSWORD;
  if (envPass) return envPass;
  return getLocalDb().adminPasswordHash;
}

export async function getProjects(): Promise<Project[]> {
  try {
    if (await connectMongo()) {
      const projects = await ProjectModel.find({}).lean();
      return projects.map((p: any) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        longDescription: p.longDescription || '',
        tags: Array.isArray(p.tags) ? p.tags : [],
        image: p.image || '',
        link: p.link || '',
        github: p.github || '',
        category: p.category || 'web',
        featured: !!p.featured,
        metrics: p.metrics || ''
      }));
    }
  } catch (err) {
    console.error('[Database] MongoDB getProjects error, falling back:', err);
  }
  return getLocalDb().projects;
}

export async function addProject(proj: Project): Promise<Project> {
  try {
    if (await connectMongo()) {
      await new ProjectModel(proj).save();
      return proj;
    }
  } catch (err) {
    console.error('[Database] MongoDB addProject error, falling back:', err);
  }
  const db = getLocalDb();
  db.projects.push(proj);
  saveLocalDb(db);
  return proj;
}

export async function editProject(id: string, updated: Partial<Project>): Promise<Project | null> {
  try {
    if (await connectMongo()) {
      const doc = await ProjectModel.findOneAndUpdate({ id }, { $set: updated }, { new: true }).lean();
      if (doc) {
        return doc as unknown as Project;
      }
    }
  } catch (err) {
    console.error('[Database] MongoDB editProject error, falling back:', err);
  }
  const db = getLocalDb();
  const idx = db.projects.findIndex((p) => p.id === id);
  if (idx !== -1) {
    db.projects[idx] = { ...db.projects[idx], ...updated } as Project;
    saveLocalDb(db);
    return db.projects[idx];
  }
  return null;
}

export async function deleteProject(id: string): Promise<boolean> {
  try {
    if (await connectMongo()) {
      const res = await ProjectModel.deleteOne({ id });
      return res.deletedCount > 0;
    }
  } catch (err) {
    console.error('[Database] MongoDB deleteProject error, falling back:', err);
  }
  const db = getLocalDb();
  const len = db.projects.length;
  db.projects = db.projects.filter((p) => p.id !== id);
  if (db.projects.length !== len) {
    saveLocalDb(db);
    return true;
  }
  return false;
}

export async function getDiscussions(): Promise<Discussion[]> {
  try {
    if (await connectMongo()) {
      const items = await DiscussionModel.find({}).lean();
      return items.map((d: any) => ({
        id: d.id,
        clientName: d.clientName,
        clientEmail: d.clientEmail,
        budget: d.budget || '',
        projectType: d.projectType || 'web',
        message: d.message || '',
        status: d.status || 'new',
        replies: Array.isArray(d.replies) ? d.replies.map((r: any) => ({
          id: r.id,
          sender: r.sender,
          message: r.message,
          timestamp: r.timestamp
        })) : [],
        createdAt: d.createdAt
      }));
    }
  } catch (err) {
    console.error('[Database] MongoDB getDiscussions error, falling back:', err);
  }
  return getLocalDb().discussions;
}

export async function addDiscussion(disc: Discussion): Promise<Discussion> {
  try {
    if (await connectMongo()) {
      await new DiscussionModel(disc).save();
      return disc;
    }
  } catch (err) {
    console.error('[Database] MongoDB addDiscussion error, falling back:', err);
  }
  const db = getLocalDb();
  db.discussions.push(disc);
  saveLocalDb(db);
  return disc;
}

export async function updateDiscussion(
  id: string, 
  status?: string, 
  newReply?: DiscussionReply
): Promise<Discussion | null> {
  try {
    if (await connectMongo()) {
      const query: any = {};
      if (status) query.status = status;
      const updateObj: any = { $set: query };
      if (newReply) {
        updateObj.$push = { replies: newReply };
      }
      const updated = await DiscussionModel.findOneAndUpdate(
        { id }, 
        updateObj, 
        { new: true }
      ).lean();
      if (updated) return updated as unknown as Discussion;
    }
  } catch (err) {
    console.error('[Database] MongoDB updateDiscussion error, falling back:', err);
  }
  
  const db = getLocalDb();
  const idx = db.discussions.findIndex(d => d.id === id);
  if (idx !== -1) {
    if (status) {
      db.discussions[idx].status = status as any;
    }
    if (newReply) {
      db.discussions[idx].replies.push(newReply);
    }
    saveLocalDb(db);
    return db.discussions[idx];
  }
  return null;
}

export async function trackAnalyticsView(projectId?: string): Promise<void> {
  try {
    if (await connectMongo()) {
      const doc = await AnalyticsModel.findOne({ id: 'main_analytics' });
      if (doc) {
        doc.totalVisits += 1;
        if (projectId) {
          const count = doc.projectViews.get(projectId) || 0;
          doc.projectViews.set(projectId, count + 1);
        }
        
        const dateStr = new Date().toLocaleDateString([], { month: 'short', day: 'numeric' });
        const existing = doc.visits.find((v: any) => v.date === dateStr);
        if (existing) {
          existing.visits += 1;
        } else {
          doc.visits.push({ date: dateStr, visits: 1, inquiries: 0 });
          if (doc.visits.length > 14) doc.visits.shift();
        }
        await doc.save();
        return;
      }
    }
  } catch (err) {
    console.error('[Database] MongoDB telemetry view tracking error, falling back:', err);
  }

  const db = getLocalDb();
  db.analytics.totalVisits += 1;
  if (projectId) {
    db.analytics.projectViews[projectId] = (db.analytics.projectViews[projectId] || 0) + 1;
  }
  const dateStr = new Date().toLocaleDateString([], { month: 'short', day: 'numeric' });
  const existing = db.analytics.visits.find((v) => v.date === dateStr);
  if (existing) {
    existing.visits += 1;
  } else {
    db.analytics.visits.push({ date: dateStr, visits: 1, inquiries: 0 });
    if (db.analytics.visits.length > 14) db.analytics.visits.shift();
  }
  saveLocalDb(db);
}

export async function trackAnalyticsInquiry(): Promise<void> {
  try {
    if (await connectMongo()) {
      const doc = await AnalyticsModel.findOne({ id: 'main_analytics' });
      if (doc) {
        const dateStr = new Date().toLocaleDateString([], { month: 'short', day: 'numeric' });
        const existing = doc.visits.find((v: any) => v.date === dateStr);
        if (existing) {
          existing.inquiries += 1;
        } else {
          doc.visits.push({ date: dateStr, visits: 0, inquiries: 1 });
          if (doc.visits.length > 14) doc.visits.shift();
        }
        await doc.save();
        return;
      }
    }
  } catch (err) {
    console.error('[Database] MongoDB telemetry inquiry tracking error, falling back:', err);
  }

  const db = getLocalDb();
  const dateStr = new Date().toLocaleDateString([], { month: 'short', day: 'numeric' });
  const existing = db.analytics.visits.find((v) => v.date === dateStr);
  if (existing) {
    existing.inquiries += 1;
  } else {
    db.analytics.visits.push({ date: dateStr, visits: 0, inquiries: 1 });
    if (db.analytics.visits.length > 14) db.analytics.visits.shift();
  }
  saveLocalDb(db);
}

export async function getAnalyticsData(): Promise<AnalyticsData> {
  try {
    if (await connectMongo()) {
      const doc = await AnalyticsModel.findOne({ id: 'main_analytics' }).lean();
      if (doc) {
        const viewsMap: Record<string, number> = {};
        if (doc.projectViews) {
          const map = doc.projectViews as any;
          if (map instanceof Map) {
            map.forEach((val, key) => {
              viewsMap[key] = val;
            });
          } else {
            Object.entries(map).forEach(([key, val]) => {
              viewsMap[key] = val as number;
            });
          }
        }
        return {
          totalVisits: doc.totalVisits || 0,
          visits: (doc.visits || []).map((v: any) => ({
            date: v.date,
            visits: v.visits,
            inquiries: v.inquiries
          })),
          projectViews: viewsMap
        };
      }
    }
  } catch (err) {
    console.error('[Database] MongoDB getAnalyticsData error, falling back:', err);
  }
  return getLocalDb().analytics;
}
