import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface IslandProgress {
  id: string;
  status: 'completed' | 'uncompleted' | 'locked';
  section: 'variables' | 'functions';
}

interface ProgressContextType {
  islandProgress: IslandProgress[];
  unlockNextIsland: (currentIslandId: string) => void;
  completeIsland: (islandId: string) => void;
  getIslandStatus: (islandId: string) => 'completed' | 'uncompleted' | 'locked';
  getCurrentSection: () => 'variables' | 'functions';
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

interface ProgressProviderProps {
  children: ReactNode;
}

export function ProgressProvider({ children }: ProgressProviderProps) {
  // Estado inicial com duas seções: variáveis e funções
  const [islandProgress, setIslandProgress] = useState<IslandProgress[]>([
    // Seção Variáveis
    { id: 'ilha-1', status: 'uncompleted', section: 'variables' },
    { id: 'ilha-2', status: 'locked', section: 'variables' },
    { id: 'ilha-3', status: 'locked', section: 'variables' },
    { id: 'ilha-4', status: 'locked', section: 'variables' },
    { id: 'ilha-5', status: 'locked', section: 'variables' },
    { id: 'ilha-6', status: 'locked', section: 'variables' },
    { id: 'ilha-7', status: 'locked', section: 'variables' },
    // Seção Funções
    { id: 'funcao-1', status: 'locked', section: 'functions' },
    { id: 'funcao-2', status: 'locked', section: 'functions' },
    { id: 'funcao-3', status: 'locked', section: 'functions' },
    { id: 'funcao-4', status: 'locked', section: 'functions' },
    { id: 'funcao-5', status: 'locked', section: 'functions' },
    { id: 'funcao-6', status: 'locked', section: 'functions' },
  ]);

  const unlockNextIsland = (currentIslandId: string) => {
    setIslandProgress(prev => {
      const currentIndex = prev.findIndex(island => island.id === currentIslandId);
      if (currentIndex === -1) return prev;

      const newProgress = [...prev];
      // Marca a ilha atual como completada
      newProgress[currentIndex] = { ...newProgress[currentIndex], status: 'completed' };
      
      // Se não for a última ilha da seção atual, desbloqueia a próxima
      if (currentIndex < prev.length - 1) {
        newProgress[currentIndex + 1] = { ...newProgress[currentIndex + 1], status: 'uncompleted' };
      }

      // Se completou a última ilha de variáveis, desbloqueia a primeira ilha de funções
      if (currentIslandId === 'ilha-7') {
        const firstFunctionIndex = prev.findIndex(island => island.id === 'funcao-1');
        if (firstFunctionIndex !== -1) {
          newProgress[firstFunctionIndex] = { ...newProgress[firstFunctionIndex], status: 'uncompleted' };
        }
      }

      return newProgress;
    });
  };

  const completeIsland = (islandId: string) => {
    setIslandProgress(prev => 
      prev.map(island => 
        island.id === islandId 
          ? { ...island, status: 'completed' }
          : island
      )
    );
  };

  const getIslandStatus = (islandId: string): 'completed' | 'uncompleted' | 'locked' => {
    const island = islandProgress.find(island => island.id === islandId);
    return island?.status || 'locked';
  };

  const getCurrentSection = (): 'variables' | 'functions' => {
    // Determina a seção atual baseada no progresso
    const variablesCompleted = islandProgress
      .filter(island => island.section === 'variables')
      .every(island => island.status === 'completed');
    
    if (variablesCompleted) {
      return 'functions';
    }
    return 'variables';
  };

  return (
    <ProgressContext.Provider value={{
      islandProgress,
      unlockNextIsland,
      completeIsland,
      getIslandStatus,
      getCurrentSection,
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
} 