import React, { createContext, useContext, useState } from 'react';
import { Vulnerability, TeamMember, AIMessage } from '@shared/schema';

interface AppContextType {
  vulnerabilities: Vulnerability[];
  setVulnerabilities: React.Dispatch<React.SetStateAction<Vulnerability[]>>;
  teamMembers: TeamMember[];
  setTeamMembers: React.Dispatch<React.SetStateAction<TeamMember[]>>;
  aiMessages: AIMessage[];
  setAIMessages: React.Dispatch<React.SetStateAction<AIMessage[]>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: any;
  setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [aiMessages, setAIMessages] = useState<AIMessage[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <AppContext.Provider value={{
      vulnerabilities,
      setVulnerabilities,
      teamMembers,
      setTeamMembers,
      aiMessages,
      setAIMessages,
      isAuthenticated,
      setIsAuthenticated,
      currentUser,
      setCurrentUser
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
