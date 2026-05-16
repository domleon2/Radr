import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, Cpu } from 'lucide-react';

export default function RuleModal({ isOpen, onClose }: any) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#0d1117] border border-white/10 rounded-[3rem] w-full max-w-lg p-10 relative z-10">
        <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3 text-orange-500">
                <Cpu size={20} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Logic Configuration</span>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full"><X size={20} /></button>
        </div>
        <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-6">Create Surveillance Rule</h3>
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Trigger Condition</label>
                <select className="w-full bg-white/5 border border-white/5 p-4 rounded-2xl text-xs font-bold outline-none"><option>Permit Value Greater Than...</option></select>
            </div>
            <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Value Threshold</label>
                <input type="text" placeholder="$500,000" className="w-full bg-white/5 border border-white/5 p-4 rounded-2xl text-xs font-bold outline-none" />
            </div>
            <button onClick={onClose} className="w-full py-5 bg-orange-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-orange-500/20 mt-4">Initialize Rule</button>
        </div>
      </motion.div>
    </div>
  );
}