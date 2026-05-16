import React from 'react';
import { Activity } from 'lucide-react';

export default function SessionMonitor() {
  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Activity size={14} className="text-orange-500" />
        <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Session Monitor</span>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-end">
            <span className="text-[9px] font-bold text-slate-500 uppercase">Leads Analyzed</span>
            <span className="text-xs font-black text-blue-500 tabular-nums">142</span>
        </div>
        <div className="flex justify-between items-end">
            <span className="text-[9px] font-bold text-slate-500 uppercase">High Priority</span>
            <span className="text-xs font-black text-orange-500 tabular-nums">12</span>
        </div>
        <div className="flex justify-between items-end">
            <span className="text-[9px] font-bold text-slate-500 uppercase">System Health</span>
            <span className="text-xs font-black text-emerald-500 tabular-nums">98%</span>
        </div>
      </div>
      <div className="pt-2">
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 w-[65%] animate-pulse"></div>
        </div>
        <p className="text-[8px] font-bold text-slate-600 uppercase mt-2 tracking-widest text-center">Syncing Live Municipal Feed...</p>
      </div>
    </div>
  );
}