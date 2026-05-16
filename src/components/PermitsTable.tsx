import React from 'react';
import { formatCurrency, formatDate } from '../lib/formatters';

const MOCK_PERMITS = [
  { id: 1, address: '123 Camelback Rd, Phoenix', type: 'New Residential', value: 450000, score: 'HOT', date: '2026-05-15' },
  { id: 2, address: '888 Scottsdale Blvd', type: 'Commercial', value: 1200000, score: 'HOT', date: '2026-05-14' },
  { id: 3, address: '45 N Gilbert Rd, Mesa', type: 'Pool / Solar', value: 45000, score: 'WARM', date: '2026-05-14' },
  { id: 4, address: '77 West University, Tempe', type: 'Remodel', value: 12000, score: 'GOOD', date: '2026-05-13' },
];

export default function PermitsTable({ onSelect }: { onSelect: (p: any) => void }) {
  return (
    <div className="glass-card rounded-3xl overflow-hidden">
      <div className="p-8 border-b border-white/5 flex justify-between items-center">
        <h3 className="font-bold text-white tracking-tight">Recent Arizona Permits</h3>
        <div className="flex gap-2">
          <button className="text-[10px] font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition text-slate-400">Export CSV</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/[0.02] text-slate-500">
            <tr>
              <th className="px-8 py-5 font-bold uppercase tracking-widest text-[10px]">Address</th>
              <th className="px-8 py-5 font-bold uppercase tracking-widest text-[10px]">Type</th>
              <th className="px-8 py-5 font-bold uppercase tracking-widest text-[10px] text-right">Value</th>
              <th className="px-8 py-5 font-bold uppercase tracking-widest text-[10px]">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {MOCK_PERMITS.map((p) => (
              <tr 
                key={p.id} 
                onClick={() => onSelect(p)}
                className="hover:bg-white/[0.03] transition-all cursor-pointer group"
              >
                <td className="px-8 py-6 font-bold text-white group-hover:text-orange-500 transition-colors">{p.address}</td>
                <td className="px-8 py-6 text-slate-400 font-medium">{p.type}</td>
                <td className="px-8 py-6 text-right font-mono text-emerald-400 font-bold">{formatCurrency(p.value)}</td>
                <td className="px-8 py-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest border ${
                    p.score === 'HOT' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : 
                    p.score === 'WARM' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 
                    'bg-blue-500/10 text-blue-500 border-blue-500/20'
                  }`}>
                    {p.score}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}