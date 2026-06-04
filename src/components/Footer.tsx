import React from 'react';
import { motion } from 'motion/react';
import { ArrowUp, Code, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../portfolioData';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-[#070a13] border-t border-slate-950 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_50%_110%,rgba(16,185,129,0.06),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Logo brand */}
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-400 p-[1.5px]">
              <div className="w-full h-full bg-[#0b0f19] rounded-[7px] flex items-center justify-center">
                <Code className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display font-semibold text-sm leading-tight text-white">
                {PERSONAL_INFO.name}
              </span>
              <span className="font-mono text-[9px] text-slate-500 tracking-wider">
                © {currentYear} ALL RIGHTS RESERVED
              </span>
            </div>
          </div>

          {/* Quick links representation */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-400">
            <a href="#home" className="hover:text-emerald-400 transition-colors">Home</a>
            <a href="#about" className="hover:text-emerald-400 transition-colors">About</a>
            <a href="#skills" className="hover:text-emerald-400 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-emerald-400 transition-colors">Projects</a>
            <a href="#experience" className="hover:text-emerald-400 transition-colors">Experience</a>
            <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a>
          </div>

          {/* Scroll to Top Dynamic trigger */}
          <motion.button
            onClick={handleScrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center justify-center w-10 h-10 rounded-xl bg-slate-950 border border-slate-900 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all focus:outline-none cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4.5 h-4.5 transition-transform group-hover:animate-bounce" />
          </motion.button>

        </div>

        {/* Closing details code line */}
        <div className="mt-8 pt-8 border-t border-slate-900/60 text-center flex flex-col sm:flex-row sm:justify-between items-center gap-4 text-xs font-mono text-slate-600">
          <span>Designed with absolute intent · 100% Client-Side Stateful Caches</span>
          <div className="flex space-x-1 items-center">
            <span>Powered by</span>
            <span className="text-slate-400 font-bold">Vite</span>
            <span>+</span>
            <span className="text-emerald-400 font-bold">React</span>
            <span>+</span>
            <span className="text-teal-400 font-bold">Tailwind</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
