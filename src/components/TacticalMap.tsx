import React from 'react';
import { MapPin, Crosshair, Target, ShieldCheck } from 'lucide-react';
import { MOCK_LEADS } from '../lib/mockData';
import { Lead } from '../types/permit';

export default function TacticalMap({ onSelect }: { onSelect: (p: Lead) => void }) {
  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-700">
      <div className="flex justify-between items-center px-2">
        <div className="space-y-1">
            <h3 className="text-2xl font-black tracking-tighter text-white uppercase italic">Sector: Maricopa Central</h3>
            <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">Geospatial Signal Analysis</p>
        </div>
        <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-orange-500 bg-orange-500/5 px-4 py-2 rounded-xl border border-orange-500/10">
          <Crosshair size={16} className="animate-spin-slow" /> ACTIVE_SATELLITE_LINK
        </div>
      </div>

      <div className="relative h-[640px] bg-white/[0.01] border border-white/5 rounded-[3rem] overflow-hidden flex items-center justify-center">
        {/* Radar Scanning Effect */}
        <div className="radar-beam opacity-30"></div>
        
        {/* Fake Grid Background */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        {/* Lead Pins */}
        {MOCK_LEADS.slice(0, 8).map((lead, i) => (
          <button
            key={lead.id}
            onClick={() => onSelect(lead)}
            className="absolute cursor-pointer group z-20"
            style={{
              left: `${25 + (i % 4) * 16}%`,
              top: `${20 + Math.floor(i / 4) * 35}%`,
            }}
          >
            <div className="relative flex flex-col items-center">
              <div className="absolute -inset-4 bg-orange-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <MapPin 
                size={38} 
                className={`drop-shadow-2xl transition-all group-hover:scale-125 group-hover:-translate-y-1 ${lead.score === 'HOT' ? 'text-orange-500' : 'text-blue-500'}`} 
              />
              <div className="bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-black px-3 py-1 rounded-full mt-2 opacity-0 group-hover:opacity-100 transition-all uppercase tracking-widest text-white whitespace-nowrap">
                {lead.address.split(',')[0]}
              </div>
            </div>
          </button>
        ))}

        {/* Central Hub UI */}
        <div className="absolute bottom-10 left-10 p-6 glass-card !rounded-2xl border-white/10 space-y-2">
            <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Grid Stability: 99.8%</span>
            </div>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest italic">Encrypted Connection Secure</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {['Phoenix', 'Scottsdale', 'Mesa', 'Tempe'].map(city => (
          <div key={city} className="bento-card !p-8 group">
            <div className="text-orange-500 font-black text-2xl italic tracking-tighter group-hover:scale-110 transition-transform">
                {city === 'Phoenix' ? '42%' : city === 'Scottsdale' ? '28%' : '15%'}
            </div>
            <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">{city} Density</div>
          </div>
        ))}
      </div>
    </div>
  );
}