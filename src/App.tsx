import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    // Record page visit telemetry
    fetch('/api/analytics/visit', { method: 'POST' }).catch(() => {});

    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for headers

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call to set state on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="portfolio-root" className="min-h-screen bg-[#070a13] text-slate-100 flex flex-col font-sans antialiased overflow-hidden selection:bg-emerald-500/10 selection:text-emerald-400">
      
      {/* Dynamic Header Component */}
      <Header activeSection={activeSection} onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Main Single Page Sections Array */}
      <main className="flex-grow">
        
        {/* Hero Section */}
        <div id="home">
          <Hero />
        </div>

        {/* Biography Section */}
        <div id="about">
          <About />
        </div>

        {/* Technical Stack Metrics Section */}
        <div id="skills">
          <Skills />
        </div>

        {/* Portfolio Gallery Projects Section */}
        <div id="projects">
          <Projects />
        </div>

        {/* Experience Timeline Section */}
        <div id="experience">
          <Experience />
        </div>

        {/* Contact Form Inquiry Section */}
        <div id="contact">
          <Contact />
        </div>

      </main>

      {/* Footer layout */}
      <Footer />

      {/* Admin Dashboard Control Panel Overlay */}
      <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />

    </div>
  );
}
