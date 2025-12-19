import React from 'react';
import { Github, Trophy } from 'lucide-react';
import GitHubCalendar from 'react-github-calendar';
import GlassCard from './GlassCard';
import { useTheme } from '../contexts/ThemeContext';

const CodingActivity: React.FC = () => {
  const { theme } = useTheme();

  return (
    <section id="activity" className="py-20 max-w-7xl mx-auto px-4">
      <div className="mb-12">
        <h2 className="text-5xl font-bold mb-4 text-theme-primary">Coding Activity</h2>
        <p className="text-base text-theme-secondary">Consistent growth across open source and competitive programming.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* GitHub Contributions */}
        <GlassCard className="flex flex-col gap-6 p-8">
          <div className="flex items-center gap-3">
            <div className="p-3 dark:bg-white/5 light:bg-black/5 rounded-xl">
              <Github size={24} className="text-theme-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-theme-primary">Open Source</h3>
              <p className="text-sm text-theme-secondary">@BhanuNama on GitHub</p>
            </div>
          </div>

          <div 
            className="bg-white/5 p-6 rounded-2xl overflow-x-auto overflow-y-visible w-full"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: theme === 'dark' ? 'rgba(255,255,255,0.2) rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.2) rgba(0,0,0,0.05)'
            }}
          >
            <div className="inline-block" style={{ minWidth: 'max-content' }}>
              <GitHubCalendar 
                username="BhanuNama" 
                colorScheme={theme}
                theme={{
                  light: ['#ffffff', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
                }}
                fontSize={12}
                blockSize={12}
                blockMargin={4}
              />
            </div>
          </div>
        </GlassCard>

        {/* LeetCode Activity */}
        <GlassCard className="flex flex-col gap-6 p-8 relative overflow-hidden">
           <div className="flex items-center gap-3 relative z-10">
            <div className="p-3 bg-amber-500/10 rounded-xl">
              <Trophy size={24} className="text-amber-500" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-theme-primary">Problem Solving</h3>
              <p className="text-sm text-theme-secondary">@BhanuNama on LeetCode</p>
            </div>
          </div>

          <div className="relative z-10 bg-white/5 rounded-2xl overflow-hidden flex items-center justify-center p-2">
            <img 
              src="https://leetcard.jacoblin.cool/BhanuNama?theme=dark&font=Sofia%20Sans&ext=activity" 
              alt="Bhanu Nama LeetCode Statistics - Problem Solving Activity and Coding Stats" 
              title="LeetCode Coding Activity Statistics"
              className="w-full h-auto rounded-xl"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full" />
        </GlassCard>
      </div>
    </section>
  );
};

export default CodingActivity;

