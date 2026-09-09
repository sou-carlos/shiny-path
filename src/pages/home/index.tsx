import { Island } from "../../components/island";
import { useProgress } from "../../lib/progress-context";
import type { SectionType } from "../../lib/progress-context";
import { getIslandsForSection } from "../../data/trails";
import { GamificationStatus } from "../../components/gamification-status";
import { SideMenu } from "../../components/side-menu";
import { useState } from "react";
import ifbaLogo from "../../assets/ifba-vertical.jpg";
import "./styles.scss";

interface HomeProps {
  onMenuMinimize?: (minimized: boolean) => void;
}

export function Home({ onMenuMinimize }: HomeProps) {
  const { islandProgress, getCurrentSection } = useProgress();
  const [currentSection, setCurrentSection] = useState<SectionType>(getCurrentSection());
  const [isMenuMinimized, setIsMenuMinimized] = useState(false);

  const currentIslands = getIslandsForSection(currentSection);
  const sectionTitle = currentSection === 'clean-code'
    ? "Trilha do Código Limpo"
    : currentSection === 'variables' 
    ? "Trilha das Variáveis" 
    : currentSection === 'functions' 
    ? "Trilha das Funções"
    : currentSection === 'comments'
    ? "Trilha dos Comentários"
    : currentSection === 'formatting'
    ? "Trilha da Formatação"
    : "Créditos";

  const handleSectionChange = (section: SectionType) => {
    setCurrentSection(section);
  };

  const handleMenuMinimize = (minimized: boolean) => {
    setIsMenuMinimized(minimized);
    onMenuMinimize?.(minimized);
  };

  return (
    <div className={`home-container ${isMenuMinimized ? 'menu-minimized' : ''}`}>
      <SideMenu 
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
        onMinimize={handleMenuMinimize}
      />
      <GamificationStatus />
      <h1 className="home-title">Bem-vindo/Bem-vinda a trilha do código limpo!</h1>
      <h2 className="section-title">{sectionTitle}</h2>
      
      {currentSection === 'credits' ? (
        <div className="credits-section">
          <div className="credits-card">
            <img
              src={ifbaLogo}
              alt="Instituto Federal da Bahia - Campus Jacobina"
              className="credits-logo"
            />
            <div className="credits-text">
              <h3 className="credits-institution">Instituto Federal de Educação, Ciência e Tecnologia da Bahia</h3>
              <p className="credits-campus">Campus Jacobina</p>
              <div className="credits-people">
                <p><strong>Carlos Eduardo de Souza</strong> — Licenciado em Computação · IFBA</p>
                <p><strong>Profa. Dra. Vanessa dos Santos Rios</strong> — Docente do IFBA</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="islands-grid">
          {currentIslands.map((island) => (
            <Island
              key={island.id}
              id={island.id}
              status={islandProgress.find(i => i.id === island.id)?.status || "locked"}
              name={island.name}
              type={island.type}
              contentText={island.contentText}
              questionData={island.type === 'question' ? island.questionData : undefined}
              codeErrorData={island.type === 'code-error' ? island.codeErrorData : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
