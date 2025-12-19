
import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -3, 
        scale: 1.005,
        boxShadow: "0 4px 10px -2px rgba(0, 0, 0, 0.1), 0 0 10px 1px rgba(59, 130, 246, 0.05)"
      }}
      transition={{ 
        duration: 0.3, 
        delay,
        boxShadow: { duration: 0.2 },
        y: { type: "spring", stiffness: 300, damping: 20 },
        scale: { type: "spring", stiffness: 300, damping: 20 }
      }}
      viewport={{ once: true }}
      className={`glass rounded-2xl p-6 glass-hover cursor-default relative z-10 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
