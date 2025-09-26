import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface GamificationState {
  lives: number;
  points: number;
  streak: number;
  maxStreak: number;
  totalCorrect: number;
  totalAttempts: number;
  achievements: string[];
}

interface GamificationContextType {
  gamificationState: GamificationState;
  loseLife: () => void;
  gainPoints: (points: number) => void;
  resetStreak: () => void;
  incrementStreak: () => void;
  addAttempt: () => void;
  addCorrect: () => void;
  unlockAchievement: (achievement: string) => void;
  canContinue: boolean;
  getAccuracy: () => number;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

interface GamificationProviderProps {
  children: ReactNode;
}

export function GamificationProvider({ children }: GamificationProviderProps) {
  const [gamificationState, setGamificationState] = useState<GamificationState>({
    lives: 3,
    points: 0,
    streak: 0,
    maxStreak: 0,
    totalCorrect: 0,
    totalAttempts: 0,
    achievements: [],
  });

  const loseLife = () => {
    setGamificationState(prev => ({
      ...prev,
      lives: Math.max(0, prev.lives - 1),
    }));
  };

  const gainPoints = (points: number) => {
    setGamificationState(prev => ({
      ...prev,
      points: prev.points + points,
    }));
  };

  const resetStreak = () => {
    setGamificationState(prev => ({
      ...prev,
      streak: 0,
    }));
  };

  const incrementStreak = () => {
    setGamificationState(prev => ({
      ...prev,
      streak: prev.streak + 1,
      maxStreak: Math.max(prev.maxStreak, prev.streak + 1),
    }));
  };

  const addAttempt = () => {
    setGamificationState(prev => ({
      ...prev,
      totalAttempts: prev.totalAttempts + 1,
    }));
  };

  const addCorrect = () => {
    setGamificationState(prev => ({
      ...prev,
      totalCorrect: prev.totalCorrect + 1,
    }));
  };

  const unlockAchievement = (achievement: string) => {
    setGamificationState(prev => ({
      ...prev,
      achievements: prev.achievements.includes(achievement) 
        ? prev.achievements 
        : [...prev.achievements, achievement],
    }));
  };

  const canContinue = gamificationState.lives > 0;

  const getAccuracy = () => {
    if (gamificationState.totalAttempts === 0) return 100;
    return Math.round((gamificationState.totalCorrect / gamificationState.totalAttempts) * 100);
  };

  return (
    <GamificationContext.Provider value={{
      gamificationState,
      loseLife,
      gainPoints,
      resetStreak,
      incrementStreak,
      addAttempt,
      addCorrect,
      unlockAchievement,
      canContinue,
      getAccuracy,
    }}>
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
} 