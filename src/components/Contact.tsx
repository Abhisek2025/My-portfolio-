import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, Send, Check, AlertCircle, RefreshCw, Github, Linkedin, DollarSign, Layers } from 'lucide-react';
import { PERSONAL_INFO } from '../portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '$5,000 - $10,000',
    projectType: 'web',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submissionState, setSubmissionState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your name.';
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address (e.g., mail@example.com).';
    }
    if (!formData.message.trim()) newErrors.message = 'Please input your project / query content.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSubmissionState('submitting');
      
      const payload = {
        clientName: formData.name,
        clientEmail: formData.email,
        budget: formData.budget,
        projectType: formData.projectType,
        message: formData.message
      };

      const res = await fetch('/api/discussions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('API submission rejected.');
      
      setSubmissionState('success');
      setFormData({ name: '', email: '', budget: '$5,000 - $10,000', projectType: 'web', message: '' });
    } catch (err) {
      setErrors({ form: 'Unable to deliver message transmission. Please try again.' });
      setSubmissionState('idle');
    }
  };

  const budgetOptions = [
    { label: '< $5,000 USD', value: '< $5,000' },
    { label: '$5,000 - $10,000 USD', value: '$5,000 - $10,000' },
    { label: '$10,000 - $20,000 USD', value: '$10,000 - $20,000' },
    { label: '$20,000+ USD Enterprise', value: '$20,000+' },
  ];

  const projectTypes = [
    { label: 'Web Application Client', value: 'web' },
    { label: 'Full-Stack Integration', value: 'fullstack' },
    { label: 'AI Agent Consultation', value: 'ai' },
    { label: 'Mobile Architecture', value: 'mobile' },
  ];

  return (
    <section id="contact" className="py-24 bg-[#0a0d16] relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-1.5 bg-slate-900 border border-slate-800 px-3.5 py-1 text-xs rounded-full font-mono text-emerald-400 mb-4"
          >
            <Mail className="w-4 h-4 text-emerald-400" />
            <span>05 . CONNECT & DISCUSS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Let's start your project.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-400 text-sm mt-4 max-w-lg mx-auto leading-relaxed"
          >
            Have an open-source tool idea, full-stack pipeline development, or design project? Message me directly!
          </motion.p>
        </div>

        {/* Dynamic Inner Columns split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-start">
          
          {/* Left Column details scope metadata */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6 text-left"
          >
            <div className="bg-slate-950 border border-slate-900 rounded-3xl p-6 sm:p-8 space-y-6">
              
              {/* Working Availability Tag */}
              <div className="inline-flex items-center space-x-2 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 px-4.5 py-2 rounded-full text-xs font-mono font-medium tracking-wide">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Open for freelance & contract roles</span>
              </div>

              <h3 className="font-display font-bold text-xl text-white">
                Contact Details
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
                Prefer direct communication? Drop a line via the mailbox, or check historical code patterns via GitHub!
              </p>

              {/* Direct Info list */}
              <div className="space-y-4 pt-4 border-t border-slate-900/60">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0 text-emerald-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest block font-bold">Write me at</span>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sm font-semibold text-white hover:text-emerald-400 transition-colors">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0 text-teal-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest block font-bold">Local time bounds</span>
                    <span className="text-sm font-semibold text-white">
                      {PERSONAL_INFO.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Secondary Action nodes */}
              <div className="pt-6 border-t border-slate-900/60 flex items-center space-x-4 text-slate-400">
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 rounded-xl border border-slate-850 transition-all flex items-center justify-center"
                  referrerPolicy="no-referrer"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 rounded-xl border border-slate-850 transition-all flex items-center justify-center"
                  referrerPolicy="no-referrer"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>

            </div>
          </motion.div>

          {/* Right Column Form wrapper */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 bg-slate-950 border border-slate-900 rounded-3xl p-6 sm:p-8 relative"
          >
            <AnimatePresence mode="wait">
              {submissionState === 'success' ? (
                /* Success feedback container */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-5"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 animate-bounce">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-extrabold text-2xl text-white">
                    Transmission Sent!
                  </h3>
                  <p className="text-slate-400 text-sm max-w-md font-sans leading-relaxed">
                    Thank you, Abhisek has received your secure form submission. I will compile responses and contact you via your email shortly.
                  </p>
                  <button
                    onClick={() => setSubmissionState('idle')}
                    className="flex items-center space-x-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-mono font-bold pt-4 focus:outline-none"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>TRANSMIT ANOTHER ENQUIRY</span>
                  </button>
                </motion.div>
              ) : (
                /* Formal input interactive schema */
                <motion.form
                  key="form-schema"
                  onSubmit={handleSubmit}
                  className="space-y-5 text-left"
                >
                  {/* Row Name & Email fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="name-input" className="font-mono text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                        Full Name *
                      </label>
                      <input
                        id="name-input"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full bg-[#0b0f19] border rounded-xl px-4 py-3 text-sm text-white font-sans focus:outline-none transition-all ${
                          errors.name
                            ? 'border-rose-500/60 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30'
                            : 'border-slate-850 hover:border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20'
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <div className="flex items-center space-x-1 mt-1 text-[11px] text-rose-400 font-medium font-sans">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.name}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email-input" className="font-mono text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                        Email Address *
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full bg-[#0b0f19] border rounded-xl px-4 py-3 text-sm text-white font-sans focus:outline-none transition-all ${
                          errors.email
                            ? 'border-rose-500/60 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30'
                            : 'border-slate-850 hover:border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20'
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <div className="flex items-center space-x-1 mt-1 text-[11px] text-rose-400 font-medium font-sans">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.email}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Budget & Project Type selectors row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="budget-select" className="font-mono text-[10px] text-slate-500 uppercase tracking-widest font-bold flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Project Budget Bracket</span>
                      </label>
                      <select
                        id="budget-select"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full bg-[#0b0f19] border border-slate-850 rounded-xl px-4 py-3 text-sm text-white font-sans focus:outline-none hover:border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 cursor-pointer"
                      >
                        {budgetOptions.map((opt) => (
                          <option key={opt.value} value={opt.value} className="bg-[#0a0d16] text-slate-300">
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="type-select" className="font-mono text-[10px] text-slate-500 uppercase tracking-widest font-bold flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-teal-400" />
                        <span>Project Category</span>
                      </label>
                      <select
                        id="type-select"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full bg-[#0b0f19] border border-slate-850 rounded-xl px-4 py-3 text-sm text-white font-sans focus:outline-none hover:border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 cursor-pointer"
                      >
                        {projectTypes.map((opt) => (
                          <option key={opt.value} value={opt.value} className="bg-[#0a0d16] text-slate-300">
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message body textbox */}
                  <div className="space-y-1.5">
                    <label htmlFor="message-input" className="font-mono text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                      Project Message Content *
                    </label>
                    <textarea
                      id="message-input"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full bg-[#0b0f19] border rounded-xl px-4 py-3 text-sm text-white font-sans focus:outline-none transition-all resize-none ${
                        errors.message
                          ? 'border-rose-500/60 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30'
                          : 'border-slate-850 hover:border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20'
                      }`}
                      placeholder="Tell me about your product scope, timeline, budget range..."
                    />
                    {errors.message && (
                      <div className="flex items-center space-x-1 mt-1 text-[11px] text-rose-400 font-medium font-sans">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.message}</span>
                      </div>
                    )}
                  </div>

                  {/* Button Submission Trigger */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submissionState === 'submitting'}
                      className="group relative w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-bold px-6 py-4 rounded-xl transition-all shadow-[0_10px_30px_-10px_rgba(16,185,129,0.3)] hover:-translate-y-0.5"
                    >
                      {submissionState === 'submitting' ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin text-slate-950" />
                          <span>Encrypting Transmission...</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Secure Message</span>
                          <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
