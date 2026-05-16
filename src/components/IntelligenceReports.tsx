import React, { useState } from 'react';
import { Bell, BellOff, Plus, Settings2 } from 'lucide-react';
import { toast } from 'sonner';

interface Rule {
  id: number;
  title: string;
  desc: string;
  type: string;
  active: boolean;
}

export default function IntelligenceReports({ onCreate }: { onCreate: () => void }) {
  const [rules, setRules] = useState<Rule[]>([
    { id: 1, title: 'High-Value Alert', desc: 'Notify via Slack when any permit over $500k is detected in Scottsdale.', type: 'SURVEILLANCE', active: true },
    { id: 2, title: 'Solar Intelligence', desc: 'Batch all photovoltaic permits from Mesa into weekly data exports.', type: 'REPORTING', active: false },
  ]);

  const toggleRule = (id: number) => {
    setRules(prev => prev.map(r => {
      if (r.id === id) {
        const newState = !r.active;
        toast(newState ? 'Logic Node Active' : 'Logic Node Idle', {
          description: `${r.title} is now ${newState ? 'monitoring live feeds' : 'offline'}.`,
        });
        return { ...r, active: newState };
      }
      return r;
    }));
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="flex justify-end">
        <button onClick={onCreate} className="flex items-center gap-3 px-8 py-4 bg-orange-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-orange-500/20 hover:scale-105 transition-all active:scale-95">
          <Plus size={18} /> Initialize Logic Node
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {rules.map(rule => (
          <div 
            key={rule.id} 
            className={`bento-card !p-10 group transition-all duration-500 relative overflow-hidden ${rule.active ? 'border-orange-500/40 bg-orange-500/[0.03] shadow-xl shadow-orange-500/10' : ''}`}
          >
            <div className="flex justify-between items-start mb-10 relative z-10">
                <button 
                    onClick={() => toggleRule(rule.id)}
                    className={`p-5 rounded-[1.5rem] border-2 transition-all duration-500 active:scale-90 ${rule.active ? 'border-orange-500 bg-orange-500/10 text-orange-500 shadow-[0_0_25px_-4px] shadow-orange-500/50' : 'bg-white/5 border-white/10 text-slate-700'}`}
                >
                    {rule.active ? <Bell size={28} fill="currentColor" className="animate-pulse" /> : <BellOff size={28} />}
                </button>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest border transition-all ${rule.active ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' : 'text-slate-500 border-white/10'}`}>
                    {rule.active ? '● LIVE MONITORING' : 'OFFLINE'}
                </div>
            </div>

            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{rule.type}</p>
            <h3 className="text-3xl font-black text-white mb-4 italic uppercase tracking-tighter leading-none">{rule.title}</h3>
            <p className="text-slate-400 text-xs font-bold leading-relaxed mb-10 tracking-wide uppercase">{rule.desc}</p>

            <div className="border-t border-white/5 pt-8 mt-4 flex justify-between items-center">
                <button onClick={onCreate} className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-orange-500 transition-colors uppercase tracking-widest">
                    <Settings2 size={14} /> Configure Parameters
                </button>
            </div>

            {rule.active && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}