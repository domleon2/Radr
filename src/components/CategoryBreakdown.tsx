import React from 'react';

const CATEGORIES = [
  { name: 'New Residential', percent: 45, color: 'bg-orange-500' },
  { name: 'Commercial Reno', percent: 25, color: 'bg-blue-500' },
  { name: 'Solar/Green', percent: 20, color: 'bg-emerald-500' },
  { name: 'Pool/Exterior', percent: 10, color: 'bg-zinc-500' },
];

export default function CategoryBreakdown() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Project Alpha Distribution</h4>
      </div>
      <div className="flex h-3 w-full gap-1 rounded-full overflow-hidden">
        {CATEGORIES.map((c, i) => (
          <div key={i} className={`${c.color} h-full transition-all duration-1000`} style={{ width: `${c.percent}%` }}></div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-y-3">
        {CATEGORIES.map((c, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${c.color}`}></div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">{c.name} <span className="text-white">{c.percent}%</span></span>
          </div>
        ))}
      </div>
    </div>
  );
}