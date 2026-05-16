import { create } from 'zustand';
import { Lead, LeadStatus } from '../types/permit';
import { MOCK_LEADS } from '../lib/mockData';

interface RadarStore {
  leads: Lead[];
  filterCity: string | null;
  addLiveLead: (lead: Lead) => void;
  updateLeadStatus: (id: number, newStatus: LeadStatus) => void;
  setCityFilter: (city: string | null) => void;
}

export const useRadarStore = create<RadarStore>((set) => ({
  leads: [...MOCK_LEADS],
  filterCity: null,

  addLiveLead: (newLead) =>
    set((state) => ({
      leads: [newLead, ...state.leads],
    })),

  updateLeadStatus: (id, newStatus) =>
    set((state) => ({
      leads: state.leads.map((lead) =>
        lead.id === id ? { ...lead, status: newStatus } : lead
      ),
    })),

  setCityFilter: (city) => set({ filterCity: city }),
}));