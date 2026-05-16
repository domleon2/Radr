import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, MessageSquare, Phone, Globe } from 'lucide-react';
import { toast } from 'sonner';
import { useRadarStore } from '../store/useRadarStore';
import { formatCurrency } from '../lib/formatters';
import { Lead } from '../types/permit';

export default function LeadDrawer({ lead: initialLead, onClose }: { lead: Lead | null; onClose: () => void }) {
  const leads = useRadarStore(state => state.leads);
  const updateLeadStatus = useRadarStore(state => state.updateLeadStatus);

  const [localNote, setLocalNote] = useState('');

  // Always get the freshest version of this lead from the store
  const currentLead = leads.find(l => l.id === initialLead?.id) || initialLead;

  if (!currentLead) return null;

  const handleStatusChange = (newStatus: string) => {
    updateLeadStatus(currentLead.id, newStatus as any);
    toast.success('Status Updated', {
      description: `${currentLead.address.split(',')[0]} → ${newStatus}`,
    });
  };

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]" />

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        className="fixed inset-y-0 right-0 w-full max-w-lg bg-[#080b11] border-l border-white/5 z-[101] shadow-2xl flex flex-col"
      >
        <div className="p-10 overflow-y-auto flex-1 space-y-10 pb-32">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-orange-500" />
              <span className="text-xs font-black uppercase tracking-widest text-orange-500">TARGET LOCKED</span>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white"><X size={28} /></button>
          </div>

          <h3 className="text-4xl font-black text-white tracking-tighter italic uppercase leading-none">{currentLead.address}</h3>

          {/* Status Buttons - Now Live Reactive */}
          <div className="bg-white/5 p-1 rounded-2xl border border-white/5 flex">
            {['New', 'Contacted', 'Won', 'Lost'].map((s) => (
              <button
                key={s}
                onClick={() => handleStatusChange(s)}
                className={`flex-1 py-4 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${
                  currentLead.status === s 
                    ? 'bg-orange-500 text-white shadow-lg scale-[1.02]' 
                    : 'text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
              <p className="uppercase text-xs tracking-widest text-slate-500 mb-2">Valuation</p>
              <p className="text-3xl font-black text-emerald-400 tabular-nums">{formatCurrency(currentLead.value)}</p>
            </div>
            <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
              <p className="uppercase text-xs tracking-widest text-slate-500 mb-2">Type</p>
              <p className="text-xl font-bold text-white">{currentLead.type}</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <MessageSquare size={14} /> FIELD NOTES
            </h4>
            <textarea
              value={localNote}
              onChange={(e) => setLocalNote(e.target.value)}
              placeholder="Add notes here..."
              className="w-full h-40 bg-white/5 border border-white/10 rounded-3xl p-6 text-sm focus:border-orange-500 outline-none"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}