import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FolderGit2, ExternalLink, Github, ArrowUpRight, X, Sparkles, Code2, ShieldCheck, Cpu, Loader2 } from 'lucide-react';
import { Project } from '../types';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<'all' | 'web' | 'mobile' | 'ai'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string | null>(null);

  // Fetch projects from sever database
  const loadProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error('Failed to parse portfolio elements.');
      const data = await res.json();
      setProjects(data);
    } catch (e: any) {
      setErr(e.message || 'Error loading records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // Post view analytics when modal opens
  const reportView = async (projId: string) => {
    try {
      await fetch('/api/analytics/view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: projId })
      });
    } catch (e) {
      // Sloped silent telemetry error
    }
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    reportView(project.id);
  };

  const filteredProjects = projects.filter(p => filter === 'all' || p.category === filter);

  const categories: { label: string; value: typeof filter }[] = [
    { label: 'All Projects', value: 'all' },
    { label: 'Web Applications', value: 'web' },
    { label: 'AI Solutions', value: 'ai' },
    { label: 'Mobile Architecture', value: 'mobile' },
  ];

  return (
    <section id="projects" className="py-24 bg-[#0a0d16] relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-[10%] right-[10%] w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-96 h-96 bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-1.5 bg-slate-900 border border-slate-800 px-3.5 py-1 text-xs rounded-full font-mono text-emerald-400 mb-4"
          >
            <FolderGit2 className="w-4 h-4" />
            <span>03 . PORTFOLIO OF WORK</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Sleek systems. Smart integrations.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-400 text-sm mt-4 max-w-lg mx-auto leading-relaxed"
          >
            Exploring some of my selected applications, custom-engineered tools, and modern web systems.
          </motion.p>
        </div>

        {/* Filter Bar */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-2 p-1.5 bg-slate-950/80 border border-slate-900 rounded-2xl max-w-full justify-center">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`px-4 py-2 text-xs sm:text-sm font-display font-semibold rounded-xl transition-all duration-200 outline-none ${
                  filter === cat.value
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Work Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full animate-pulse">
            {[1, 2].map((id) => (
              <div key={id} className="flex flex-col justify-between overflow-hidden bg-slate-950 border border-slate-900 rounded-3xl text-left h-[500px]">
                <div className="bg-slate-900/50 aspect-[16/10] w-full" />
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="h-6 bg-slate-900 rounded w-1/2" />
                    <div className="h-4 bg-slate-900 rounded w-full" />
                    <div className="h-4 bg-slate-900 rounded w-5/6" />
                    <div className="flex gap-2">
                      <div className="h-5 bg-slate-900 rounded w-12" />
                      <div className="h-5 bg-slate-900 rounded w-16" />
                    </div>
                  </div>
                  <div className="h-10 bg-slate-900 rounded w-1/3 mt-6 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12 p-8 border border-slate-900 rounded-3xl bg-slate-950/40 w-full">
            <FolderGit2 className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <p className="text-slate-400 font-mono text-xs">No project logs found matching {filter} indexing.</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  key={project.id}
                  className="group flex flex-col justify-between overflow-hidden bg-slate-950 border border-slate-900/90 rounded-3xl text-left hover:border-slate-800 hover:shadow-2xl hover:shadow-black/40 transition-all duration-300"
                >
                  {/* Project Image Frame containing glow */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#0d1322]">
                    <div className="absolute inset-x-0 bottom-0 top-[20%] bg-gradient-to-t from-slate-950 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/10 to-teal-800/5 mix-blend-color-dodge z-10 opacity-60 group-hover:opacity-80 transition-opacity" />
                    
                    {/* Aspect Ratio 16:9 Picsum matching image-generation tool fallback rule */}
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover relative transition-transform duration-500 group-hover:scale-[1.03]"
                    />

                    {/* Top bar indicators */}
                    <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center">
                      <span className="font-mono text-[10px] tracking-wider font-bold bg-[#070a13]/80 border border-slate-850 px-2.5 py-1 rounded-md text-emerald-400 uppercase">
                        {project.category}
                      </span>
                      {project.metrics && (
                        <span className="font-mono text-[10px] bg-emerald-500 text-slate-950 px-2.5 py-1 rounded-md font-bold flex items-center gap-1 shadow-md">
                          <Cpu className="w-3.5 h-3.5" />
                          <span>{project.metrics}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Info and content */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-emerald-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-400 text-sm mt-3 leading-relaxed font-sans line-clamp-3">
                        {project.description}
                      </p>

                      {/* Technologies layout */}
                      <div className="flex flex-wrap gap-1.5 mt-5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] text-slate-400 bg-slate-900 border border-slate-900 px-2.5 py-1 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions buttons row */}
                    <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-900/60">
                      <button
                        onClick={() => handleSelectProject(project)}
                        className="group flex items-center space-x-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 font-mono"
                      >
                        <span>VIEW SYSTEM SPEC</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>

                    <div className="flex items-center space-x-3 text-slate-400">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white transition-colors"
                          title="View source code"
                          referrerPolicy="no-referrer"
                        >
                          <Github className="w-4.5 h-4.5" />
                        </a>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white transition-colors"
                          title="View live URL"
                          referrerPolicy="no-referrer"
                        >
                          <ExternalLink className="w-4.5 h-4.5" />
                        </a>
                      )}
                    </div>
                    </div>
                  </div>
                </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        )}

        {/* In-depth details Overlay Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Dim backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
              />

              {/* Modal Card content wrapper */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-slate-950 border border-slate-800 w-full max-w-3xl max-h-[85vh] rounded-3xl overflow-y-auto shadow-2xl z-10 scrollbar-thin"
              >
                {/* Modal upper image panel */}
                <div className="relative w-full aspect-video md:aspect-[21/9] bg-[#0c1221] overflow-hidden">
                  <div className="absolute inset-x-0 bottom-0 top-[30%] bg-gradient-to-t from-slate-950 to-transparent z-10" />
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Floating category */}
                  <span className="absolute top-4 left-4 font-mono text-[10px] tracking-widest font-bold bg-[#070a13] border border-slate-800 px-3 py-1 rounded-md text-emerald-400 uppercase">
                    {selectedProject.category}
                  </span>

                  {/* Close floating button */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 text-slate-400 hover:text-white hover:bg-black/90 border border-slate-800/60 backdrop-blur-sm transition-colors z-20 focus:outline-none"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Info description area */}
                <div className="p-6 sm:p-8 text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                      {selectedProject.title}
                    </h3>
                    
                    {/* Metrics pill */}
                    {selectedProject.metrics && (
                      <div className="inline-flex items-center space-x-1.5 self-start bg-emerald-950/80 border border-emerald-500/20 text-emerald-300 font-mono text-xs px-3.5 py-1.5 rounded-full font-bold">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Core Metric: {selectedProject.metrics}</span>
                      </div>
                    )}
                  </div>

                  {/* Extended technical profile */}
                  <div className="mt-6 space-y-4">
                    <h4 className="font-mono text-xs text-slate-500 uppercase tracking-widest font-semibold flex items-center gap-1.5 border-b border-slate-900 pb-2">
                      <Code2 className="w-4 h-4 text-emerald-400" />
                      <span>System Architecture Overview</span>
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed font-sans">
                      {selectedProject.longDescription || selectedProject.description}
                    </p>
                  </div>

                  {/* Key Architecture Features */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900/30 border border-slate-900 rounded-xl">
                      <h5 className="font-display font-semibold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Security & Access Scope</span>
                      </h5>
                      <p className="text-slate-400 text-[11px] mt-1.5 leading-relaxed font-sans">
                        Full route validation rulesets, parameter sanitize layers, and modern token headers implementation.
                      </p>
                    </div>
                    <div className="p-4 bg-slate-900/30 border border-slate-900 rounded-xl">
                      <h5 className="font-display font-semibold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Performance Scaling</span>
                      </h5>
                      <p className="text-slate-400 text-[11px] mt-1.5 leading-relaxed font-sans">
                        In-memory caching routes, optimized lazy asset configurations, and bundle compression algorithms.
                      </p>
                    </div>
                  </div>

                  {/* Technologies tags inside modal */}
                  <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-2">
                      <span className="font-mono text-[10px] text-slate-500 uppercase font-bold tracking-wider block">
                        Technologies Leveraged
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer live resource direct endpoints */}
                    <div className="flex items-center space-x-3.5 self-end">
                      {selectedProject.github && (
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-xs text-white font-mono px-4 py-2.5 rounded-xl border border-slate-850 transition-colors"
                          referrerPolicy="no-referrer"
                        >
                          <Github className="w-4 h-4" />
                          <span>Code Repository</span>
                        </a>
                      )}
                      {selectedProject.link && (
                        <a
                          href={selectedProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1.5 bg-emerald-500 hover:bg-emerald-400 text-xs text-slate-950 font-bold px-4 py-2.5 rounded-xl transition-all shadow-[0_0_15px_-5px_rgba(16,185,129,0.5)]"
                          referrerPolicy="no-referrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Live Deploy</span>
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
