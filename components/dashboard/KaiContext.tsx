'use client'

import { createContext, useContext, useState, ReactNode } from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'kai';
  content: string;
  timestamp: Date;
}

interface KaiContextType {
  isOpen: boolean;
  togglePanel: () => void;
  openPanel: () => void;
  closePanel: () => void;
  messages: ChatMessage[];
  addMessage: (role: 'user' | 'kai', content: string) => void;
}

const KaiContext = createContext<KaiContextType | undefined>(undefined);

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'kai',
    content:
      "Hi! I'm Kai — your privacy orchestrator.\n\nI can help summarize assessments, create ROPA entries, explain PDPL requirements, and guide you through workflows.",
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: '2',
    role: 'user',
    content: 'What does PDPL Article 30 require?',
    timestamp: new Date(Date.now() - 3300000),
  },
  {
    id: '3',
    role: 'kai',
    content:
      'PDPL Article 30 requires organizations to maintain accurate and up-to-date records of processing activities (ROPA). This includes data categories, purposes, recipients, transfers, and retention periods.',
    timestamp: new Date(Date.now() - 3000000),
  },
  {
    id: '4',
    role: 'user',
    content: 'Generate a draft ROPA entry for HR onboarding.',
    timestamp: new Date(Date.now() - 2700000),
  },
  {
    id: '5',
    role: 'kai',
    content:
      "Here's a draft ROPA entry:\n\n• Purpose: Employee onboarding\n• Data Subjects: Employees\n• Data Types: Identification, contact, background check\n• Legal Basis: Contractual necessity\n• Retention: 7 years\n\nWould you like to save this into ROPA?",
    timestamp: new Date(Date.now() - 2400000),
  },
  {
    id: '6',
    role: 'user',
    content: 'What are common consent gaps under PDPL?',
    timestamp: new Date(Date.now() - 2100000),
  },
  {
    id: '7',
    role: 'kai',
    content:
      'Common gaps include bundled consent in T&Cs, missing opt-out mechanisms, and lack of consent withdrawal workflows.',
    timestamp: new Date(Date.now() - 1800000),
  },
];

// Helper to get initial panel state from localStorage
const getInitialPanelState = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const stored = localStorage.getItem('kaitaki_kai_panel_open');
    return stored === 'true';
  } catch (e) {
    return false;
  }
};

export function KaiProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(getInitialPanelState);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const togglePanel = () => {
    setIsOpen((prev) => {
      const newState = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('kaitaki_kai_panel_open', String(newState));
      }
      return newState;
    });
  };

  const openPanel = () => {
    setIsOpen(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kaitaki_kai_panel_open', 'true');
    }
  };

  const closePanel = () => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kaitaki_kai_panel_open', 'false');
    }
  };

  const addMessage = (role: 'user' | 'kai', content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);

    // Add placeholder response from Kai after user message
    if (role === 'user') {
      setTimeout(() => {
        const kaiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'kai',
          content: 'I understand your question. This is a placeholder response. Full AI capabilities coming soon.',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, kaiResponse]);
      }, 500);
    }
  };

  return (
    <KaiContext.Provider
      value={{
        isOpen,
        togglePanel,
        openPanel,
        closePanel,
        messages,
        addMessage,
      }}
    >
      {children}
    </KaiContext.Provider>
  );
}

export function useKai() {
  const context = useContext(KaiContext);
  if (context === undefined) {
    throw new Error('useKai must be used within a KaiProvider');
  }
  return context;
}

