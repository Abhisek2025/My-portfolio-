import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, CheckCircle2, Award } from 'lucide-react';
import { EXPERIENCES } from '../portfolioData';

export default function Experience() {
  // Store IDs of expanded experiences. All are expanded by default for readability, but can be collapsed.
  const [expandedIds, setExpandedIds] = useState<string[]>(['exp1', 'exp2']);

  const toggleExpand = (id: string) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((item) => item !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

  return (
    <section id="experience" className="py-24 bg-[#070a13] relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-96 h-96 bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-1.5 bg-slate-900 border border-slate-800 px-3.5 py-1 text-xs rounded-full font-mono text-emerald-400 mb-4"
          >
            <Briefcase className="w-4 h-4 text-emerald-400" />
            <span>04 . CAREER TIMELINE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Professional milestones & tenure.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-400 text-sm mt-4 max-w-lg mx-auto leading-relaxed"
          >
            Demonstrated trajectory designing scale systems, organizing engineering workflows, and pushing robust production releases.
          </motion.p>
        </div>

        {/* Timeline Vector Representation */}
        <div className="relative max-w-4xl mx-auto text-left">
          {/* Vertical timeline trunk road */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 block transform sm:-translate-x-1/2 pointer-events-none" />

          {/* Individual timeline nodes */}
          <div className="space-y-12 relative">
            {EXPERIENCES.map((exp, index) => {
              const isEven = index % 2 === 0;
              const isExpanded = expandedIds.includes(exp.id);

              return (
                <div
                  key={exp.id}
                  className={`flex flex-col sm:flex-row relative items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline central node marker */}
                  <div className="absolute left-4 sm:left-1/2 w-8 h-8 rounded-full bg-[#070a13] border-2 border-slate-800 flex items-center justify-center transform -translate-x-1/2 z-20 pointer-events-none mt-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" />
                  </div>

                  {/* Empty spatial column block mirroring on desktop */}
                  <div className="hidden sm:block w-1/2" />

                  {/* Structural Card Container */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`ml-12 sm:ml-0 w-[calc(100%-3rem)] sm:w-[calc(50%-2.5rem)]`}
                  >
                    <div className="p-6 rounded-3xl bg-slate-950 border border-slate-900 shadow-xl group hover:border-[#10b981]/20 transition-all duration-300">
                      
                      {/* Meta Information header */}
                      <div className="flex flex-col gap-2">
                        {/* Period pill */}
                        <div className="flex items-center space-x-1.5 self-start bg-emerald-950/40 border border-emerald-500/10 text-emerald-300 font-mono text-[10px] px-3.5 py-1 rounded-full font-bold">
                          <Calendar className="w-3 h-3" />
                          <span>{exp.period}</span>
                        </div>

                        {/* Position Role details */}
                        <h4 className="font-display font-extrabold text-lg sm:text-xl text-white group-hover:text-emerald-400 transition-colors mt-2">
                          {exp.role}
                        </h4>

                        {/* Company Metadata metrics */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-0.5 text-xs text-slate-400 font-medium">
                          <span className="text-white font-semibold font-display">
                            {exp.company}
                          </span>
                          <span className="flex items-center gap-1 text-slate-500">
                            <MapPin className="w-3.5 h-3.5 text-slate-600" />
                            <span>{exp.location}</span>
                          </span>
                        </div>
                      </div>

                      {/* Bio brief descriptor */}
                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-4 font-sans">
                        {exp.description}
                      </p>

                      {/* Interactive toggle for Achievements */}
                      <div className="pt-4 mt-4 border-t border-slate-900/60">
                        <button
                          onClick={() => toggleExpand(exp.id)}
                          className="flex items-center space-x-1 text-xs text-slate-500 hover:text-emerald-400 font-mono font-bold transition-colors focus:outline-none"
                        >
                          <span>{isExpanded ? 'HIDE ACCOMPLISHMENTS' : 'VIEW ACCOMPLISHMENTS'}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {/* Achievements Drawer Animation */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <ul className="mt-4 space-y-2.5 text-left">
                                {exp.achievements.map((bullet, idx) => (
                                  <li key={idx} className="flex items-start text-xs text-slate-400 font-sans leading-relaxed">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mr-2.5 mt-0.5" />
                                    <span>{bullet}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Tech Stacks labels chips */}
                      <div className="mt-6 pt-4 border-t border-slate-900/40">
                        <div className="flex flex-wrap gap-1.5">
                          {exp.skills.map((skill) => (
                            <span
                              key={skill}
                              className="font-mono text-[10px] text-slate-400 bg-slate-900 border border-slate-850 px-2 py-0.5 rounded-md"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
