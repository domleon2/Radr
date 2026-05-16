import { Lead, Signal } from '../types/permit';

export const MOCK_LEADS: Lead[] = [
  { id: 101, address: '5501 N Paradise Valley Dr', value: 2400000, type: 'New Build', score: 'HOT', date: '2026-05-15', status: 'New', trend: 'up' },
  { id: 102, address: '8822 E Camelback Rd', value: 850000, type: 'Commercial', score: 'HOT', date: '2026-05-15', status: 'Contacted', trend: 'up' },
  { id: 103, address: '12 Scottsdale Quarter', value: 1100000, type: 'Retail Reno', score: 'HOT', date: '2026-05-14', status: 'New', trend: 'up' },
  { id: 104, address: '440 W University Dr', value: 650000, type: 'Solar', score: 'WARM', date: '2026-05-14', status: 'New', trend: 'down' },
  { id: 105, address: '990 S Gilbert Rd', value: 450000, type: 'Pool / Deck', score: 'WARM', date: '2026-05-13', status: 'New', trend: 'up' },
  { id: 106, address: '77 West University', value: 12000, score: 'GOOD', date: '2026-05-13', status: 'Lost', trend: 'down' },
];

export const MOCK_SIGNALS: Signal[] = [
  { id: 'S1', time: '2m ago', msg: 'New $1.2M Commercial Permit', city: 'Scottsdale', score: 'HOT' },
  { id: 'S2', time: '12m ago', msg: 'Owner Phone Number Found', city: 'Phoenix', score: 'INTEL' },
  { id: 'S3', time: '24m ago', msg: 'AI Filtered Junk Permit', city: 'Mesa', score: 'CLEAN' },
  { id: 'S4', time: '1h ago', msg: 'Solar Installation Flagged', city: 'Gilbert', score: 'WARM' },
];