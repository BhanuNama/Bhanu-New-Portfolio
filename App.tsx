import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import BackgroundOrbs from './components/BackgroundOrbs';
import HeroSection from './components/HeroSection';
import BentoSkills from './components/BentoSkills';
import CurrentlyLearning from './components/CurrentlyLearning';
import ProjectsSection from './components/ProjectsSection';
import AssignedWorksSection from './components/AssignedWorksSection';
import CodingActivity from './components/CodingActivity';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AIChatOverlay from './components/AIChatOverlay';

const App: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for reaching out! This is a demo form.');
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen selection:bg-blue-500/30 dark:selection:bg-blue-500/30 light:selection:bg-blue-600/20 transition-colors duration-300">
        <BackgroundOrbs />
        <Navigation />

        <main className="pt-24 pb-20 px-6" role="main" aria-label="Main content">
          <HeroSection />
          <BentoSkills />
          <CurrentlyLearning />
          <ProjectsSection />
          <AssignedWorksSection />
          <CodingActivity />
          <EducationSection />
          <ContactSection 
            formData={formData}
            setFormData={setFormData}
            handleFormSubmit={handleFormSubmit}
          />
        </main>

        <Footer />
        <ScrollToTop showScrollTop={showScrollTop} scrollToTop={scrollToTop} />
        <AIChatOverlay />
      </div>
    </ThemeProvider>
  );
};

export default App;
