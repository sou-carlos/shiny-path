import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface GamificationState {
  lives: number;
  points: number;
  streak: number;
  maxStreak: number;
  totalCorrect: number;
  totalAttempts: number;
  achievements: string[];
  medals: string[];
}

interface GamificationContextType {
  gamificationState: GamificationState;
  loseLife: () => void;
  gainLives: (lives: number) => void;
  gainPoints: (points: number) => void;
  resetStreak: () => void;
  incrementStreak: () => void;
  addAttempt: () => void;
  addCorrect: () => void;
  unlockAchievement: (achievement: string) => void;
  unlockMedal: (medalId: string) => void;
  canContinue: boolean;
  getAccuracy: () => number;
  resumeFromLastTrail: () => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(
  undefined
);

interface GamificationProviderProps {
  children: ReactNode;
}

export function GamificationProvider({ children }: GamificationProviderProps) {
  const MEDALS_STORAGE_KEY = "shiny-path-medals";
  const getSavedMedals = () => {
    try {
      const savedMedals = localStorage.getItem(MEDALS_STORAGE_KEY);
      return savedMedals ? (JSON.parse(savedMedals) as string[]) : [];
    } catch {
      return [];
    }
  };

  const initialState: GamificationState = {
    lives: 5,
    points: 0,
    streak: 0,
    maxStreak: 0,
    totalCorrect: 0,
    totalAttempts: 0,
    achievements: [],
    medals: getSavedMedals(),
  };

  const [gamificationState, setGamificationState] =
    useState<GamificationState>(initialState);

  const loseLife = () => {
    setGamificationState((prev) => ({
      ...prev,
      lives: Math.max(0, prev.lives - 1),
    }));
  };

  const gainLives = (lives: number) => {
    setGamificationState((prev) => ({
      ...prev,
      lives: Math.min(5, prev.lives + lives),
    }));
  };

  const gainPoints = (points: number) => {
    setGamificationState((prev) => ({
      ...prev,
      points: prev.points + points,
    }));
  };

  const resetStreak = () => {
    setGamificationState((prev) => ({
      ...prev,
      streak: 0,
    }));
  };

  const incrementStreak = () => {
    setGamificationState((prev) => ({
      ...prev,
      streak: prev.streak + 1,
      maxStreak: Math.max(prev.maxStreak, prev.streak + 1),
    }));
  };

  const addAttempt = () => {
    setGamificationState((prev) => ({
      ...prev,
      totalAttempts: prev.totalAttempts + 1,
    }));
  };

  const addCorrect = () => {
    setGamificationState((prev) => ({
      ...prev,
      totalCorrect: prev.totalCorrect + 1,
    }));
  };

  const unlockAchievement = (achievement: string) => {
    setGamificationState((prev) => ({
      ...prev,
      achievements: prev.achievements.includes(achievement)
        ? prev.achievements
        : [...prev.achievements, achievement],
    }));
  };

  const unlockMedal = (medalId: string) => {
    setGamificationState((prev) => {
      if (prev.medals.includes(medalId)) return prev;

      const medals = [...prev.medals, medalId];
      localStorage.setItem(MEDALS_STORAGE_KEY, JSON.stringify(medals));
      return { ...prev, medals };
    });
  };

  const canContinue = gamificationState.lives > 0;

  const getAccuracy = () => {
    if (gamificationState.totalAttempts === 0) return 100;
    return Math.round(
      (gamificationState.totalCorrect / gamificationState.totalAttempts) * 100
    );
  };

  const resumeFromLastTrail = () => {
    setGamificationState((prev) => ({
      ...prev,
      lives: 2,
      streak: 0,
    }));
  };

  return (
    <GamificationContext.Provider
      value={{
        gamificationState,
        loseLife,
        gainLives,
        gainPoints,
        resetStreak,
        incrementStreak,
        addAttempt,
        addCorrect,
        unlockAchievement,
        unlockMedal,
        canContinue,
        getAccuracy,
        resumeFromLastTrail,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error(
      "useGamification must be used within a GamificationProvider"
    );
  }
  return context;
}
