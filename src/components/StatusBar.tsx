import React, { useState, useEffect } from 'react';

export default function StatusBar() {
  const [id, setId] = useState(8821);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
        setId(prev => prev + 1);
        setTime(new Date());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = new Intl.DateTimeFormat('en-US', { 
    month: '2-digit', day: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  }).format(time);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-8 border-t border-white/5 bg-black/80 backdrop-blur-md flex items-center justify-between px-10 z-[100]">
      <div className="flex gap-8">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></div>
          <span className="terminal-text text-emerald-500 font-bold tracking-widest text-[9px]">SYSTEM_OPERATIONAL</span>
        </div>
        <span className="terminal-text text-slate-500 text-[9px]">Node: <span className="text-slate-300">AZ-PHX-MUNI-01</span></span>
        <span className="terminal-text text-slate-500 text-[9px]">Scan_ID: <span className="text-orange-500">RADR-{id}-X</span></span>
      </div>
      <div className="flex gap-4">
        <span className="terminal-text text-slate-500 text-[9px]">Latency: 12ms</span>
        <span className="terminal-text text-white font-bold text-[9px] uppercase tabular-nums">{formattedDate}</span>
      </div>
    </div>
  );
}