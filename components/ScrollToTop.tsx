import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

interface ScrollToTopProps {
  showScrollTop: boolean;
  scrollToTop: () => void;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ showScrollTop, scrollToTop }) => {
  return (
    <AnimatePresence>
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 p-4 rounded-full glass text-theme-primary shadow-xl dark:hover:bg-white/10 light:hover:bg-black/10 transition-transform active:scale-95 z-50 flex items-center justify-center border dark:border-white/20 light:border-black/20"
        >
          <ChevronUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;

