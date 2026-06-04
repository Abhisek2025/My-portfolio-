import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  ShieldCheck,
  Sparkles,
  Wind,
  FileCode,
  Server,
  Cpu,
  Database,
  Zap,
  Ship,
  Cloud,
  Flame,
  GitBranch,
  Terminal,
  Activity
} from 'lucide-react';
import { SKILLS } from '../portfolioData';
import { Skill as SkillType } from '../types';

export default function Skills() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  // Icon lookup helper
  const renderSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers': return <Layers className="w-5 h-5 text-emerald-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-teal-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-emerald-400" />;
      case 'Wind': return <Wind className="w-5 h-5 text-cyan-400" />;
      case 'FileCode': return <FileCode className="w-5 h-5 text-emerald-400" />;
      case 'Server': return <Server className="w-5 h-5 text-emerald-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'Database': return <Database className="w-5 h-5 text-teal-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'Ship': return <Ship className="w-5 h-5 text-sky-400" />;
      case 'Cloud': return <Cloud className="w-5 h-5 text-emerald-400" />;
      case 'Flame': return <Flame className="w-5 h-5 text-amber-500" />;
      case 'GitBranch': return <GitBranch className="w-5 h-5 text-teal-400" />;
      default: return <Terminal className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 bg-[#070a13] relative overflow-hidden">
      {/* Visual background layers */}
      <div className="absolute top-[30%] left-[5%] w-72 h-72 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[60%] right-[5%] w-72 h-72 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Header Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-1.5 bg-slate-900 border border-slate-800 px-3.5 py-1 text-xs rounded-full font-mono text-emerald-400 mb-4"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>02 . SKILLS & ECOSYSTEM</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            A high-performance modern tech stack stack.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-400 text-sm mt-4 max-w-lg mx-auto leading-relaxed"
          >
            Curating state-of-the-art tools and programming frameworks configured to build fast, robust, and search-optimized applications.
          </motion.p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 bg-slate-950 border border-slate-900 rounded-2xl max-w-full overflow-x-auto scrollbar-none">
            {SKILLS.map((category, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategoryIndex(idx)}
                className={`flex items-center space-x-2.5 px-5 py-3 rounded-xl font-display text-sm font-semibold whitespace-nowrap transition-all duration-200 focus:outline-none ${
                  activeCategoryIndex === idx
                    ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-500/25 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
                }`}
              >
                <span>{category.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab content wrapper */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategoryIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Category Description Sidebar */}
            <div className="lg:col-span-4 text-left p-6 sm:p-8 bg-slate-950/80 border border-slate-900 rounded-3xl">
              <span className="font-mono text-xs text-slate-500 uppercase font-semibold tracking-wider block mb-3">
                Current Domain Focus
              </span>
              <h3 className="font-display text-2xl font-bold text-white mb-4">
                {SKILLS[activeCategoryIndex].title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed font-sans mb-6">
                {SKILLS[activeCategoryIndex].description}
              </p>

              <div className="pt-5 border-t border-slate-900 space-y-4">
                <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  <span>Production-Grade Architecture</span>
                </div>
                <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  <span>Clean API Protocols & Documentation</span>
                </div>
                <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  <span>Automated Testing Coverage</span>
                </div>
              </div>
            </div>

            {/* In-Depth Progress Indicators list */}
            <div className="lg:col-span-8 space-y-5">
              {SKILLS[activeCategoryIndex].skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="p-5 rounded-2xl bg-slate-950/40 border border-slate-900 hover:border-slate-800/80 transition-colors"
                >
                  {/* Label & percent indicator info */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center space-x-3 text-left">
                      <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0">
                        {renderSkillIcon(skill.iconName)}
                      </div>
                      <span className="font-display font-bold text-sm sm:text-base text-white">
                        {skill.name}
                      </span>
                    </div>
                    <span className="font-mono text-xs sm:text-sm text-emerald-400 font-bold">
                      {skill.level}% Proficiency
                    </span>
                  </div>

                  {/* Progress sliding background bar */}
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
