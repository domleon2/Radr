import React from 'react';

const CITIES = [
  { name: 'Phoenix', leads: 450, growth: '+12%', color: 'bg-orange-500' },
  { name: 'Scottsdale', leads: 320, growth: '+8%', color: 'bg-blue-500' },
  { name: 'Mesa', leads: 280, growth: '-2%', color: 'bg-purple-500' },
  { name: 'Tempe', leads: 190, growth: '+15%', color: 'bg-emerald-500' },
  { name: 'Gilbert', leads: 150, growth: '+5%', color: 'bg-amber-500' },
];

export default function CityLeaderboard() {
  return (
    <div className="glass-card rounded-3xl p-8 h-full">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-white font-bold tracking-tight">Market Distribution</h3>
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">By City</span>
      </div>
      <div className="space-y-6">
        {CITIES.map((city, i) => (
          <div key={i} className="group">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{city.name}</span>
              <span className="text-[10px] font-black text-slate-500 uppercase">{city.leads} leads</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className={`h-full ${city.color} rounded-full transition-all duration-1000`} 
                style={{ width: `${(city.leads / 500) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}