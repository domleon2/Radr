import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Zap, FileText, Target, Settings, X } from 'lucide-react';

export default function CommandPalette({ isOpen, onClose }: any) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="w-full max-w-2xl bg-[#0d1117] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden relative z-10"
          >
            <div className="p-6 border-b border-white/5 flex items-center gap-4">
              <Search className="text-orange-500" size={20} />
              <input 
                autoFocus
                placeholder="Search system..." 
                className="bg-transparent border-none outline-none w-full text-lg font-bold text-white placeholder:text-slate-700"
              />
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-500 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 max-h-[300px] overflow-y-auto">
                <div className="space-y-1">
                    <p className="px-4 py-2 text-[10px] font-black text-slate-600 uppercase tracking-widest">Navigation</p>
                    <button className="w-full flex items-center gap-4 px-4 py-3 hover:bg-white/5 rounded-xl transition-all group">
                        <Zap size={18} className="text-slate-500 group-hover:text-orange-500" />
                        <span className="text-sm font-bold text-slate-300">Run Neural Scan</span>
                    </button>
                    <button className="w-full flex items-center gap-4 px-4 py-3 hover:bg-white/5 rounded-xl transition-all group">
                        <Target size={18} className="text-slate-500 group-hover:text-orange-500" />
                        <span className="text-sm font-bold text-slate-300">View Pipeline</span>
                    </button>
                </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}