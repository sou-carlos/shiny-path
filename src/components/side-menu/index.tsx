import { useProgress } from "../../lib/progress-context";
import type { SectionType } from "../../lib/progress-context";
import { useState } from "react";
import "./styles.scss";

interface SideMenuProps {
  currentSection: SectionType;
  onSectionChange: (section: SectionType) => void;
  onMinimize?: (minimized: boolean) => void;
}

export function SideMenu({ currentSection, onSectionChange, onMinimize }: SideMenuProps) {
  const { islandProgress } = useProgress();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const sections = [
    {
      id: 'clean-code' as const,
      name: 'Código Limpo',
      icon: '🌟',
      description: 'O que é e por que importa'
    },
    {
      id: 'variables' as const,
      name: 'Variáveis',
      icon: '📦',
      description: 'Nomes significativos e boas práticas'
    },
    {
      id: 'functions' as const,
      name: 'Funções',
      icon: '⚔️',
      description: 'Funções pequenas e organizadas'
    },
    {
      id: 'comments' as const,
      name: 'Comentários',
      icon: '💬',
      description: 'Documentação clara e útil'
    },
    {
      id: 'formatting' as const,
      name: 'Formatação',
      icon: '✨',
      description: 'Código limpo e organizado'
    }
  ];

  const isSectionUnlocked = (sectionId: string) => {
    if (sectionId === 'clean-code') return true; // Sempre desbloqueada
    
    if (sectionId === 'variables') {
      // Verifica se todas as ilhas de código limpo foram completadas
      const cleanCodeIslands = islandProgress.filter(island => island.section === 'clean-code');
      return cleanCodeIslands.every(island => island.status === 'completed');
    }
    
    if (sectionId === 'functions') {
      // Verifica se todas as ilhas de variáveis foram completadas
      const variablesIslands = islandProgress.filter(island => island.section === 'variables');
      return variablesIslands.every(island => island.status === 'completed');
    }
    
    if (sectionId === 'comments') {
      // Verifica se todas as ilhas de funções foram completadas
      const functionsIslands = islandProgress.filter(island => island.section === 'functions');
      return functionsIslands.every(island => island.status === 'completed');
    }
    
    if (sectionId === 'formatting') {
      // Verifica se todas as ilhas de comentários foram completadas
      const commentsIslands = islandProgress.filter(island => island.section === 'comments');
      return commentsIslands.every(island => island.status === 'completed');
    }
    
    return false;
  };

  const getSectionProgress = (sectionId: string) => {
    const sectionIslands = islandProgress.filter(island => island.section === sectionId);
    const completed = sectionIslands.filter(island => island.status === 'completed').length;
    const total = sectionIslands.length;
    return { completed, total, percentage: Math.round((completed / total) * 100) };
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMinimize = () => {
    const newMinimizedState = !isMinimized;
    setIsMinimized(newMinimizedState);
    onMinimize?.(newMinimizedState);
  };

  return (
    <>
      {/* Botão do menu mobile */}
      <button 
        className="menu-toggle"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      {/* Overlay para fechar o menu em mobile */}
      {isMenuOpen && (
        <div 
          className="menu-overlay"
          onClick={toggleMenu}
        />
      )}

      <div className={`side-menu ${isMenuOpen ? 'open' : ''} ${isMinimized ? 'minimized' : ''}`}>
        {/* Botão para minimizar/expandir usando a alça azul */}
        <button 
          className="minimize-toggle"
          onClick={toggleMinimize}
          aria-label={isMinimized ? "Expand menu" : "Minimize menu"}
        >
          {isMinimized ? '◀' : '▶'}
        </button>

        <div className="menu-content">
          <div className="menu-header">
            <h3>🗺️ Trilhas</h3>
            <p>Navegue entre os caminhos do conhecimento</p>
          </div>
          
          <div className="menu-sections">
            {sections.map((section) => {
              const isUnlocked = isSectionUnlocked(section.id);
              const progress = getSectionProgress(section.id);
              const isActive = currentSection === section.id;
              
              return (
                <div
                  key={section.id}
                  className={`menu-section ${isUnlocked ? 'unlocked' : 'locked'} ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    if (isUnlocked) {
                      onSectionChange(section.id as SectionType);
                      setIsMenuOpen(false); // Fecha o menu em mobile
                    }
                  }}
                  title={isMinimized ? `${section.name} - ${section.description}` : undefined}
                >
                  <div className="section-icon">
                    {section.icon}
                    {!isUnlocked && <span className="lock-icon">🔒</span>}
                  </div>
                  
                  {!isMinimized && (
                    <div className="section-info">
                      <h4 className="section-name">{section.name}</h4>
                      <p className="section-description">{section.description}</p>
                      
                      {isUnlocked && (
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${progress.percentage}%` }}
                          />
                          <span className="progress-text">
                            {progress.completed}/{progress.total}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {!isMinimized && (
            <div className="menu-footer">
              <div className="completion-status">
                <span className="status-icon">🏆</span>
                <span className="status-text">
                  {isSectionUnlocked('formatting') ? 'Todas as trilhas desbloqueadas!' : 
                   isSectionUnlocked('comments') ? 'Complete os comentários para desbloquear formatação' :
                   isSectionUnlocked('functions') ? 'Complete as funções para desbloquear comentários' :
                   isSectionUnlocked('variables') ? 'Complete as variáveis para desbloquear funções' :
                   'Complete o Código Limpo para desbloquear variáveis'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 