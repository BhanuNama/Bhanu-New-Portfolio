import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import GlassCard from './GlassCard';
import { PROJECTS } from '../constants';
import { ChargingBatteryIndicator } from './BatteryIndicator';

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-20 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-12 px-4">
        <div>
          <h2 className="text-5xl font-bold mb-4 text-theme-primary">Selected Works</h2>
          <p className="text-base text-theme-secondary">Impactful projects leveraging modern tech stacks.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project, idx) => (
          <GlassCard key={project.id} className="group h-full flex flex-col" delay={idx * 0.1}>
            <div className={`w-full aspect-video rounded-xl bg-gradient-to-br ${project.color} mb-6 overflow-hidden relative shadow-inner group/image`}>
              {project.image ? (
                <img 
                  src={project.image} 
                  alt={`${project.title} - ${project.category}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-105"
                  style={{ objectPosition: 'center center' }}
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to gradient if image fails to load
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-all duration-500"
                >
                  <span className="text-8xl font-black select-none text-white">{project.title.charAt(0)}</span>
                </motion.div>
              )}
              <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider z-10 dark:bg-black/90 dark:text-white light:bg-white/95 light:text-black dark:border-white/40 light:border-black/40 border shadow-xl backdrop-blur-sm">
                {project.date}
              </div>
            </div>
            
            <h3 className="text-3xl font-bold mb-2 group-hover:text-blue-400 dark:group-hover:text-blue-400 light:group-hover:text-blue-600 transition-colors text-theme-primary">{project.title}</h3>
            <p className="text-base text-blue-400 dark:text-blue-400 light:text-blue-600 font-medium mb-4">{project.category}</p>
            
            <ul className="space-y-2 mb-6 flex-1">
              {project.description.map((desc, i) => (
                <li key={i} className="text-theme-secondary dark:text-gray-400 light:text-gray-700 text-base flex gap-2">
                  <span className="text-blue-500 dark:text-blue-500 light:text-blue-600">•</span> {desc}
                </li>
              ))}
            </ul>

            <div className="flex justify-between items-center pt-6 border-t dark:border-white/10 light:border-black/10 mt-auto min-h-[50px] transition-colors duration-300">
              {project.liveLink || project.githubLink ? (
                <div className="flex gap-5">
                  {project.liveLink && (
                    <motion.a 
                      href={project.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.12, color: '#22c55e' }}
                      className="flex items-center gap-1.5 text-sm font-bold text-green-500 dark:text-green-400/90 light:text-green-600 transition-all duration-300"
                      title="Open App"
                    >
                      Live <ExternalLink size={16} className="dark:text-green-400/90 light:text-green-600" />
                    </motion.a>
                  )}
                  {project.githubLink && (
                    <motion.a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.12 }}
                      className="flex items-center gap-1.5 text-sm font-bold dark:text-gray-300 light:text-gray-700 transition-all duration-300"
                      title="View Source"
                    >
                      Repo <Github size={16} className="dark:text-gray-300 light:text-gray-700" />
                    </motion.a>
                  )}
                </div>
              ) : (
                <div className="flex-1">
                  <ChargingBatteryIndicator text="In Building" color="bg-amber-400" />
                </div>
              )}
              
              <div className="flex flex-wrap gap-1 justify-end">
                {project.tools.slice(0, 2).map(tool => (
                  <span key={tool} className="text-xs px-2 py-0.5 rounded-md dark:bg-white/5 light:bg-black/10 border dark:border-white/10 light:border-black/20 dark:text-gray-400 light:text-gray-800 uppercase font-bold tracking-wider transition-colors duration-300">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;

