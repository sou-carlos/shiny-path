import React, { createContext, useContext, useRef } from 'react';
import type { ReactNode } from 'react';

interface SoundContextType {
  playSuccessSound: () => void;
  playErrorSound: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

interface SoundProviderProps {
  children: ReactNode;
}

export function SoundProvider({ children }: SoundProviderProps) {
  const audioContextRef = useRef<AudioContext | null>(null);

  const createSuccessSound = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const audioContext = audioContextRef.current;
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Configuração do som de sucesso (similar ao Duolingo)
      const now = audioContext.currentTime;
      
      // Sequência de notas: C5 -> E5 -> G5 (acorde maior)
      oscillator.frequency.setValueAtTime(523.25, now); // C5
      oscillator.frequency.setValueAtTime(659.25, now + 0.1); // E5
      oscillator.frequency.setValueAtTime(783.99, now + 0.2); // G5
      
      // Controle de volume
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.2, now + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      
      oscillator.start(now);
      oscillator.stop(now + 0.4);
      
      // Adiciona um segundo oscilador para mais riqueza sonora
      const oscillator2 = audioContext.createOscillator();
      const gainNode2 = audioContext.createGain();
      
      oscillator2.connect(gainNode2);
      gainNode2.connect(audioContext.destination);
      
      oscillator2.frequency.setValueAtTime(1046.50, now); // C6
      oscillator2.frequency.setValueAtTime(1318.51, now + 0.1); // E6
      oscillator2.frequency.setValueAtTime(1567.98, now + 0.2); // G6
      
      gainNode2.gain.setValueAtTime(0, now);
      gainNode2.gain.linearRampToValueAtTime(0.1, now + 0.01);
      gainNode2.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      
      oscillator2.start(now);
      oscillator2.stop(now + 0.4);
      
    } catch (error) {
      console.log('Erro ao criar som de sucesso:', error);
    }
  };

  const createErrorSound = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const audioContext = audioContextRef.current;
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Configuração do som de erro (nota baixa e descendente)
      const now = audioContext.currentTime;
      
      oscillator.frequency.setValueAtTime(220, now); // A3
      oscillator.frequency.setValueAtTime(196, now + 0.1); // G3
      oscillator.frequency.setValueAtTime(174.61, now + 0.2); // F3
      
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.15, now + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      
      oscillator.start(now);
      oscillator.stop(now + 0.3);
      
    } catch (error) {
      console.log('Erro ao criar som de erro:', error);
    }
  };

  const playSuccessSound = () => {
    createSuccessSound();
  };

  const playErrorSound = () => {
    createErrorSound();
  };

  return (
    <SoundContext.Provider value={{
      playSuccessSound,
      playErrorSound,
    }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
} 