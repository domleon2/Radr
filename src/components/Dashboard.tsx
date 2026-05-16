import React, { useMemo } from 'react';
import { DollarSign, Zap, Target, ShieldCheck } from 'lucide-react';
import { useRadarStore } from '../store/useRadarStore';
import { formatCurrency } from '../lib/formatters';
import PermitChart from './PermitChart';
import SignalFeed from './SignalFeed';
import CategoryBreakdown from './CategoryBreakdown';
import DashboardLeadFeed from './DashboardLeadFeed';
import MarketHeatmap from './MarketHeatmap';
import HotLeadCarousel from './HotLeadCarousel';

export default function Dashboard({ onSelect }: { onSelect: (p: any) => void }) {
  const leads = useRadarStore(state => state.leads);

  const stats = useMemo(() => {
    const totalValue = leads.reduce((acc, curr) => acc + curr.value, 0);
    const hotLeads = leads.filter(l => l.score === 'HOT').length;
    return {
      value: formatCurrency(totalValue),
      count: leads.length,
      hot: hotLeads
    };
  }, [leads]);

  return (
    <div className="space-y-16 pb-32">
      <HotLeadCarousel onSelect={onSelect} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 bento-card relative overflow-hidden group !p-12">
           <div className="radar-beam opacity-40"></div>
           <div className="flex items-center justify-between mb-12 relative z-10">
              <div>
                <h3 className="text-white font-black text-2xl tracking-tight italic uppercase">Market Velocity</h3>
                <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">Real-time {stats.count} Asset Analysis</p>
              </div>
           </div>
           <PermitChart />
        </div>
        <div className="space-y-8">
            <div className="bento-card !p-8"><MarketHeatmap /></div>
            <div className="bento-card !p-8"><CategoryBreakdown /></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
             <DashboardLeadFeed onSelect={onSelect} />
          </div>
          <div className="space-y-8">
            <StatItem label="Contract Value" value={stats.value} icon={<DollarSign className="text-emerald-500" />} />
            <StatItem label="Signal Density" value={stats.hot} icon={<Zap className="text-orange-500" />} />
            <div className="bento-card !p-8"><SignalFeed /></div>
          </div>
      </div>
    </div>
  );
}

function StatItem({ label, value, icon }: any) {
  return (
    <div className="bento-card !p-8 group flex justify-between items-center">
       <div>
           <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.4em] mb-1">{label}</p>
           <h4 className="text-3xl font-black text-white tracking-tighter italic">{value}</h4>
       </div>
       <div className="bg-white/5 p-4 rounded-2xl border border-white/5 group-hover:rotate-12 transition-transform">{icon}</div>
    </div>
  )
}