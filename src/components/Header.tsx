import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Code, ArrowUpRight, Github, Linkedin, Mail, Lock } from 'lucide-react';
import { PERSONAL_INFO } from '../portfolioData';

interface HeaderProps {
  activeSection: string;
  onOpenAdmin: () => void;
}

export default function Header({ activeSection, onOpenAdmin }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0b0f19]/80 backdrop-blur-md border-b border-emerald-950/20 py-4 shadow-lg shadow-black/10'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="#home"
            id="brand-logo"
            className="flex items-center space-x-2.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-[1.5px] shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)] transition-all group-hover:scale-105">
              <div className="w-full h-full bg-[#0b0f19] rounded-[10px] flex items-center justify-center">
                <Code className="w-5 h-5 text-emerald-400 transition-transform group-hover:rotate-6" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg leading-tight tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                {PERSONAL_INFO.name}
              </span>
              <span className="font-mono text-[10px] text-emerald-400/80 tracking-wider font-medium">
                UI & SECURE FULL-STACK
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-1.5 bg-slate-900/40 border border-slate-800/60 p-1.5 rounded-full backdrop-blur-sm">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-1.5 rounded-full font-sans text-sm font-medium transition-colors duration-200 outline-none ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-emerald-300'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeBubble"
                      className="absolute inset-0 bg-gradient-to-r from-emerald-950/60 to-slate-800/80 border border-emerald-500/30 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Call to action & socials */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-emerald-400 transition-colors"
              referrerPolicy="no-referrer"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-emerald-400 transition-colors"
              referrerPolicy="no-referrer"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <button
              onClick={onOpenAdmin}
              className="px-3.5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-900 hover:border-slate-800 text-emerald-400 font-mono text-[11px] font-bold tracking-wider hover:shadow-[0_0_15px_-5px_className] transition-all flex items-center gap-1.5 focus:outline-none cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>ADMIN PORTAL</span>
            </button>
            <a
              href="#contact"
              className="group flex items-center space-x-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-medium font-sans text-sm px-4.5 py-2.5 rounded-xl transition-all shadow-[0_0_20px_-8px_rgba(16,185,129,0.8)] hover:shadow-emerald-400/30 hover:-translate-y-0.5"
            >
              <span>Build together</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6 text-emerald-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden border-t border-slate-900 bg-[#0b0f19]/95 backdrop-blur-xl absolute top-full left-0 w-full shadow-2xl overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-2.5">
              {navItems.map((item, index) => (
                <motion.a
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-display text-base font-semibold transition-all ${
                    activeSection === item.href.slice(1)
                      ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/30'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-emerald-300'
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}
              <div className="pt-4 border-t border-slate-900/60 flex items-center justify-between px-4">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenAdmin();
                  }}
                  className="bg-slate-900 hover:bg-slate-850 text-emerald-400 font-mono text-xs font-bold px-4.5 py-2.5 rounded-xl border border-slate-800 flex items-center gap-1.5 focus:outline-none cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>ADMIN PORTAL</span>
                </button>
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1 shadow-sm"
                >
                  <span>Build together</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
