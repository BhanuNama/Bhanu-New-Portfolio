import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Send, Linkedin, Github } from 'lucide-react';
import GlassCard from './GlassCard';
import GmailIcon from './GmailIcon';

interface ContactSectionProps {
  formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    subject: string;
    message: string;
  }>>;
  handleFormSubmit: (e: React.FormEvent) => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ formData, setFormData, handleFormSubmit }) => {
  return (
    <section id="contact" className="py-24 max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-blue-400 dark:text-blue-400 light:text-blue-600 font-mono text-base uppercase tracking-[0.2em] mb-3"
        >
          Wanna Say Hello
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-black mb-6 tracking-tight text-theme-primary"
        >
          Get In Touch
        </motion.h2>
        <p className="text-base text-theme-secondary max-w-2xl mx-auto leading-relaxed">
          I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll do my best to get back to you!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <GlassCard className="flex flex-col items-center text-center p-6 group">
              <div className="p-3 dark:bg-white/5 light:bg-black/5 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <GmailIcon size={24} />
              </div>
              <h4 className="text-lg font-bold mb-1 text-theme-primary">Email</h4>
              <p className="text-theme-secondary text-base mb-2">bhanunama08@gmail.com</p>
              <a href="mailto:bhanunama08@gmail.com" className="text-blue-400 dark:text-blue-400 light:text-blue-600 text-xs font-bold uppercase tracking-widest hover:text-theme-primary transition-colors">Send Message</a>
            </GlassCard>

            <GlassCard className="flex flex-col items-center text-center p-6 group">
              <div className="p-3 dark:bg-white/5 light:bg-black/5 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <Phone size={24} className="text-green-400 dark:text-green-400 light:text-green-600" />
              </div>
              <h4 className="text-lg font-bold mb-1 text-theme-primary">Phone</h4>
              <p className="text-theme-secondary text-base mb-2">+91 7993073400</p>
              <a href="tel:+917993073400" className="text-blue-400 dark:text-blue-400 light:text-blue-600 text-xs font-bold uppercase tracking-widest hover:text-theme-primary transition-colors">Call Now</a>
            </GlassCard>

            <GlassCard className="flex flex-col items-center text-center p-6 group">
              <div className="p-3 dark:bg-white/5 light:bg-black/5 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="text-red-400 dark:text-red-400 light:text-red-600 w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold mb-1 text-theme-primary">Location</h4>
              <p className="text-theme-secondary text-base mb-1">Hyderabad, India</p>
              <span className="text-blue-400 dark:text-blue-400 light:text-blue-600 text-xs font-bold uppercase tracking-widest cursor-default">Available Remotely</span>
            </GlassCard>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-8">
          <GlassCard className="p-8 pb-10">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-theme-tertiary ml-1">Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Your Name"
                    className="w-full dark:bg-white/5 light:bg-black/5 dark:border-white/10 light:border-black/10 border rounded-xl px-4 py-3 text-base text-theme-primary focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all dark:placeholder:text-gray-600 light:placeholder:text-gray-400"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-theme-tertiary ml-1">Email</label>
                  <input 
                    type="email" 
                    required
                    placeholder="yourname@gmail.com"
                    className="w-full dark:bg-white/5 light:bg-black/5 dark:border-white/10 light:border-black/10 border rounded-xl px-4 py-3 text-base text-theme-primary focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all dark:placeholder:text-gray-600 light:placeholder:text-gray-400"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-theme-tertiary ml-1">Subject</label>
                <input 
                  type="text" 
                  required
                  placeholder="Job Opportunity or Query"
                  className="w-full dark:bg-white/5 light:bg-black/5 dark:border-white/10 light:border-black/10 border rounded-xl px-4 py-3 text-base text-theme-primary focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all dark:placeholder:text-gray-600 light:placeholder:text-gray-400"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-theme-tertiary ml-1">Message</label>
                <textarea 
                  required
                  rows={5}
                  placeholder="Your message here..."
                  className="w-full dark:bg-white/5 light:bg-black/5 dark:border-white/10 light:border-black/10 border rounded-xl px-4 py-3 text-base text-theme-primary focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all dark:placeholder:text-gray-600 light:placeholder:text-gray-400 resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg dark:shadow-blue-600/20 light:shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                <Send size={18} /> Send Message
              </motion.button>
            </form>

            <div className="mt-10 border-t dark:border-white/10 light:border-black/10 pt-8 transition-colors duration-300">
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <motion.a 
                    href="https://linkedin.com/in/bhanu-nama-654957281/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className="flex-1 min-w-[140px] flex items-center gap-3 px-5 py-3 glass rounded-2xl dark:hover:bg-white/10 light:hover:bg-black/10 transition-all group"
                >
                    <Linkedin size={24} className="text-[#069]" />
                    <div className="text-left">
                      <p className="text-xs text-theme-tertiary font-bold uppercase group-hover:text-blue-400 dark:group-hover:text-blue-400 light:group-hover:text-blue-600 transition-colors">LinkedIn</p>
                      <p className="text-base font-medium text-theme-primary">Bhanu Nama</p>
                    </div>
                </motion.a>

                <motion.a 
                    href="https://github.com/BhanuNama?tab=repositories" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className="flex-1 min-w-[140px] flex items-center gap-3 px-5 py-3 glass rounded-2xl dark:hover:bg-white/10 light:hover:bg-black/10 transition-all group"
                >
                    <Github size={24} className="dark:text-gray-200 light:text-gray-800" />
                    <div className="text-left">
                      <p className="text-xs text-theme-tertiary font-bold uppercase group-hover:text-theme-primary transition-colors">GitHub</p>
                      <p className="text-base font-medium text-theme-primary">BhanuNama</p>
                    </div>
                </motion.a>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

