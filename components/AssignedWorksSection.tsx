import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import GlassCard from './GlassCard';

const ASSIGNED_WORKS = [
  {
    id: 'ship-management',
    title: 'Ship Management System',
    description: [
      'Built a role-based fleet management SPA for ship monitoring, maintenance scheduling, and operational analytics.',
      'Implemented job workflows, calendar planning, notifications, and exportable reports.'
    ],
    githubLink: 'https://github.com/BhanuNama/ENTNT-Ship-Management-System',
    liveLink: 'https://entnt-ship-management-bhanunama.netlify.app/',
    image: '🚢'
  },
  {
    id: 'dental-management',
    title: 'Dental Management System',
    description: [
      'Developed a role-based dental practice dashboard with patient management, appointments, analytics, and file handling.',
      'Delivered a responsive, production-ready frontend with strong UX and state persistence.'
    ],
    githubLink: 'https://github.com/BhanuNama/ENTNT-Dental-Management-System',
    liveLink: 'http://entnt-dental-management-system-bhanunama.vercel.app/',
    image: '🦷'
  }
];

const AssignedWorksSection: React.FC = () => {
  return (
    <section className="py-20 max-w-7xl mx-auto">
      <div className="mb-12 px-4">
        <h2 className="text-5xl font-bold mb-4 text-theme-primary">Some of Assigned Works</h2>
        <p className="text-base text-theme-secondary">Smaller projects completed as assigned work.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        {ASSIGNED_WORKS.map((work, idx) => (
          <motion.div
            key={work.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <GlassCard className="group flex flex-row gap-4 p-5 hover:scale-[1.02] transition-transform duration-300">
              {/* Image/Icon */}
              <div className="flex-shrink-0 w-20 h-20 rounded-xl dark:bg-white/5 light:bg-black/5 flex items-center justify-center text-4xl border dark:border-white/10 light:border-black/10 transition-colors duration-300">
                {work.image}
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 dark:group-hover:text-blue-400 light:group-hover:text-blue-600 transition-colors text-theme-primary">
                    {work.title}
                  </h3>
                  <ul className="space-y-1.5 mb-4">
                    {work.description.map((desc, i) => (
                      <li key={i} className="text-theme-secondary dark:text-gray-400 light:text-gray-700 text-sm flex gap-2 leading-relaxed">
                        <span className="text-blue-500 dark:text-blue-500 light:text-blue-600 flex-shrink-0 mt-1">•</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Links + Tech Stack */}
                <div className="flex items-center justify-between gap-4 pt-3 border-t dark:border-white/10 light:border-black/10 transition-colors duration-300">
                  <div className="flex gap-4">
                    <motion.a
                      href={work.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center gap-1.5 text-xs font-bold text-green-500 dark:text-green-400/90 light:text-green-600 transition-all duration-300"
                      title="Open App"
                    >
                      Live <ExternalLink size={14} className="dark:text-green-400/90 light:text-green-600" />
                    </motion.a>
                    <motion.a
                      href={work.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center gap-1.5 text-xs font-bold dark:text-gray-300 light:text-gray-700 transition-all duration-300"
                      title="View Source"
                    >
                      Repo <Github size={14} className="dark:text-gray-300 light:text-gray-700" />
                    </motion.a>
                  </div>

                  <div className="flex flex-wrap gap-1 justify-end">
                    {['React', 'TypeScript', 'TailwindCSS'].map((tool) => (
                      <span
                        key={tool}
                        className="text-[10px] px-2 py-0.5 rounded-md dark:bg-white/5 light:bg-black/10 border dark:border-white/10 light:border-black/20 dark:text-gray-400 light:text-gray-800 uppercase font-bold tracking-wider transition-colors duration-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AssignedWorksSection;

