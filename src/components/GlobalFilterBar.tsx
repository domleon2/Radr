import React from 'react';
import { Search, X } from 'lucide-react';
import { useRadarStore } from '../store/useRadarStore';

export default function GlobalFilterBar() {
  const { filterCity, setCityFilter } = useRadarStore();

  const cities = ['Phoenix', 'Scottsdale', 'Mesa', 'Tempe', 'Gilbert'];

  return (
    <div className="mb-10 bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex flex-wrap items-center gap-4">
      <div className="flex-1 relative min-w-[260px]">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
        <input
          type="text"
          placeholder="Search addresses or types..."
          className="w-full bg-transparent border border-white/10 pl-12 py-3.5 rounded-2xl text-sm focus:border-orange-500 outline-none placeholder:text-slate-600"
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        {cities.map(city => (
          <button
            key={city}
            onClick={() => setCityFilter(filterCity === city ? null : city)}
            className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
              filterCity === city 
                ? 'bg-orange-500 text-white shadow-lg' 
                : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white'
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {filterCity && (
        <button
          onClick={() => setCityFilter(null)}
          className="px-5 py-3 text-xs font-black text-slate-400 hover:text-white flex items-center gap-2 transition-all"
        >
          <X size={16} /> Clear
        </button>
      )}
    </div>
  );
}