import React from 'react';
import { toast } from 'sonner';
import { MOCK_SIGNALS } from '../lib/mockData';

export default function SignalFeed() {
  const intercept = (signal: any) => {
    toast.success('Signal Intercepted', {
      description: signal.msg,
      action: {
        label: 'Track Lead',
        onClick: () => toast.info('Opening target in Grid Intelligence...'),
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-1">
        <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
          LIVE LOGIC STREAM
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_#ef4444]" />
        </h4>
        <span className="text-[10px] text-emerald-500 font-mono tracking-tighter">ONLINE</span>
      </div>

      <div className="space-y-3">
        {MOCK_SIGNALS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => intercept(s)}
            className="w-full flex gap-4 p-4 rounded-2xl hover:bg-white/5 group transition-all text-left border-l-2 border-transparent hover:border-orange-500 relative overflow-hidden"
          >
            <div className="flex flex-col items-center pt-1 z-10">
              <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]' : 'bg-emerald-500/40'}`} />
              <div className="w-[1px] h-10 bg-white/10 mt-1 group-hover:bg-orange-500/50 transition-colors" />
            </div>

            <div className="flex-1 z-10">
              <p className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors leading-tight italic uppercase tracking-tight">
                {s.msg}
              </p>
              <p className="text-[10px] font-black text-slate-500 mt-2 uppercase tracking-widest">
                {s.city} <span className="opacity-30">•</span> {s.time}
              </p>
            </div>

            <div className="text-[9px] font-black self-center px-3 py-1 rounded-full border border-white/10 text-slate-500 group-hover:text-white transition-colors bg-white/5">
              {s.score}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}