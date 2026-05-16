import React from 'react';
import { MoreHorizontal, Zap } from 'lucide-react';
import { formatCurrency } from '../lib/formatters';
import { useRadarStore } from '../store/useRadarStore';
import { toast } from 'sonner';

export default function DashboardLeadFeed({ onSelect }: { onSelect: (p: any) => void }) {
  const leads = useRadarStore(state => state.leads);
  const updateLeadStatus = useRadarStore(state => state.updateLeadStatus);

  return (
    <div className="bento-card !p-0 overflow-hidden">
      <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
        <h3 className="text-white font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2">
            <Zap size={14} className="text-orange-500" /> Live Intel Stream
        </h3>
        <span className="text-[10px] font-black text-slate-600 tracking-widest uppercase italic">Maricopa Sector</span>
      </div>
      <div className="max-h-[440px] overflow-y-auto no-scrollbar">
        {leads.slice(0, 10).map((p) => (
          <div key={p.id} onClick={() => onSelect(p)} className="p-6 flex items-center justify-between border-b border-white/5 hover:bg-white/[0.03] transition-all cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className={`w-1 h-8 rounded-full ${p.score === 'HOT' ? 'bg-orange-500 shadow-[0_0_8px_#f97316]' : 'bg-blue-500'}`}></div>
              <div>
                <p className="text-white font-bold text-sm group-hover:text-orange-500 transition-colors uppercase italic">{p.address}</p>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{p.type} • {p.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
                <span className="text-sm font-black text-emerald-400 tabular-nums">{formatCurrency(p.value)}</span>
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    toast.info("Quick Actions", { 
                      description: "Choose action for this lead",
                      action: { label: "Mark Contacted", onClick: () => updateLeadStatus(p.id, 'Contacted') }
                    });
                  }}
                  className="text-slate-600 hover:text-white transition-colors p-1"
                >
                  <MoreHorizontal size={18} />
                </button>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 text-center bg-white/[0.02] border-t border-white/5">
         <button onClick={() => toast.info('Opening Full Archives...')} className="text-xs font-black text-slate-500 uppercase tracking-widest hover:text-orange-500 transition-colors">
            Access Historical Archives →
         </button>
      </div>
    </div>
  );
}