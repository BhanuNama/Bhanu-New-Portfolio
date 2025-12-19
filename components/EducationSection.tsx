import React from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, MapPin, GraduationCap, Award, ExternalLink } from 'lucide-react';
import GlassCard from './GlassCard';
import { EDUCATION, CERTIFICATIONS } from '../constants';

const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <h2 className="text-5xl font-bold mb-12 flex items-center gap-4 text-theme-primary">
          <GraduationCap className="text-blue-400" /> Education
        </h2>
        <div className="space-y-6">
          {EDUCATION.map((edu, i) => (
            <GlassCard key={i} className="flex gap-6 items-start" delay={i * 0.1}>
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                <CalendarIcon size={20} />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-theme-primary">{edu.degree}</h4>
                <p className="text-blue-400 dark:text-blue-400 light:text-blue-600 font-medium text-base">{edu.institution}</p>
                <div className="flex items-center gap-4 text-base text-theme-secondary mt-2">
                  <span className="flex items-center gap-1"><MapPin size={16} /> {edu.location}</span>
                  <span>|</span>
                  <span>{edu.duration}</span>
                </div>
                <div className="mt-4 inline-block px-3 py-1 rounded-lg bg-white/5 border border-white/10 font-mono text-base">
                  {edu.details}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-5xl font-bold mb-12 flex items-center gap-4 text-theme-primary">
          <Award className="text-purple-400" /> Certifications
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {CERTIFICATIONS.map((cert, i) => (
            <GlassCard key={i} className="flex items-center justify-between group" delay={i * 0.1}>
              <div>
                <h4 className="font-bold text-xl text-theme-primary">{cert.name}</h4>
                <p className="text-theme-secondary text-base">{cert.provider}</p>
              </div>
              <motion.div 
                whileHover={{ scale: 1.2, color: '#a855f7' }}
                className="p-2 glass opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ExternalLink size={18} />
              </motion.div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;

