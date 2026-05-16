import React from 'react';
import { X, Globe, Zap, Bell } from 'lucide-react';
import { UIModalProps } from '../types/permit';

export default function NotificationSettings({ isOpen, onClose }: UIModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#1e293b] border border-slate-700 w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-700/50 flex justify-between items-center bg-[#1e293b]">
          <h2 className="font-black text-white text-[10px] uppercase tracking-[0.3em] flex items-center gap-3">
            <Bell size={18} className="text-orange-500" /> System Operations
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-2 transition"><X size={20} /></button>
        </div>

        <div className="p-8 space-y-8">
          <div className="space-y-3">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Webhook Intelligence Link</label>
            <input type="text" placeholder="https://hooks.slack.com/..." className="w-full bg-[#0f172a] border border-slate-700 rounded-2xl px-5 py-4 text-xs focus:outline-none focus:border-orange-500 transition-colors" />
          </div>

          <div className="flex items-center justify-between p-6 bg-[#0f172a] rounded-[2rem] border border-slate-700/50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500"><Zap size={20} /></div>
              <div>
                <p className="text-xs font-bold text-white uppercase">Daily Auto-Import</p>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tight">Sync Municipal Archives</p>
              </div>
            </div>
            <div className="w-12 h-6 bg-orange-500 rounded-full relative cursor-pointer shadow-lg shadow-orange-500/20">
               <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-800/30 flex justify-end gap-4 border-t border-slate-700/50">
          <button onClick={onClose} className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-white transition">Cancel</button>
          <button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-orange-500/20 transition-all">Save Config</button>
        </div>
      </div>
    </div>
  );
}