import React from 'react';
import { motion } from 'framer-motion';
import { NextJSLogo, SpringBootLogo, TypeScriptLogo } from './TechnologyLogos';
import { BatteryIndicator, ChargingBatteryIndicator } from './BatteryIndicator';

const CurrentlyLearning: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 glass rounded-[32px] p-8 md:p-12 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-transparent pointer-events-none" />
        <div className="relative z-10 flex-1">
          <h3 className="text-4xl font-black mb-2 tracking-tight text-theme-primary">Currently Learning</h3>
          <p className="text-theme-secondary text-base font-medium">Expanding my ecosystem with enterprise technologies.</p>
        </div>
        
        <div className="flex flex-wrap gap-4 relative z-10">
          <motion.div 
            whileHover={{ y: -5 }}
            className="glass p-5 rounded-2xl border border-white/10 flex flex-col gap-4 min-w-[220px] shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-white/5 rounded-xl">
                <NextJSLogo />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-blue-400">Learning</span>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2 text-theme-primary">Next.js</h4>
              <BatteryIndicator percentage={30} color="bg-blue-500" />
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="glass p-5 rounded-2xl border border-white/10 flex flex-col gap-4 min-w-[220px] shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-white/5 rounded-xl">
                <SpringBootLogo />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-green-400">Exploring</span>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2 text-theme-primary">Spring Boot</h4>
              <BatteryIndicator percentage={20} color="bg-green-500" />
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="glass p-5 rounded-2xl border border-white/10 flex flex-col gap-4 min-w-[220px] shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-white/5 rounded-xl overflow-hidden">
                <TypeScriptLogo />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-blue-400">Queue!</span>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-2 text-theme-primary">TypeScript</h4>
              <ChargingBatteryIndicator text="Syncing" color="bg-blue-400" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CurrentlyLearning;

