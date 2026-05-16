import React from 'react';
import { Map as MapIcon, Crosshair } from 'lucide-react';
import { useRadarStore } from '../store/useRadarStore';
import { toast } from 'sonner';

const ZONES = [
  { name: 'PHX-North', value: 85, color: 'bg-orange-500' },
  { name: 'SCOTTSDALE', value: 92, color: 'bg-orange-600' },
  { name: 'MESA/EAST', value: 65, color: 'bg-slate-700' },
  { name: 'TEMPE', value: 78, color: 'bg-orange-400' },
];

export default function MarketHeatmap() {
  const { filterCity, setCityFilter } = useRadarStore();

  const handleCityClick = (city: string) => {
    const newFilter = filterCity === city ? null : city;
    setCityFilter(newFilter);
    
    if (newFilter) {
      toast.success(`Filtered to ${city}`);
    } else {
      toast.info('All zones visible');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.4em] flex items-center gap-2">
          <MapIcon size={12} /> Regional Hot Zones
        </h4>
        <Crosshair size={14} className="text-orange-500 animate-spin-slow" />
      </div>

      <div className="relative h-52 bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden p-6 flex flex-col justify-between">
        <div className="space-y-4 relative z-10">
          {ZONES.map((zone, i) => {
            const isSelected = filterCity === zone.name;
            const isFiltered = filterCity !== null;
            
            return (
              <div 
                key={i} 
                onClick={() => handleCityClick(zone.name)}
                className={`flex items-center gap-4 cursor-pointer hover:scale-[1.02] transition-all group rounded-xl p-1 -mx-1 ${
                  isSelected ? 'bg-white/10' : ''
                }`}
              >
                <span className={`text-xs font-black w-24 transition-colors ${
                  isSelected 
                    ? 'text-orange-400' 
                    : isFiltered 
                      ? 'text-slate-600' 
                      : 'text-slate-400 group-hover:text-orange-400'
                }`}>
                  {zone.name}
                </span>
                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${zone.color} rounded-full transition-all duration-300`} 
                    style={{ width: `${zone.value}%` }}
                  ></div>
                </div>
                <span className="text-xs font-black text-white w-8 text-right">{zone.value}%</span>
              </div>
            );
          })}
        </div>
        
        <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest text-center mt-4 italic">
          Click a zone to filter leads across all tabs
        </p>
      </div>
    </div>
  );
}