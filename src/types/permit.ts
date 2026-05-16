import React from 'react';

export type LeadScore = 'HOT' | 'WARM' | 'GOOD';
export type LeadStatus = 'New' | 'Contacted' | 'Won' | 'Lost';

export interface Lead {
  id: number;
  address: string;
  value: number;
  type: string;
  score: LeadScore;
  date: string;
  status: LeadStatus;
  trend?: 'up' | 'down';
}

export interface Signal {
  id: string;
  time: string;
  msg: string;
  city: string;
  score: string;
}

export interface PageMetadata {
  title: string;
  sub: string;
  protocol: string;
}