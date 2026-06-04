import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Sparkles, MapPin, MessageSquare, Terminal, Zap } from 'lucide-react';
import { PERSONAL_INFO } from '../portfolioData';

export default function Hero() {
  const [greeting, setGreeting] = useState('Hello there');
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    // Dynamic greeting based on UTC time (our local time is injected, but let's base it on actual local clock!)
    const hours = new Date().getHours();
    if (hours < 12) setGreeting('Good morning');
    else if (hours < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    // Live clock representation
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Variant helper for staggering
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-24 flex items-center justify-center overflow-hidden bg-[#070a13]"
    >
      {/* Visual background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(16,185,129,0.1),transparent)]" />
      
      {/* Decorative Grid Patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.3)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(18,24,38,0.3)_1.5px,transparent_1.5px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_65%,transparent_100%)] pointer-events-none" />

      {/* Floating Ambient Glowing Orbs */}
      <div className="absolute top-[25%] left-[10%] w-72 h-72 bg-gradient-to-br from-emerald-500/10 to-teal-600/5 rounded-full blur-[100px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-gradient-to-tl from-cyan-500/5 to-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Detailed Info Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start space-y-6 text-left"
          >
            {/* Real-time Status Pills */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 items-center">
              <span className="inline-flex items-center space-x-2 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>{greeting}, I'm Abhisek</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 bg-slate-900/50 border border-slate-800/80 text-slate-400 px-3 py-1.5 rounded-full text-xs font-mono">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>Kolkata, IN</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 bg-slate-900/50 border border-slate-800/80 text-slate-400 px-3 py-1.5 rounded-full text-xs font-mono">
                <Terminal className="w-3.5 h-3.5 text-emerald-500" />
                <span>{timeStr || '00:00:00'} IST</span>
              </span>
            </motion.div>

            {/* Dynamic Title */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]"
            >
              Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400 drop-shadow-[0_2px_10px_rgba(16,185,129,0.15)]">bulletproof</span> software architectures & beautiful frontends.
            </motion.h1>

            {/* Tagline Pitch */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-400 max-w-xl font-sans font-normal leading-relaxed"
            >
              {PERSONAL_INFO.shortBio}
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 w-full sm:w-auto">
              <a
                href="#projects"
                className="group w-full sm:w-auto text-center inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl transition-all shadow-[0_10px_30px_-10px_rgba(16,185,129,0.5)] scroll-smooth hover:scale-[1.02]"
              >
                <span>View My Work</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </a>
              <a
                href="#contact"
                className="group w-full sm:w-auto text-center inline-flex items-center justify-center space-x-2 bg-slate-900/50 hover:bg-slate-800/40 border border-slate-800 hover:border-slate-700 text-white font-medium px-6 py-3.5 rounded-xl transition-all"
              >
                <MessageSquare className="w-4.5 h-4.5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                <span>Get In touch</span>
              </a>
            </motion.div>

            {/* Fast Stats Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-900/80 w-full"
            >
              {PERSONAL_INFO.metrics.map((m, idx) => (
                <div key={idx} className="flex flex-col items-start p-3 bg-slate-900/20 border border-slate-900/50 rounded-xl">
                  <span className="font-display font-bold text-2xl text-emerald-400">
                    {m.value}
                  </span>
                  <span className="font-mono text-[11px] text-slate-500 font-medium tracking-wider uppercase mt-1">
                    {m.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Interactive Profile / Code Panel Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="lg:col-span-5 relative flex justify-center py-4"
          >
            {/* Aesthetic backdrop shadow frame */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-3xl blur-2xl transform rotate-2 -z-10 scale-95" />

            <div className="w-full max-w-sm rounded-2xl bg-slate-950 border border-slate-800/90 shadow-2xl overflow-hidden group">
              {/* Terminal Code Header */}
              <div className="bg-[#0b0f19] px-4 py-3 border-b border-slate-900 flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest font-semibold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Interactive Bio</span>
                </div>
              </div>

              {/* Developer Profile card view */}
              <div className="p-6 flex flex-col items-center">
                <div className="relative mb-6">
                  {/* Decorative glowing backdrops */}
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 blur-md opacity-40 group-hover:opacity-75 transition-opacity" />
                  <img
                    src={PERSONAL_INFO.avatarUrl}
                    alt={PERSONAL_INFO.name}
                    referrerPolicy="no-referrer"
                    className="w-32 h-32 rounded-full relative z-10 object-cover border-2 border-[#070a13]"
                  />
                  <span className="absolute bottom-1 right-2 z-20 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-950 flex items-center justify-center animate-beat" />
                </div>

                <h3 className="font-display font-bold text-xl text-white">
                  {PERSONAL_INFO.name}
                </h3>
                <p className="font-mono text-xs text-emerald-400 mt-1 uppercase font-semibold">
                  {PERSONAL_INFO.title}
                </p>
                <div className="mt-4 flex items-center space-x-1 bg-slate-900/60 border border-slate-800 px-3 py-1 rounded-full text-xs text-slate-400">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  <span>Kolkata, IN / Remote Available</span>
                </div>

                {/* Micro tech cards inside profile */}
                <div className="mt-6 w-full space-y-2 border-t border-slate-900 pt-5">
                  <div className="text-left">
                    <span className="font-mono text-[10px] text-slate-500 uppercase font-bold">Primary Expertises</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind', 'Cloud Architectures'].map((stack) => (
                        <span
                          key={stack}
                          className="bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300 px-2 py-1 rounded-md"
                        >
                          {stack}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-left pt-2">
                    <span className="font-mono text-[10px] text-slate-500 uppercase font-bold">Operational Moto</span>
                    <p className="text-slate-400 text-xs italic mt-1 leading-relaxed">
                      "Make it simple, make it clean, make it bulletproof."
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
