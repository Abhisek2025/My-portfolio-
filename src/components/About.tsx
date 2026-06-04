import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShieldCheck, Zap, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../portfolioData';

export default function About() {
  const cards = [
    {
      icon: <Zap className="w-6 h-6 text-emerald-400" />,
      title: 'Performance Champion',
      description: 'Striving for sub-100ms response times, optimized bundles, fluid 60fps animations, and perfect Lighthouse metrics.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-teal-400" />,
      title: 'Rigorous Type Safety',
      description: 'Strict TypeScript usage to model full-stack components, eliminating runtime errors and ensuring self-documenting codebases.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-cyan-400" />,
      title: 'Interactive Craftsmanship',
      description: 'Bridging the design-engineering gap with creative typography, micro-interactions, and beautiful negative space.',
    },
    {
      icon: <Heart className="w-6 h-6 text-rose-400" />,
      title: 'User-Centric Architecture',
      description: 'Understanding actual human bottlenecks to engineer intuitive user workflows and clean, minimal interactive paths.',
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#0a0d16] relative overflow-hidden">
      {/* Decorative grids */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-1.5 bg-slate-900 border border-slate-800 px-3.5 py-1 text-xs rounded-full font-mono text-emerald-400 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>01 . BIOGRAPHY</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Smarter development. Cleaner execution.
          </motion.h2>
        </div>

        {/* Outer Split Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Detailed text explanation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-6 text-left"
          >
            <h3 className="font-display font-semibold text-2xl text-white">
              About Abhisek
            </h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-sans">
              I am a meticulous developer specializing in highly interactive, fluid, and robust full-stack applications. With expertise spanning advanced core frontends to optimized cloud databases, I help teams build polished digital experiences.
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-sans">
              I believe in structured coding standards, rich typography layouts, responsive fluid layouts, and keeping up-to-date with top-of-the-line software solutions for real-world scaling, including utilizing client-side states and caching layers.
            </p>

            <div className="p-5 bg-gradient-to-r from-emerald-950/20 to-slate-900/60 border border-emerald-950/40 rounded-2xl flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 text-emerald-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-display font-medium text-sm text-white">Continuous Innovation</h4>
                <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                  I regularly study official API logs, schema enhancements, and framework guidelines to ensure code robustness and absolute safety against common architectural traps.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Pillars Cards Block */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cards.map((card, index) => (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4, borderColor: 'rgba(16, 185, 129, 0.4)' }}
                key={index}
                className="p-6 rounded-2xl bg-slate-950/80 border border-slate-900 text-left transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="mb-4">
                    {card.icon}
                  </div>
                  <h4 className="font-display font-bold text-lg text-white">
                    {card.title}
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed font-sans mt-2">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
