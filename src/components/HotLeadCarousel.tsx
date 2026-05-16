import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { formatCurrency } from '../lib/formatters';
import { useRadarStore } from '../store/useRadarStore';
import { Lead } from '../types/permit';

export default function HotLeadCarousel({ onSelect }: { onSelect: (p: Lead) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const leads = useRadarStore(state => state.leads);

  const hotLeads = leads.filter(l => l.score === 'HOT').slice(0, 6);

  const scroll = (direction: 'left' | 'right') => {
    scrollRef.current?.scrollBy({
      left: direction === 'left' ? -340 : 340,
      behavior: 'smooth'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-4">
        <h4 className="text-xs font-black text-white uppercase tracking-[0.4em] flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse shadow-[0_0_8px_#f97316]"></div>
          HIGH-VELOCITY TARGETS
        </h4>
        <div className="flex gap-2">
          <button onClick={() => scroll('left')} className="p-2.5 bg-white/5 border border-white/5 rounded-full hover:bg-orange-500 hover:text-white transition-all active:scale-90">
            <ChevronLeft size={16} />
          </button>
          <button onClick={() => scroll('right')} className="p-2.5 bg-white/5 border border-white/5 rounded-full hover:bg-orange-500 hover:text-white transition-all active:scale-90">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory px-4">
        {hotLeads.map((lead) => (
          <div
            key={lead.id}
            onClick={() => onSelect(lead)}
            className="flex-shrink-0 w-[300px] bento-card !p-8 snap-start cursor-pointer group hover:border-orange-500/50 transition-all"
          >
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-black bg-orange-500/10 text-orange-500 border border-orange-500/20 px-2 py-0.5 rounded">ALPHA_PRIORITY</span>
              <Zap size={14} className="text-slate-700 group-hover:text-orange-500 transition-colors" />
            </div>
            <h3 className="text-xl font-black text-white tracking-tighter mb-1 italic truncate uppercase">{lead.address}</h3>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">{lead.type}</p>
            <p className="text-2xl font-black text-emerald-400 tabular-nums">{formatCurrency(lead.value)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}