
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, User } from 'lucide-react';
import { askResumeQuestion } from '../geminiService';
import { useTheme } from '../contexts/ThemeContext';

const AIChatOverlay: React.FC = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; text: string }[]>([
    { role: 'ai', text: "Hi! I'm Bhanu's AI Assistant. Ask me anything about his projects or skills!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    const aiResponse = await askResumeQuestion(userMsg);
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700 transition-transform active:scale-95 z-50 flex items-center gap-2 group"
      >
        <MessageSquare size={24} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">Chat with Bhanu's AI</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`fixed bottom-24 right-6 w-80 md:w-96 glass rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col border ${
              theme === 'dark' ? 'border-white/20' : 'border-black/20'
            }`}
          >
            <div className={`p-4 ${theme === 'dark' ? 'bg-white/5 border-b border-white/10' : 'bg-black/5 border-b border-black/10'} flex justify-between items-center`}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <h4 className={`font-bold text-base ${theme === 'dark' ? 'text-theme-primary' : 'text-theme-primary'}`}>Resume AI</h4>
                  <p className="text-xs text-green-400">Always active</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[400px]">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-base ${
                    m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : theme === 'dark' 
                      ? 'bg-white/10 text-gray-200 rounded-bl-none'
                      : 'bg-black/10 text-gray-800 rounded-bl-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className={`${theme === 'dark' ? 'bg-white/10 text-gray-400' : 'bg-black/10 text-gray-600'} p-3 rounded-2xl animate-pulse text-sm`}>
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className={`p-4 ${theme === 'dark' ? 'bg-white/5 border-t border-white/10' : 'bg-black/5 border-t border-black/10'} flex gap-2`}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about MERN, Deepfake, etc..."
                className={`flex-1 ${theme === 'dark' ? 'bg-white/10 border border-white/10 text-white placeholder-gray-400' : 'bg-black/10 border border-black/10 text-black placeholder-gray-500'} rounded-xl px-4 py-2 text-base focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              <button 
                onClick={handleSend}
                className="p-2 bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatOverlay;
