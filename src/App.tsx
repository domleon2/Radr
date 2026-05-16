import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, FileText, Target, Zap, Search, Settings, MapPin } from 'lucide-react';
import { Toaster, toast } from 'sonner';

// Types and Store
import { Lead, PageMetadata } from './types/permit';
import { useRadarStore } from './store/useRadarStore';

// Components
import Dashboard from './components/Dashboard';
import GridIntelligence from './components/GridIntelligence';
import PipelineView from './components/PipelineView';
import IntelligenceReports from './components/IntelligenceReports';
import TacticalMap from './components/TacticalMap';
import NotificationSettings from './components/NotificationSettings';
import LeadDrawer from './components/LeadDrawer';
import SessionMonitor from './components/SessionMonitor';
import StatusBar from './components/StatusBar';
import CommandPalette from './components/CommandPalette';
import RuleModal from './components/RuleModal';

interface NavItemProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isRuleOpen, setIsRuleOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Simulation Engine from Store
  const addLiveLead = useRadarStore(state => state.addLiveLead);

  useEffect(() => {
        const interval = setInterval(() => {
      const id = Math.floor(Math.random() * 1000) + 500;
      const cities = ['Phoenix', 'Scottsdale', 'Mesa', 'Tempe', 'Gilbert'];
      const types = ['Roof Replacement', 'Solar Installation', 'Pool / Spa', 'New Home Construction'];
      const newLead: Lead = {
        id,
        address: `${Math.floor(Math.random() * 8000 + 1000)} N ${cities[Math.floor(Math.random()*cities.length)]} Dr`,
        value: Math.floor(Math.random() * 1500000) + 80000,
        type: types[Math.floor(Math.random()*types.length)],
        score: Math.random() > 0.5 ? 'HOT' : 'WARM',
        date: 'JUST NOW',
        status: 'New',
        trend: 'up'
      };
      addLiveLead(newLead);
      toast.info('Satellite Intercept', { 
        description: `Incoming Lead: ${newLead.address.split(' N ')[0]} ${newLead.type}`,
        icon: <Zap size={14} className="text-orange-500 shadow-[0_0_8px_#f97316]" />
      });
    }, 35000); // New lead every 40 seconds
    return () => clearInterval(interval);
  }, [addLiveLead]);

  const PAGE_MAP: Record<string, PageMetadata> = {
    dashboard: { title: 'Intelligence', sub: 'Uplink Established', protocol: 'SYS: ANALYTICS' },
    map: { title: 'Tactical Map', sub: 'Geospatial Signal Intelligence', protocol: 'SYS: GEO_SCAN' },
    permits: { title: 'Municipal Grid', sub: 'Satellite Registry Live', protocol: 'SYS: GRID_SCAN' },
    pipeline: { title: 'Pipeline', sub: 'Workflow Engine', protocol: 'SYS: CRM_CORE' },
    reports: { title: 'System Rules', sub: 'Neural Automations', protocol: 'SYS: LOGIC_AUTO' },
  };

  return (
    <div className="flex h-screen w-screen bg-[#020205] text-slate-200 overflow-hidden">
      <div className="glow-mesh"></div>
      <Toaster theme="dark" position="top-center" richColors />
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
      <RuleModal isOpen={isRuleOpen} onClose={() => setIsRuleOpen(false)} />

      {/* SIDEBAR */}
      <aside className="w-64 hidden md:flex flex-col h-full z-20 p-5 shrink-0">
        <div className="h-full bg-white/[0.02] border border-white/5 rounded-[2.5rem] backdrop-blur-3xl flex flex-col overflow-hidden">
            <div className="p-8 text-center">
               <span className="text-3xl font-black text-white italic tracking-tighter border-b-2 border-orange-500 pb-1">RADR</span>
            </div>
            <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto no-scrollbar">
              <NavItem active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<LayoutDashboard size={22} />} label="Intelligence" />
              <NavItem active={activeTab === 'map'} onClick={() => setActiveTab('map')} icon={<MapPin size={22} />} label="Tactical Map" />
              <NavItem active={activeTab === 'permits'} onClick={() => setActiveTab('permits')} icon={<FileText size={22} />} label="Grid" />
              <NavItem active={activeTab === 'pipeline'} onClick={() => setActiveTab('pipeline')} icon={<Target size={22} />} label="Pipeline" />
              <NavItem active={activeTab === 'reports'} onClick={() => setActiveTab('reports')} icon={<Zap size={22} />} label="Rules" />
            </nav>
            <div className="p-5 mt-auto"><SessionMonitor /></div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col min-w-0 h-full relative">
        <header className="h-20 flex items-center justify-between px-12 shrink-0 z-50">
          <motion.div 
            whileHover={{ width: '500px', borderColor: 'rgba(249,115,22,0.3)' }}
            onClick={() => setIsCommandOpen(true)} 
            className="flex items-center gap-4 px-5 py-2.5 bg-white/5 border border-white/5 rounded-2xl cursor-pointer transition-all w-[420px] backdrop-blur-xl group"
          >
            <Search className="text-slate-600 group-hover:text-orange-500 transition-colors" size={18} />
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
              Ask RADR <span className="text-slate-600 group-hover:text-slate-400 transition-colors">for leads or commands...</span>
            </span>
          </motion.div>

          <div className="flex items-center gap-6">
            <button onClick={() => setIsSettingsOpen(true)} className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 text-slate-500 hover:text-white transition-all"><Settings size={20} /></button>
            <div className="flex items-center gap-4 border-l border-white/10 pl-6">
                <div className="text-right hidden lg:block uppercase">
                    <p className="text-[10px] font-black text-white italic tracking-widest leading-none">D. Lemaster</p>
                    <p className="text-[8px] font-black text-orange-500 tracking-[0.2em] mt-1.5 flex items-center justify-end gap-1.5"><div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse"></div> PRO ACCESS</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-orange-600 to-orange-400 p-[1.5px]"><div className="h-full w-full rounded-full bg-[#0d1117] flex items-center justify-center border border-white/10 text-xs font-black">D</div></div>
            </div>
          </div>
        </header>

        <div className="main-canvas p-12 max-w-[1750px] mx-auto w-full no-scrollbar pb-32">
  
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.35 }}>
              <div className="mb-16 px-4">
                 <h2 className="text-7xl font-black tracking-tighter text-white mb-2 italic uppercase">{PAGE_MAP[activeTab].title}</h2>
                 <div className="flex gap-4 items-center">
                    <span className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em]">{PAGE_MAP[activeTab].sub}</span>
                    <div className="h-1 w-1 bg-white/10 rounded-full"></div>
                    <span className="text-orange-500/50 text-[10px] font-black uppercase tracking-[0.4em]">{PAGE_MAP[activeTab].protocol}</span>
                 </div>
              </div>
              
              {activeTab === 'dashboard' ? <Dashboard onSelect={setSelectedLead} /> : 
               activeTab === 'map' ? <TacticalMap onSelect={setSelectedLead} /> : 
               activeTab === 'permits' ? <GridIntelligence onSelect={setSelectedLead} /> : 
               activeTab === 'pipeline' ? <PipelineView onSelect={setSelectedLead} /> : 
               <IntelligenceReports onCreate={() => setIsRuleOpen(true)} />}
            </motion.div>
          </AnimatePresence>
        </div>
        <StatusBar />
      </main>

      <NotificationSettings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <LeadDrawer lead={selectedLead} onClose={() => setSelectedLead(null)} />
    </div>
  );
}

function NavItem({ active, onClick, icon, label }: NavItemProps) {
  return (
    <button onClick={onClick} className={`flex items-center gap-4 w-full px-5 py-4 rounded-[1.25rem] transition-all duration-300 group ${active ? 'bg-orange-500 text-white shadow-[0_15px_30px_-10px_rgba(249,115,22,0.5)] scale-[1.015]' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}>
      <div className={`${active ? 'text-white' : 'text-slate-600 group-hover:text-orange-500'} transition-colors`}>{icon}</div>
      <span className="text-[11px] font-bold uppercase tracking-[0.15em]">{label}</span>
    </button>
  );
}