import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navigation: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 w-full z-40 px-6 py-4 flex justify-between items-center glass border-b-0" role="navigation" aria-label="Main navigation">
      <a 
        href="#about" 
        onClick={(e) => {
          e.preventDefault();
          scrollToTop();
        }}
        className="text-2xl font-black tracking-tighter text-theme-primary cursor-pointer hover:opacity-80 transition-opacity"
        aria-label="Bhanu Nama - Go to top"
      >
        BN.
      </a>
      <div className="hidden md:flex gap-8 text-base font-medium text-theme-secondary" role="menubar">
        <a href="#about" className="hover:text-theme-primary transition-colors" aria-label="About section">About</a>
        <a href="#skills" className="hover:text-theme-primary transition-colors" aria-label="Skills section">Skills</a>
        <a href="#projects" className="hover:text-theme-primary transition-colors" aria-label="Projects section">Projects</a>
        <a href="#activity" className="hover:text-theme-primary transition-colors" aria-label="Coding activity section">Activity</a>
        <a href="#education" className="hover:text-theme-primary transition-colors" aria-label="Education section">Education</a>
        <a href="#contact" className="hover:text-theme-primary transition-colors" aria-label="Contact section">Contact</a>
      </div>
      <div className="flex gap-4 items-center">
        <ThemeToggle />
        <a 
          href="https://github.com/BhanuNama?tab=repositories" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/10 rounded-full transition-all text-theme-secondary hover:text-theme-primary"
          aria-label="Visit Bhanu Nama's GitHub profile"
        >
          <Github size={20} />
        </a>
        <a 
          href="https://linkedin.com/in/bhanu-nama-654957281/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/10 rounded-full transition-all text-theme-secondary hover:text-theme-primary"
          aria-label="Visit Bhanu Nama's LinkedIn profile"
        >
          <Linkedin size={20} />
        </a>
      </div>
    </nav>
  );
};

export default Navigation;

