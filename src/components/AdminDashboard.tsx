import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, LayoutDashboard, FolderGit2, MessageSquare, LineChart, Plus, Edit3, Trash2, 
  X, Check, Send, Sparkles, LogOut, ArrowRight, TrendingUp, Users, FileCode, CheckCircle, Clock,
  DollarSign, RefreshCw
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Project, Discussion, AnalyticsData, DiscussionReply } from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminDashboard({ isOpen, onClose }: AdminDashboardProps) {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [token, setToken] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  // Core records state
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'discussions'>('overview');
  const [analytics, setAnalytics] = useState<any>({
    totalVisits: 0,
    totalProjects: 0,
    totalDiscussions: 0,
    totalNewInquiries: 0,
    visits: []
  });
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [discussionsList, setDiscussionsList] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Form parameters: Managing Projects
  const [showProjectModal, setShowProjectModal] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    longDescription: '',
    tags: '',
    image: '',
    link: '',
    github: '',
    category: 'web',
    featured: false,
    metrics: ''
  });

  // Action state: Dispatched reply message
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});
  const [submittingAction, setSubmittingAction] = useState<string | null>(null);

  // Sync token from localStorage on load
  useEffect(() => {
    const savedToken = localStorage.getItem('portfolio_admin_token');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch metrics and collections when authenticated
  useEffect(() => {
    if (isAuthenticated && isOpen) {
      fetchAdminData();
    }
  }, [isAuthenticated, isOpen]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const headers = { 'Authorization': `Bearer ${token}` };

      // Get general analytics
      const analyticRes = await fetch('/api/analytics', { headers });
      if (analyticRes.ok) {
        const data = await analyticRes.json();
        setAnalytics({
          totalVisits: data.analytics.totalVisits,
          totalProjects: data.totalProjects,
          totalDiscussions: data.totalDiscussions,
          totalNewInquiries: data.totalNewInquiries,
          visits: data.analytics.visits
        });
      }

      // Get projects list
      const projRes = await fetch('/api/projects');
      if (projRes.ok) {
        const projs = await projRes.json();
        setProjectsList(projs);
      }

      // Get client discussion threads
      const discRes = await fetch('/api/discussions', { headers });
      if (discRes.ok) {
        const discussions = await discRes.json();
        setDiscussionsList(discussions.reverse()); // latest first
      }
    } catch (err) {
      console.error('Error fetching admin nodes:', err);
    } finally {
      setLoading(false);
    }
  };

  // Credentials form trigger
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Identity matching checks failed.');
      }

      localStorage.setItem('portfolio_admin_token', data.token);
      setToken(data.token);
      setIsAuthenticated(true);
      setAuthError(null);
    } catch (err: any) {
      setAuthError(err.message || 'Error processing authentication check.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('portfolio_admin_token');
    setToken(null);
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  // Project: Saving additions or edits
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.description) return;

    try {
      const headers = { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      const payload = {
        ...projectForm,
        tags: projectForm.tags.split(',').map(t => t.trim()).filter(Boolean),
        featured: !!projectForm.featured
      };

      let res;
      if (editingProject) {
        res = await fetch(`/api/projects/${editingProject.id}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch('/api/projects', {
          method: 'POST',
          headers,
          body: JSON.stringify(payload)
        });
      }

      if (res.ok) {
        setShowProjectModal(false);
        setEditingProject(null);
        // Clear inputs
        setProjectForm({
          title: '', description: '', longDescription: '', tags: '',
          image: '', link: '', github: '', category: 'web', featured: false, metrics: ''
        });
        fetchAdminData();
      }
    } catch (err) {
      console.error('Error recording project catalog element:', err);
    }
  };

  const handleEditClick = (proj: Project) => {
    setEditingProject(proj);
    setProjectForm({
      title: proj.title,
      description: proj.description,
      longDescription: proj.longDescription || '',
      tags: proj.tags.join(', '),
      image: proj.image,
      link: proj.link || '',
      github: proj.github || '',
      category: proj.category,
      featured: proj.featured,
      metrics: proj.metrics || ''
    });
    setShowProjectModal(true);
  };

  const handleDeleteProject = async (projId: string) => {
    if (!confirm('Are you key-certain you wish to drop this project record permanently?')) return;
    try {
      const res = await fetch(`/api/projects/${projId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchAdminData();
    } catch (err) {
      console.error('Error omitting project node:', err);
    }
  };

  // Discussions Status Transitions & Replies
  const handleUpdateDiscussion = async (discId: string, fields: { status?: 'new' | 'in-progress' | 'completed'; replyMessage?: string }) => {
    try {
      setSubmittingAction(discId);
      const res = await fetch(`/api/discussions/${discId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(fields)
      });

      if (res.ok) {
        // Clear reply box for this discussion
        if (fields.replyMessage) {
          setReplyTextMap(prev => ({ ...prev, [discId]: '' }));
        }
        fetchAdminData();
      }
    } catch (err) {
      console.error('Error answering client inquiry details:', err);
    } finally {
      setSubmittingAction(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-black/90 backdrop-blur-md overflow-hidden">
      
      {/* Background graphic elements */}
      <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative bg-[#080d16] border-0 md:border border-slate-900 w-full h-full md:max-h-[90vh] md:max-w-6xl md:rounded-3xl shadow-3xl text-left z-10 flex flex-col justify-between overflow-hidden">
        
        {/* Header container */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-900 bg-slate-950/60 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <span className="p-2 sm:p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400">
              <Lock className="w-4 h-4 sm:w-5 h-5 animate-pulse" />
            </span>
            <div>
              <h2 className="font-display font-black text-sm sm:text-base text-white flex items-center gap-1.5 uppercase tracking-wider">
                <span>ADMIN PLATFORM CONTROL</span>
                {isAuthenticated && (
                  <span className="bg-emerald-950 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-mono font-black border border-emerald-500/20">
                    SECURED
                  </span>
                )}
              </h2>
              <p className="text-[10px] font-mono text-slate-500">Live Workspace Portal API Proxy</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isAuthenticated && (
              <button 
                onClick={handleLogout}
                className="hidden sm:inline-flex items-center space-x-1.5 font-mono text-[10px] text-rose-400 hover:text-rose-300 bg-rose-950/20 px-3 py-1.5 rounded-lg border border-rose-900/30 font-bold transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>TERMINATE ADMIN SESSION</span>
              </button>
            )}
            <button 
              onClick={onClose}
              className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-850 rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Gateway Overlay or Main Workspace Container */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {!isAuthenticated ? (
            
            /* Secure Log-In Interface Gateway */
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="w-full max-w-sm bg-slate-950 border border-slate-900 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-emerald-500/40 via-teal-500/40 to-cyan-500/40" />

                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mx-auto">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-extrabold text-xl text-white">Unlock Admin Workspace</h3>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    Default developer credentials configured: Use <code className="bg-slate-900 text-emerald-300 font-mono px-1 py-0.5 rounded text-[11px]">admin</code> and <code className="bg-slate-900 text-emerald-300 font-mono px-1 py-0.5 rounded text-[11px]">password123</code>.
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4 text-left">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] text-slate-500 uppercase tracking-widest font-black">Username</label>
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="admin"
                      className="w-full bg-[#070a13] border border-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] text-slate-500 uppercase tracking-widest font-black">Admin Token / Password</label>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••••••"
                      className="w-full bg-[#070a13] border border-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  {authError && (
                    <div className="p-3.5 bg-rose-950/20 border border-rose-900/30 rounded-xl text-xs text-rose-400 flex items-center gap-2">
                      <Lock className="w-4 h-4 flex-shrink-0" />
                      <span>{authError}</span>
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={authLoading}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-black px-4 py-3 rounded-xl tracking-wider text-xs uppercase transition-all shadow-[0_10px_20px_-10px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2"
                  >
                    {authLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>VERIFY AUTHORIZATION</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            
            /* Connected Control Center Workspace */
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              
              {/* Sidebar controls */}
              <div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-slate-900 bg-slate-950/40 p-4 flex flex-row md:flex-col justify-start md:space-y-2 flex-wrap sm:flex-nowrap gap-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full text-left px-4 py-3.5 rounded-xl font-display text-xs font-bold transition-all flex items-center gap-3 block ${
                    activeTab === 'overview'
                      ? 'bg-slate-900 text-emerald-400 border border-slate-800'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                  }`}
                >
                  <LayoutDashboard className="w-4.5 h-4.5" />
                  <span>OVERVIEW TRACKS</span>
                </button>

                <button
                  onClick={() => setActiveTab('projects')}
                  className={`w-full text-left px-4 py-3.5 rounded-xl font-display text-xs font-bold transition-all flex items-center gap-3 block ${
                    activeTab === 'projects'
                      ? 'bg-slate-900 text-emerald-400 border border-slate-800'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                  }`}
                >
                  <FolderGit2 className="w-4.5 h-4.5" />
                  <span>PROJECTS ENGINE</span>
                </button>

                <button
                  onClick={() => setActiveTab('discussions')}
                  className={`w-full text-left px-4 py-3.5 rounded-xl font-display text-xs font-bold transition-all flex items-center gap-3 block ${
                    activeTab === 'discussions'
                      ? 'bg-slate-900 text-emerald-400 border border-slate-800'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                  }`}
                >
                  <MessageSquare className="w-4.5 h-4.5" />
                  <span className="flex-1 flex justify-between items-center">
                    <span>DISCUSSIONS LIST</span>
                    {analytics.totalNewInquiries > 0 && (
                      <span className="p-1 px-1.5 text-[9px] bg-emerald-500 text-slate-950 font-black rounded-md flex-shrink-0">
                        {analytics.totalNewInquiries} NEW
                      </span>
                    )}
                  </span>
                </button>

                <div className="flex-1 hidden md:block" />

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3.5 rounded-xl font-display text-xs font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-950/10 transition-all flex items-center gap-3 mt-auto block md:hidden"
                >
                  <LogOut className="w-4.5 h-4.5" />
                  <span>LOGOUT</span>
                </button>
              </div>

              {/* Main Active Panel details */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-950/20 text-slate-300">
                
                {loading ? (
                  <div className="h-48 flex items-center justify-center">
                    <RefreshCw className="w-8 h-8 animate-spin text-emerald-400" />
                  </div>
                ) : activeTab === 'overview' ? (
                  
                  /* PANEL: OVERVIEW & ANALYTICS */
                  <div className="space-y-6 text-left">
                    
                    {/* Upper analytical stat grid count elements */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      
                      <div className="bg-slate-950 border border-slate-900/80 rounded-2xl p-5 space-y-2 hover:border-slate-800 transition-all">
                        <div className="flex items-center justify-between text-slate-400">
                          <span className="font-mono text-[9px] tracking-widest font-black uppercase">total visitor count</span>
                          <Users className="w-4 h-4 text-emerald-400" />
                        </div>
                        <h4 className="text-2xl sm:text-3xl font-black font-display text-white">{analytics.totalVisits}</h4>
                        <div className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          <span>Seed-trend + history</span>
                        </div>
                      </div>

                      <div className="bg-slate-950 border border-slate-900/80 rounded-2xl p-5 space-y-2 hover:border-slate-800 transition-all">
                        <div className="flex items-center justify-between text-slate-400">
                          <span className="font-mono text-[9px] tracking-widest font-black uppercase">active portfolio projects</span>
                          <FileCode className="w-4 h-4 text-teal-400" />
                        </div>
                        <h4 className="text-2xl sm:text-3xl font-black font-display text-white">{analytics.totalProjects}</h4>
                        <div className="text-[10px] font-mono text-teal-400 font-bold flex items-center gap-1">
                          <span>Unlimited admin storage</span>
                        </div>
                      </div>

                      <div className="bg-slate-950 border border-slate-900/80 rounded-2xl p-5 space-y-2 hover:border-slate-800 transition-all">
                        <div className="flex items-center justify-between text-slate-400">
                          <span className="font-mono text-[9px] tracking-widest font-black uppercase">transmitted messages</span>
                          <MessageSquare className="w-4 h-4 text-cyan-400" />
                        </div>
                        <h4 className="text-2xl sm:text-3xl font-black font-display text-white">{analytics.totalDiscussions}</h4>
                        <div className="text-[10px] font-mono text-cyan-400 font-bold flex items-center gap-1">
                          <span>Across active budget threads</span>
                        </div>
                      </div>

                      <div className="bg-slate-950 border border-slate-900/80 rounded-2xl p-5 space-y-2 hover:border-slate-800 transition-all">
                        <div className="flex items-center justify-between text-slate-400">
                          <span className="font-mono text-[9px] tracking-widest font-black uppercase">new discussions</span>
                          <Clock className="w-4 h-4 text-amber-400" />
                        </div>
                        <h4 className="text-2xl sm:text-3xl font-black font-display text-amber-400">{analytics.totalNewInquiries}</h4>
                        <div className="text-[10px] font-mono text-amber-400/80 font-bold flex items-center gap-1">
                          <span>Pending response</span>
                        </div>
                      </div>

                    </div>

                    {/* Timeline analytics charts block */}
                    <div className="bg-slate-950 border border-slate-900 rounded-3xl p-5 sm:p-6 text-left">
                      <div className="flex items-center justify-between border-b border-slate-900 pb-4 mb-4">
                        <div>
                          <h4 className="font-display font-black text-sm text-white tracking-widest uppercase flex items-center gap-1.5">
                            <LineChart className="w-4 h-4 text-emerald-400" />
                            <span>VISITS AND CLIENT INQUIRIES HISTORY</span>
                          </h4>
                          <p className="text-[10px] font-mono text-slate-500">Seed-historical node data logs (Recharts Area rendering)</p>
                        </div>
                        <div className="flex items-center space-x-4 font-mono text-[10px] font-bold">
                          <span className="flex items-center gap-1 text-emerald-400">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                            <span>Page Visits</span>
                          </span>
                          <span className="flex items-center gap-1 text-teal-400">
                            <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                            <span>Inquiries</span>
                          </span>
                        </div>
                      </div>

                      {/* Actual chart object */}
                      <div className="h-64 sm:h-72 w-full mt-6 flex select-none">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={analytics.visits} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                              <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                              </linearGradient>
                              <linearGradient id="colorInquiries" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0d9488" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#0f172a" />
                            <XAxis dataKey="date" stroke="#475569" fontSize={10} fontFamily="monospace" />
                            <YAxis stroke="#475569" fontSize={10} fontFamily="monospace" />
                            <Tooltip contentStyle={{ backgroundColor: '#070a13', border: '1px solid #1e293b', borderRadius: '12px' }} />
                            <Area type="monotone" dataKey="visits" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorVisits)" />
                            <Area type="monotone" dataKey="inquiries" stroke="#0d9488" strokeWidth={2} fillOpacity={1} fill="url(#colorInquiries)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                  </div>
                ) : activeTab === 'projects' ? (
                  
                  /* PANEL: PROJECT MANAGER WORKSPACE */
                  <div className="space-y-4 text-left">
                    <div className="flex items-center justify-between border-b border-slate-900 pb-4">
                      <div>
                        <h3 className="font-display font-black text-sm text-white uppercase tracking-widest">Active Project Database elements</h3>
                        <p className="text-[10px] font-mono text-slate-500">Instantly add or update projects without making code changes</p>
                      </div>
                      
                      <button
                        onClick={() => {
                          setEditingProject(null);
                          setProjectForm({
                            title: '', description: '', longDescription: '', tags: '',
                            image: 'https://picsum.photos/seed/' + Math.floor(Math.random() * 1000) + '/800/600', 
                            link: '', github: '', category: 'web', featured: false, metrics: ''
                          });
                          setShowProjectModal(true);
                        }}
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-3.5 py-2.5 rounded-xl transition-all shadow-[0_0_15px_-5px_rgba(16,185,129,0.5)] flex items-center space-x-1 uppercase"
                      >
                        <Plus className="w-4 h-4" />
                        <span>INDEX PROJECT</span>
                      </button>
                    </div>

                    {/* Interactive table grid list */}
                    <div className="space-y-3 mt-4">
                      {projectsList.map((p) => (
                        <div 
                          key={p.id}
                          className="bg-slate-950 border border-slate-900 rounded-2xl p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-800 transition-all text-left"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-14 h-11 bg-slate-900 border border-slate-800 rounded-lg overflow-hidden flex-shrink-0 relative">
                              <img src={p.image} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                              <div className="absolute top-1 left-1 bg-black/60 font-mono text-[8px] px-1 rounded uppercase text-emerald-400">
                                {p.category}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
                                <span>{p.title}</span>
                                {p.featured && (
                                  <span className="bg-amber-950 text-amber-400 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded border border-amber-900/30">
                                    FEATURED
                                  </span>
                                )}
                              </h4>
                              <p className="text-[11px] text-slate-400 line-clamp-1 leading-relaxed mt-0.5">{p.description}</p>
                              <div className="flex flex-wrap gap-1 mt-1.5">
                                {p.tags.slice(0, 4).map((t) => (
                                  <span key={t} className="font-mono text-[8px] text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 sm:self-center self-end">
                            <button
                              onClick={() => handleEditClick(p)}
                              className="p-2 sm:p-2.5 bg-slate-900 hover:bg-slate-850 hover:text-white border border-slate-850 rounded-xl transition-colors"
                              title="Edit variables"
                            >
                              <Edit3 className="w-4 h-4 text-teal-400" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(p.id)}
                              className="p-2 sm:p-2.5 bg-slate-900 hover:bg-slate-850 hover:text-white border border-slate-850 rounded-xl transition-colors"
                              title="Drop elements"
                            >
                              <Trash2 className="w-4 h-4 text-rose-400" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                ) : (
                  
                  /* PANEL: DISCUSSION TRACKER & COMMUNICATE QUEUE */
                  <div className="space-y-4 text-left">
                    <div>
                      <h3 className="font-display font-black text-sm text-white uppercase tracking-widest">CLIENT PROJECT CHANNELS</h3>
                      <p className="text-[10px] font-mono text-slate-500">Track incoming client inquiry boards and reply in real-time</p>
                    </div>

                    <div className="space-y-5 mt-4">
                      {discussionsList.length === 0 ? (
                        <div className="py-12 text-center border border-slate-900 bg-slate-950/40 rounded-3xl">
                          <MessageSquare className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                          <p className="font-mono text-xs text-slate-500">No client discussion channels available.</p>
                        </div>
                      ) : (
                        discussionsList.map((disc) => (
                          <div 
                            key={disc.id}
                            className="bg-slate-950 border border-slate-900/90 rounded-2xl overflow-hidden hover:border-slate-800 transition-all text-left"
                          >
                            {/* Inner header metadata row */}
                            <div className="px-5 py-4 bg-slate-950 border-b border-slate-900 flex flex-wrap items-center justify-between gap-3 text-slate-400">
                              <div className="space-y-1">
                                <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
                                  <span>{disc.clientName}</span>
                                  <span className="font-mono text-[10px] font-medium text-slate-500 hover:text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                                    {disc.clientEmail}
                                  </span>
                                </h4>
                                <div className="flex items-center space-x-4 font-mono text-[9px] font-bold">
                                  <span className="flex items-center gap-1 text-emerald-400">
                                    <DollarSign className="w-3.5 h-3.5" />
                                    <span>Scope: {disc.budget}</span>
                                  </span>
                                  <span className="bg-slate-905 px-1.5 py-0.5 rounded text-slate-400 uppercase">
                                    Type: {disc.projectType}
                                  </span>
                                  <span className="text-slate-500">
                                    {new Date(disc.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </div>
                              </div>

                              {/* Action selector transitions */}
                              <div className="flex items-center space-x-1.5 font-mono">
                                <button
                                  onClick={() => handleUpdateDiscussion(disc.id, { status: 'new' })}
                                  className={`px-2.5 py-1 text-[9px] rounded-lg border font-bold uppercase transition-all ${
                                    disc.status === 'new'
                                      ? 'bg-amber-950 text-amber-400 border-amber-500/20'
                                      : 'bg-slate-900 text-slate-400 border-slate-850 hover:text-white'
                                  }`}
                                >
                                  NEW
                                </button>
                                <button
                                  onClick={() => handleUpdateDiscussion(disc.id, { status: 'in-progress' })}
                                  className={`px-2.5 py-1 text-[9px] rounded-lg border font-bold uppercase transition-all ${
                                    disc.status === 'in-progress'
                                      ? 'bg-teal-950 text-teal-400 border-teal-500/20'
                                      : 'bg-slate-900 text-slate-400 border-slate-850 hover:text-white'
                                  }`}
                                >
                                  IN DISCUSS
                                </button>
                                <button
                                  onClick={() => handleUpdateDiscussion(disc.id, { status: 'completed' })}
                                  className={`px-2.5 py-1 text-[9px] rounded-lg border font-bold uppercase transition-all ${
                                    disc.status === 'completed'
                                      ? 'bg-emerald-950 text-emerald-400 border-emerald-500/20'
                                      : 'bg-slate-900 text-slate-400 border-slate-850 hover:text-white'
                                  }`}
                                >
                                  COMPLETED
                                </button>
                              </div>
                            </div>

                            {/* Client content text message */}
                            <div className="p-5 space-y-4">
                              <div className="p-4 bg-slate-900/30 border border-slate-900 rounded-xl space-y-1.5">
                                <span className="font-mono text-[9px] text-slate-500 font-bold block uppercase tracking-wider">PROJECT REQUIREMENTS DESCRIPTION:</span>
                                <p className="text-xs text-slate-300 leading-relaxed font-sans">{disc.message}</p>
                              </div>

                              {/* Historic replies array log */}
                              {disc.replies && disc.replies.length > 0 && (
                                <div className="space-y-2.5 pl-4 border-l border-emerald-500/10">
                                  {disc.replies.map((rep) => (
                                    <div key={rep.id} className="text-xs p-3 bg-slate-900/15 border border-slate-900/50 rounded-xl max-w-xl text-left">
                                      <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 font-bold mb-1 uppercase tracking-wider">
                                        <span className="text-emerald-400">ADMIN (Abhisek) REPLIED:</span>
                                        <span>
                                          {new Date(rep.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                      </div>
                                      <p className="text-slate-300 text-[11px] leading-relaxed mt-1 font-sans">{rep.message}</p>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Active answer text area editor */}
                              <div className="flex items-end gap-3.5 pt-2">
                                <textarea
                                  placeholder="Type responsive details, options, recommendations or state changes to reply..."
                                  value={replyTextMap[disc.id] || ''}
                                  onChange={(e) => setReplyTextMap(prev => ({ ...prev, [disc.id]: e.target.value }))}
                                  rows={2}
                                  className="flex-1 bg-[#070a13] hover:border-slate-800 focus:border-emerald-500 border border-slate-850 rounded-xl p-3 text-xs text-white focus:outline-none resize-none placeholder-slate-600 font-sans leading-relaxed"
                                />
                                <button
                                  onClick={() => {
                                    const txt = replyTextMap[disc.id];
                                    if (!txt || !txt.trim()) return;
                                    handleUpdateDiscussion(disc.id, { replyMessage: txt });
                                  }}
                                  disabled={submittingAction === disc.id}
                                  className="p-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black shadow-[0_0_15px_-5px_rgba(16,185,129,0.5)] transition-all flex items-center justify-center flex-shrink-0"
                                  title="Submit response email draft"
                                >
                                  {submittingAction === disc.id ? (
                                    <RefreshCw className="w-4.5 h-4.5 animate-spin" />
                                  ) : (
                                    <Send className="w-4.5 h-4.5" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

              </div>

            </div>
          )}
        </div>

      </div>

      {/* MODAL: ADD / EDIT PROJECT SPECIFICATION */}
      <AnimatePresence>
        {showProjectModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
              onClick={() => setShowProjectModal(false)}
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-[#070c14] border border-slate-800 w-full max-w-xl max-h-[85vh] rounded-3xl overflow-y-auto shadow-2xl z-20 text-left"
            >
              <div className="px-6 py-4.5 border-b border-slate-900 flex items-center justify-between bg-slate-950/60 sticky top-0 z-15 backdrop-blur-sm">
                <h4 className="font-display font-black text-xs text-white tracking-widest uppercase flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>{editingProject ? 'UPDATE' : 'CREATE'} SYSTEM PROJECT LOG</span>
                </h4>
                <button
                  onClick={() => setShowProjectModal(false)}
                  className="p-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="p-6 space-y-4 text-left">
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] text-slate-500 font-bold uppercase tracking-wider">PROJECT NAME *</label>
                    <input 
                      type="text" 
                      value={projectForm.title}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, title: e.target.value }))}
                      required
                      placeholder="e.g. Genesis Commerce"
                      className="w-full bg-[#0a0d16] border border-slate-850 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[9px] text-slate-500 font-bold uppercase tracking-wider">PROJECT CATEGORY *</label>
                    <select
                      value={projectForm.category}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full bg-[#0a0d16] border border-slate-850 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                    >
                      <option value="web">Web Application</option>
                      <option value="mobile">Mobile Layout</option>
                      <option value="ai">AI Solution</option>
                      <option value="design">Design Architecture</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[9px] text-slate-500 font-bold uppercase tracking-wider">SHORT DESCRIPTION *</label>
                  <input 
                    type="text" 
                    value={projectForm.description}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                    required
                    placeholder="Short line summary under 120 chars..."
                    className="w-full bg-[#0a0d16] border border-slate-850 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[9px] text-slate-500 font-bold uppercase tracking-wider">DETAILED SYSTEM SPEC LONG DESCRIPTION</label>
                  <textarea 
                    value={projectForm.longDescription}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, longDescription: e.target.value }))}
                    rows={3}
                    placeholder="Extended technical specifications rendering modal details..."
                    className="w-full bg-[#0a0d16] border border-slate-850 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-sans"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] text-slate-500 font-bold uppercase tracking-wider">TECHNOLOGY TAGS (COMMA SEPARATED)</label>
                    <input 
                      type="text" 
                      value={projectForm.tags}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, tags: e.target.value }))}
                      placeholder="React, TypeScript, Node.js"
                      className="w-full bg-[#0a0d16] border border-slate-850 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[9px] text-slate-500 font-bold uppercase tracking-wider">IMAGE URL</label>
                    <input 
                      type="text" 
                      value={projectForm.image}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="https://picsum.photos/..."
                      className="w-full bg-[#0a0d16] border border-slate-850 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] text-slate-500 font-bold uppercase tracking-wider">LIVE PRODUCTION URL</label>
                    <input 
                      type="text" 
                      value={projectForm.link}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, link: e.target.value }))}
                      placeholder="https://myproduct.com"
                      className="w-full bg-[#0a0d16] border border-slate-850 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[9px] text-slate-500 font-bold uppercase tracking-wider">GITHUB REPOSITORY URL</label>
                    <input 
                      type="text" 
                      value={projectForm.github}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, github: e.target.value }))}
                      placeholder="https://github.com/..."
                      className="w-full bg-[#0a0d16] border border-slate-850 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 items-center">
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] text-slate-500 font-bold uppercase tracking-wider">CORE METRIC PILL VALUE</label>
                    <input 
                      type="text" 
                      value={projectForm.metrics}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, metrics: e.target.value }))}
                      placeholder="e.g. < 15ms render loop"
                      className="w-full bg-[#0a0d16] border border-slate-850 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="flex items-center space-x-2 pt-5">
                    <input 
                      id="featured-checkbox"
                      type="checkbox" 
                      checked={projectForm.featured}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, featured: e.target.checked }))}
                      className="w-4.5 h-4.5 rounded bg-[#0a0d16] border-slate-800 text-emerald-500 cursor-pointer"
                    />
                    <label htmlFor="featured-checkbox" className="font-mono text-[9px] text-slate-300 font-bold uppercase tracking-wider cursor-pointer">
                      FEATURE ON PORTFOLIO HOME
                    </label>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-black px-4 py-3 rounded-xl tracking-wider text-xs uppercase transition-all shadow-[0_10px_20px_-10px_rgba(16,185,129,0.3)] flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>PUBLISH DATABASE LOG</span>
                </button>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
