import React from 'react';

const BackgroundOrbs: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 dark:bg-blue-500/20 light:bg-blue-400/30 rounded-full blur-[120px] animate-float transition-colors duration-500" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 dark:bg-purple-500/10 light:bg-purple-400/20 rounded-full blur-[120px] transition-colors duration-500" />
    </div>
  );
};

export default BackgroundOrbs;

