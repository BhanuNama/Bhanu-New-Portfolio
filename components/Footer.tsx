import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t dark:border-white/10 light:border-black/10 glass transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-theme-secondary text-xl font-medium">
          Designed by <span className="text-theme-primary font-bold">Bhanu Nama</span> @2025
        </p>
      </div>
    </footer>
  );
};

export default Footer;

