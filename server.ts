import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { 
  connectMongo, 
  getAdminPasswordHash, 
  getProjects, 
  addProject, 
  editProject, 
  deleteProject, 
  getDiscussions, 
  addDiscussion, 
  updateDiscussion, 
  trackAnalyticsView, 
  trackAnalyticsInquiry, 
  getAnalyticsData 
} from './server/db';
import { Project, Discussion, DiscussionReply } from './src/types';

const app = express();
const PORT = 3000;
const ADMIN_TOKEN = 'mock-admin-token-secret-xyz';

// Built-in JSON body-parser
app.use(express.json());

// Helper logic: Check admin header credentials
function isAdminAuth(req: express.Request): boolean {
  const authHeader = req.headers.authorization;
  if (!authHeader) return false;
  const token = authHeader.replace('Bearer ', '').trim();
  return token === ADMIN_TOKEN;
}

// -------------------------------------------------------------
// Core API Endpoints
// -------------------------------------------------------------

// Post: Admin Login Auth
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  const hash = await getAdminPasswordHash();

  if (username === 'admin' && password === hash) {
    return res.json({ success: true, token: ADMIN_TOKEN });
  }
  return res.status(401).json({ success: false, error: 'Invalid admin username or password credentials.' });
});

// Get: Portfolio projects
app.get('/api/projects', async (req, res) => {
  const projects = await getProjects();
  res.json(projects);
});

// Post: Add project (Admin only)
app.post('/api/projects', async (req, res) => {
  if (!isAdminAuth(req)) {
    return res.status(403).json({ error: 'Permission denied: Operational access required.' });
  }

  const projectData: Partial<Project> = req.body;
  if (!projectData.title || !projectData.description || !projectData.category) {
    return res.status(400).json({ error: 'Fields title, description, and category are mandatory.' });
  }

  const newProject: Project = {
    id: 'proj_' + Math.random().toString(36).substring(2, 11),
    title: projectData.title,
    description: projectData.description,
    longDescription: projectData.longDescription || '',
    tags: Array.isArray(projectData.tags) ? projectData.tags : [],
    image: projectData.image || 'https://picsum.photos/seed/default/800/600',
    link: projectData.link || '',
    github: projectData.github || '',
    category: (projectData.category as any) || 'web',
    featured: !!projectData.featured,
    metrics: projectData.metrics || ''
  };

  await addProject(newProject);
  res.status(201).json(newProject);
});

// Put: Edit project (Admin only)
app.put('/api/projects/:id', async (req, res) => {
  if (!isAdminAuth(req)) {
    return res.status(403).json({ error: 'Permission denied.' });
  }

  const { id } = req.params;
  const editData: Partial<Project> = req.body;
  
  const updated = await editProject(id, editData);
  if (!updated) {
    return res.status(404).json({ error: 'Project record not found or cannot be updated.' });
  }

  res.json(updated);
});

// Delete: Remove project (Admin only)
app.delete('/api/projects/:id', async (req, res) => {
  if (!isAdminAuth(req)) {
    return res.status(403).json({ error: 'Permission denied.' });
  }

  const { id } = req.params;
  const success = await deleteProject(id);

  if (!success) {
    return res.status(404).json({ error: 'Project target not found.' });
  }

  res.json({ success: true, message: 'Project indexed element deleted successfully.' });
});

// Post: Client registers customized design inquiry / requirements
app.post('/api/discussions', async (req, res) => {
  const { clientName, clientEmail, budget, projectType, message } = req.body;

  if (!clientName || !clientEmail || !message) {
    return res.status(400).json({ error: 'Missing client contact points or core message.' });
  }

  const newDiscussion: Discussion = {
    id: 'disc_' + Math.random().toString(36).substring(2, 11),
    clientName,
    clientEmail,
    budget: budget || 'Undetermined budget scope',
    projectType: projectType || 'web',
    message,
    status: 'new',
    replies: [],
    createdAt: new Date().toISOString()
  };

  await addDiscussion(newDiscussion);
  await trackAnalyticsInquiry();

  res.status(201).json(newDiscussion);
});

// Get: Retrieve all client inquiries (Admin only)
app.get('/api/discussions', async (req, res) => {
  if (!isAdminAuth(req)) {
    return res.status(403).json({ error: 'Permission denied.' });
  }
  const discussions = await getDiscussions();
  res.json(discussions);
});

// Put: Answer inquiry or state transitions (Admin only)
app.put('/api/discussions/:id', async (req, res) => {
  if (!isAdminAuth(req)) {
    return res.status(403).json({ error: 'Permission denied.' });
  }

  const { id } = req.params;
  const { status, replyMessage } = req.body;

  let newReply: DiscussionReply | undefined;
  if (replyMessage && replyMessage.trim()) {
    newReply = {
      id: 'rep_' + Math.random().toString(36).substring(2, 11),
      sender: 'admin',
      message: replyMessage.trim(),
      timestamp: new Date().toISOString()
    };
  }

  const updated = await updateDiscussion(id, status, newReply);
  if (!updated) {
    return res.status(404).json({ error: 'Discussion ticket not found.' });
  }

  res.json(updated);
});

// Post: Track page-view telemetry
app.post(['/api/analytics/view', '/api/analytics/visit'], async (req, res) => {
  const { projectId } = req.body || {};
  await trackAnalyticsView(projectId);
  res.json({ success: true });
});

// Get: General and timeline analytics metrics (Admin only)
app.get('/api/analytics', async (req, res) => {
  if (!isAdminAuth(req)) {
    return res.status(403).json({ error: 'Permission denied.' });
  }

  const stats = await getAnalyticsData();
  const allProjects = await getProjects();
  const allDiscussions = await getDiscussions();

  res.json({
    analytics: stats,
    totalProjects: allProjects.length,
    totalDiscussions: allDiscussions.length,
    totalNewInquiries: allDiscussions.filter((d) => d.status === 'new').length
  });
});

// -------------------------------------------------------------
// Vite Dev Server / Static Ingress Fallbacks
// -------------------------------------------------------------
async function bootstrap() {
  // Pre-establish database connections (Mongo Atlas, falls back safely to flat-files)
  await connectMongo().catch(err => {
    console.warn('[Database] Optional MongoDB connect hook failed during initialization. Operating on file fallback mode.', err);
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server bootstrap running on port http://0.0.0.0:${PORT}`);
  });
}

bootstrap().catch(err => {
  console.error('Server failure during startup orchestration:', err);
});
