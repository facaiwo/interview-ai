import type { ReactNode } from 'react';

export interface Candidate {
  id: string;
  name: string;
  avatar?: string;
  position?: string;
  company?: string;
  contact: {
    email: string;
    phone: string;
  };
  skills: string[];
  resume: string;
  evaluations: Evaluation[];
}

export interface Application {
  id: string;
  companyName: string;
  position: string;
  applyDate: string;
  status: string;
  latestProgress: string;
}

export interface Evaluation {
  id: string;
  date: string;
  content: string;
  type: 'interview' | 'summary' | 'key_points' | 'follow_up';
}

export interface ConversationType {
  key: string;
  label: string;
  group: string;
  date: string;
  candidateName?: string;
  duration?: string;
}

export interface MessageType {
  role: 'user' | 'assistant';
  content: string | ReactNode;
  timestamp: string;
} 