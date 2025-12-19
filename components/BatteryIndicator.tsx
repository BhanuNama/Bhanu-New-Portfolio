import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export const BatteryIndicator = ({ percentage, color }: { percentage: number, color: string }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-14 h-7 border-2 dark:border-white/20 light:border-black/30 rounded-lg p-0.5 flex items-center transition-colors duration-300">
        <div 
          className={`h-full rounded-sm transition-all duration-1000 ${color}`} 
          style={{ width: `${percentage}%` }}
        />
        <div className="absolute -right-[4px] top-1/2 -translate-y-1/2 w-1 h-3 dark:bg-white/20 light:bg-black/30 rounded-r-sm transition-colors duration-300" />
      </div>
      <span className="text-base font-black font-mono dark:text-gray-400 light:text-gray-700 transition-colors duration-300">{percentage}%</span>
    </div>
  );
};

export const ChargingBatteryIndicator = ({ text = "Syncing", color = "bg-blue-400" }: { text?: string, color?: string }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-14 h-7 border-2 dark:border-white/20 light:border-black/30 rounded-lg p-0.5 flex items-center overflow-hidden transition-colors duration-300">
        <motion.div 
          className={`h-full rounded-sm ${color} dark:shadow-[0_0_10px_rgba(255,255,255,0.2)] light:shadow-[0_0_10px_rgba(0,0,0,0.2)]`}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
           <Zap size={10} className="text-white animate-pulse" />
        </div>
        <div className="absolute -right-[4px] top-1/2 -translate-y-1/2 w-1 h-3 dark:bg-white/20 light:bg-black/30 rounded-r-sm transition-colors duration-300" />
      </div>
      <span className="text-xs font-black font-mono dark:text-gray-400 light:text-gray-700 animate-pulse uppercase tracking-tighter transition-colors duration-300">{text}</span>
    </div>
  );
};

