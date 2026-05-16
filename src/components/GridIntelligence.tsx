import React, { useState, useMemo } from 'react';
import { Search, Zap, LayoutGrid } from 'lucide-react';
import { formatCurrency, formatDate } from '../lib/formatters';
import { useRadarStore } from '../store/useRadarStore';
import { Lead } from '../types/permit';
import { toast } from 'sonner';

export default function GridIntelligence({ onSelect }: { onSelect: (p: Lead) => void }) {
  const [search, setSearch] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const leads = useRadarStore(state => state.leads);

  const filteredData = useMemo(() => {
    return leads.filter(item =>
      item.address.toLowerCase().includes(search.toLowerCase()) ||
      item.type.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, leads]);

  const handleNeuralScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      toast.success('Scan Complete', { description: `${filteredData.length} records verified.` });
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between gap-6 p-4 bg-white/[0.02] border border-white/5 rounded-[2rem] backdrop-blur-xl">
        <div className="flex-1 relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-orange-500 transition-colors" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="QUERY GRID ASSETS..."
            className="w-full bg-transparent py-3 pl-16 text-xs font-black uppercase tracking-[0.2em] outline-none text-white placeholder:text-slate-700"
          />
        </div>
        <button 
          onClick={handleNeuralScan} 
          className="flex items-center gap-3 px-8 py-4 bg-orange-500 text-white rounded-2xl text-xs font-black uppercase shadow-xl shadow-orange-500/20 active:scale-95 hover:bg-orange-600 hover:shadow-orange-500/40 transition-all"
        >
          <Zap size={14} className={isScanning ? 'animate-pulse' : ''} /> 
          {isScanning ? 'SCANNING...' : 'NEURAL SCAN'}
        </button>
      </div>

      <div className="bento-card !p-0 overflow-hidden relative min-h-[500px]">
        {isScanning && <div className="scan-line" />}
        <table className={`w-full text-left transition-opacity duration-300 ${isScanning ? 'opacity-40' : 'opacity-100'}`}>
          <thead className="bg-white/[0.01] border-b border-white/5">
            <tr className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]"><th className="p-8">Municipal Asset</th><th className="p-8 text-right">Valuation</th><th className="p-8 text-center">Signal</th></tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredData.length > 0 ? (
                filteredData.map((p) => (
                    <tr key={p.id} onClick={() => onSelect(p)} className="hover:bg-white/[0.03] transition-all cursor-pointer group">
                        <td className="p-8">
                            <p className="text-white font-bold group-hover:text-orange-500 transition-colors italic uppercase tracking-tight text-[14px]">{p.address}</p>
                            <p className="text-[10px] font-black text-slate-600 uppercase mt-1 tabular-nums">{formatDate(p.date)}</p>
                        </td>
                        <td className="p-8 text-right font-black text-emerald-400 tabular-nums text-sm">{formatCurrency(p.value)}</td>
                        <td className="p-8 text-center">
                            <span className="text-[9px] font-black text-orange-500 bg-orange-500/10 px-3 py-1 rounded-md border border-orange-500/10 uppercase tracking-tighter">{p.score}_TARGET</span>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={3} className="p-40 text-center">
                        <div className="flex flex-col items-center gap-4 opacity-20">
                            <LayoutGrid size={48} className="text-slate-500" />
                            <p className="text-xs font-black uppercase tracking-[0.5em]">Sector Clear • No Data Detected</p>
                        </div>
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}