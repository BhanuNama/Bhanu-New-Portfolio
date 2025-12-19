import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2.5 rounded-full glass dark:hover:bg-white/10 light:hover:bg-black/10 transition-all text-theme-secondary hover:text-theme-primary relative overflow-hidden group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.3 }}
        className="relative w-5 h-5"
      >
        {theme === 'dark' ? (
          <Moon size={20} className="absolute inset-0" />
        ) : (
          <Sun size={20} className="absolute inset-0" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;

