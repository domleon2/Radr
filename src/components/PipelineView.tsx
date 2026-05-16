import React, { useState } from 'react';
import { PhoneCall, CheckCircle2, XCircle, Zap, MoreVertical, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../lib/formatters';
import { useRadarStore } from '../store/useRadarStore';
import { Lead, LeadStatus } from '../types/permit';
import { toast } from 'sonner';

export default function PipelineView({ onSelect }: { onSelect: (p: Lead) => void }) {
  const { leads, updateLeadStatus } = useRadarStore();
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const stages: { name: string; icon: any; color: string; status: LeadStatus; bg: string }[] = [
    { name: 'New', icon: <Zap size={16} />, color: 'text-orange-500', status: 'New', bg: 'bg-orange-500/5' },
    { name: 'Contacted', icon: <PhoneCall size={16} />, color: 'text-blue-500', status: 'Contacted', bg: 'bg-blue-500/5' },
    { name: 'Won', icon: <CheckCircle2 size={16} />, color: 'text-emerald-500', status: 'Won', bg: 'bg-emerald-500/5' },
    { name: 'Lost', icon: <XCircle size={16} />, color: 'text-red-500', status: 'Lost', bg: 'bg-red-500/5' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 pb-20">
      {stages.map((stage) => (
        <div 
          key={stage.name} 
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            const id = parseInt(e.dataTransfer.getData('leadId'));
            updateLeadStatus(id, stage.status);
            toast.success(`Pipeline Updated`, { description: `Lead marked as ${stage.status}` });
          }}
          className="kanban-column min-h-[700px] relative"
        >
          <div className="flex items-center justify-between mb-8 px-2">
            <div className={`flex items-center gap-3 ${stage.color}`}>
              {stage.icon}
              <span className="font-black uppercase tracking-[0.2em] text-[12px] italic">{stage.name}</span>
            </div>
            <span className="bg-white/5 text-[10px] font-black px-3 py-1 rounded-full border border-white/5 text-slate-500">
                {leads.filter(l => l.status === stage.status).length}
            </span>
          </div>

          <div className="space-y-4">
            {leads.filter(l => l.status === stage.status).map((lead) => (
              <div 
                key={lead.id} draggable
                onDragStart={(e) => e.dataTransfer.setData('leadId', lead.id.toString())}
                onClick={() => onSelect(lead)}
                className="group bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-orange-500/30 rounded-2xl p-6 transition-all cursor-grab active:cursor-grabbing relative"
              >
                <div className="flex justify-between gap-4 mb-4">
                  <p className="font-bold text-white text-[15px] uppercase italic tracking-tight line-clamp-2">{lead.address}</p>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === lead.id ? null : lead.id); }}
                    className="p-1 hover:bg-white/10 rounded-lg text-slate-700 hover:text-white"
                  >
                    <MoreVertical size={16} />
                  </button>
                  
                  {activeMenu === lead.id && (
                    <div className="absolute right-6 top-12 w-40 bg-[#0d1117] border border-white/10 rounded-xl shadow-2xl z-30 overflow-hidden">
                        {['New', 'Contacted', 'Won', 'Lost'].map(s => (
                            <button key={s} onClick={(e) => { e.stopPropagation(); updateLeadStatus(lead.id, s as any); setActiveMenu(null); }} className="w-full text-left px-4 py-2.5 text-[10px] font-black uppercase text-slate-400 hover:bg-orange-500 hover:text-white transition-colors">{s}</button>
                        ))}
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-end mt-6">
                  <span className="text-emerald-400 font-black text-xl italic">{formatCurrency(lead.value)}</span>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded border ${lead.score === 'HOT' ? 'border-orange-500/40 text-orange-500' : 'text-slate-600'}`}>{lead.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}