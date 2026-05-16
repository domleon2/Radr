import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', permits: 120 },
  { name: 'Tue', permits: 210 },
  { name: 'Wed', permits: 180 },
  { name: 'Thu', permits: 340 },
  { name: 'Fri', permits: 290 },
  { name: 'Sat', permits: 410 },
  { name: 'Sun', permits: 380 },
];

export default function PermitChart() {
  return (
    <div className="h-[350px] w-full mt-8">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPermits" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#475569" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            dy={10}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0d1117', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
            itemStyle={{ color: '#f97316' }}
          />
          <Area 
            type="monotone" 
            dataKey="permits" 
            stroke="#f97316" 
            fillOpacity={1} 
            fill="url(#colorPermits)" 
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}