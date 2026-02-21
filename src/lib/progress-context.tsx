import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type SectionType = 'clean-code' | 'variables' | 'functions' | 'comments' | 'formatting';

interface IslandProgress {
  id: string;
  status: 'completed' | 'uncompleted' | 'locked';
  section: SectionType;
}

interface ProgressContextType {
  islandProgress: IslandProgress[];
  unlockNextIsland: (currentIslandId: string) => void;
  completeIsland: (islandId: string) => void;
  getIslandStatus: (islandId: string) => 'completed' | 'uncompleted' | 'locked';
  getCurrentSection: () => SectionType;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

interface ProgressProviderProps {
  children: ReactNode;
}

export function ProgressProvider({ children }: ProgressProviderProps) {
  // Estado inicial com cinco seções: código limpo (introdução), variáveis, funções, comentários e formatação
  const [islandProgress, setIslandProgress] = useState<IslandProgress[]>([
    // Seção Código Limpo (introdução)
    { id: 'codigo-limpo-1', status: 'uncompleted', section: 'clean-code' },
    { id: 'codigo-limpo-2', status: 'locked', section: 'clean-code' },
    { id: 'codigo-limpo-3', status: 'locked', section: 'clean-code' },
    { id: 'codigo-limpo-4', status: 'locked', section: 'clean-code' },
    // Seção Variáveis (desbloqueada ao completar código limpo)
    { id: 'ilha-1', status: 'locked', section: 'variables' },
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
    // Seção Comentários
    { id: 'comentario-1', status: 'locked', section: 'comments' },
    { id: 'comentario-2', status: 'locked', section: 'comments' },
    { id: 'comentario-3', status: 'locked', section: 'comments' },
    { id: 'comentario-4', status: 'locked', section: 'comments' },
    { id: 'comentario-5', status: 'locked', section: 'comments' },
    { id: 'comentario-6', status: 'locked', section: 'comments' },
    // Seção Formatação
    { id: 'formatacao-1', status: 'locked', section: 'formatting' },
    { id: 'formatacao-2', status: 'locked', section: 'formatting' },
    { id: 'formatacao-3', status: 'locked', section: 'formatting' },
    { id: 'formatacao-4', status: 'locked', section: 'formatting' },
    { id: 'formatacao-5', status: 'locked', section: 'formatting' },
    { id: 'formatacao-6', status: 'locked', section: 'formatting' },
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

      // Se completou a última ilha de código limpo, desbloqueia a primeira ilha de variáveis
      if (currentIslandId === 'codigo-limpo-4') {
        const firstVariablesIndex = prev.findIndex(island => island.id === 'ilha-1');
        if (firstVariablesIndex !== -1) {
          newProgress[firstVariablesIndex] = { ...newProgress[firstVariablesIndex], status: 'uncompleted' };
        }
      }

      // Se completou a última ilha de variáveis, desbloqueia a primeira ilha de funções
      if (currentIslandId === 'ilha-7') {
        const firstFunctionIndex = prev.findIndex(island => island.id === 'funcao-1');
        if (firstFunctionIndex !== -1) {
          newProgress[firstFunctionIndex] = { ...newProgress[firstFunctionIndex], status: 'uncompleted' };
        }
      }

      // Se completou a última ilha de funções, desbloqueia a primeira ilha de comentários
      if (currentIslandId === 'funcao-6') {
        const firstCommentIndex = prev.findIndex(island => island.id === 'comentario-1');
        if (firstCommentIndex !== -1) {
          newProgress[firstCommentIndex] = { ...newProgress[firstCommentIndex], status: 'uncompleted' };
        }
      }

      // Se completou a última ilha de comentários, desbloqueia a primeira ilha de formatação
      if (currentIslandId === 'comentario-6') {
        const firstFormattingIndex = prev.findIndex(island => island.id === 'formatacao-1');
        if (firstFormattingIndex !== -1) {
          newProgress[firstFormattingIndex] = { ...newProgress[firstFormattingIndex], status: 'uncompleted' };
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

  const getCurrentSection = (): SectionType => {
    // Determina a seção atual baseada no progresso
    const cleanCodeCompleted = islandProgress
      .filter(island => island.section === 'clean-code')
      .every(island => island.status === 'completed');
    
    const variablesCompleted = islandProgress
      .filter(island => island.section === 'variables')
      .every(island => island.status === 'completed');
    
    const functionsCompleted = islandProgress
      .filter(island => island.section === 'functions')
      .every(island => island.status === 'completed');
    
    const commentsCompleted = islandProgress
      .filter(island => island.section === 'comments')
      .every(island => island.status === 'completed');
    
    if (commentsCompleted) {
      return 'formatting';
    }
    if (functionsCompleted) {
      return 'comments';
    }
    if (variablesCompleted) {
      return 'functions';
    }
    if (cleanCodeCompleted) {
      return 'variables';
    }
    return 'clean-code';
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