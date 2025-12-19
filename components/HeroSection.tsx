import React, { useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import EditorActivity from './EditorActivity';

const HeroSection: React.FC = () => {
  // Tilt animation for profile image
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleProfileMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const maxRotate = 14; // degrees

    // Horizontal movement -> rotateY
    const rotateY = ((x - midX) / midX) * maxRotate;
    // Vertical movement -> rotateX (invert so top hover tilts back)
    const rotateX = -((y - midY) / midY) * maxRotate;

    tiltX.set(rotateX);
    tiltY.set(rotateY);
  };

  const handleProfileMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    setIsFlipped(false);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const nameVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Split name into letters for animation
  const name = "BHANU NAMA";
  const nameParts = name.split(" ");

  return (
    <section id="about" className="max-w-7xl mx-auto py-20 md:py-32 text-center md:text-left flex flex-col md:flex-row items-center gap-12 px-6">
      <div className="flex-1">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
        {/* Greeting */}
        <motion.div variants={itemVariants} className="mb-6">
          <motion.span
            className="inline-block text-blue-400 dark:text-blue-400 light:text-blue-600 font-mono text-sm md:text-base tracking-wider uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Hello, I'm
          </motion.span>
        </motion.div>

        {/* Name with animated letters */}
        <motion.div
          variants={nameVariants}
          className="mb-8 md:mb-10"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tight text-black dark:text-transparent">
            {nameParts.map((part, partIndex) => (
              <span key={partIndex} className="inline-block mr-3 md:mr-4">
                {part.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={letterIndex}
                    className="inline-block text-black dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-gray-100 dark:to-gray-400"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.4 + (partIndex * 0.1) + (letterIndex * 0.03),
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.2 },
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>
        </motion.div>

        {/* Description with animated words */}
        <motion.div variants={itemVariants} className="mb-10 md:mb-12">
          <div className="text-lg md:text-xl lg:text-2xl text-theme-secondary leading-relaxed max-w-3xl space-y-2">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-theme-primary font-semibold"
            >
              Software Developer | CSE Graduate
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              I build scalable, user-focused web applications using the{' '}
              <span className="text-theme-primary font-medium">MERN stack, Java, and database systems</span>.
            </motion.p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-4 mb-8"
        >
          <motion.a
            href="#projects"
            onClick={(e) => scrollToSection(e, 'projects')}
            className="group relative px-8 py-4 dark:bg-white dark:text-black light:bg-gray-900 light:text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 dark:shadow-[0_0_20px_rgba(255,255,255,0.1)] light:shadow-[0_0_20px_rgba(0,0,0,0.1)]"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              View Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
          </motion.a>

          <motion.a
            href="#contact"
            onClick={(e) => scrollToSection(e, 'contact')}
            className="group px-8 py-4 glass text-theme-primary font-semibold rounded-xl border dark:border-white/10 light:border-black/10 hover:border-theme-primary/30 transition-all duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail size={18} className="group-hover:scale-110 transition-transform duration-300" />
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Editor Activity */}
        <motion.div
          variants={itemVariants}
        >
          <EditorActivity />
        </motion.div>
        </motion.div>
      </div>
      
      {/* Right Side Image/Visual Element */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="w-64 h-64 md:w-96 md:h-96 relative flex-shrink-0"
      >
        <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-500/20 light:bg-blue-400/30 rounded-full blur-3xl animate-pulse transition-colors duration-500" />
        <div className="relative w-full h-full rounded-[40px] glass border dark:border-white/20 light:border-black/20 overflow-hidden flex items-center justify-center p-8 transition-colors duration-300">
          <div className="text-8xl font-black opacity-10 select-none text-theme-primary">BN</div>
          <motion.div
            className="absolute inset-4 border-2 border-dashed dark:border-white/10 light:border-black/10 rounded-[32px] overflow-hidden flex items-center justify-center transition-colors duration-300 [transform-style:preserve-3d]"
            style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 900 }}
            onMouseMove={handleProfileMouseMove}
            onMouseLeave={handleProfileMouseLeave}
            onMouseEnter={() => setIsFlipped(true)}
          >
            {/* Front face - default profile */}
            <motion.div
              className="absolute inset-0 [backface-visibility:hidden]"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <img
                src="/images/Profile.jpg"
                alt="Bhanu Nama"
                className="w-full h-full object-cover rounded-[28px]"
                loading="lazy"
              />
            </motion.div>

            {/* Back face - flipped profile */}
            <motion.div
              className="absolute inset-0 [backface-visibility:hidden]"
              style={{ rotateY: 180 }}
              animate={{ rotateY: isFlipped ? 360 : 180 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <img
                src="/images/FlippedProfile.jpg"
                alt="Bhanu Nama - Flipped"
                className="w-full h-full object-cover rounded-[28px]"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

