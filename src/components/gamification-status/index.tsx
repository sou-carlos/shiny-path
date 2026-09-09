import { useGamification } from "../../lib/gamification-context";
import { LockKeyhole, Medal, PackageOpen } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import "./styles.scss";

const MEDALS = [
  { id: "clean-code", name: "Código Limpo", description: "Conclua a trilha de introdução ao Clean Code.", color: "purple" },
  { id: "variables", name: "Variáveis", description: "Conclua a trilha de variáveis significativas.", color: "blue" },
  { id: "functions", name: "Funções", description: "Conclua a trilha de funções bem definidas.", color: "green" },
  { id: "comments", name: "Comentários", description: "Conclua a trilha de comentários úteis.", color: "orange" },
  { id: "formatting", name: "Formatação", description: "Conclua a trilha de formatação consistente.", color: "pink" },
];

export function GamificationStatus() {
  const { gamificationState } = useGamification();
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const medalsCollected = gamificationState.medals.length;

  return (
    <div className="gamification-status">
      <div className="status-item lives">
        <span className="icon">❤️</span>
        <span className="value">{gamificationState.lives}</span>
      </div>
      <button
        className="status-item inventory"
        type="button"
        onClick={() => setIsInventoryOpen(true)}
        aria-label={`Abrir mostruário de medalhas: ${medalsCollected} de ${MEDALS.length}`}
      >
        <PackageOpen className="icon" aria-hidden="true" />
        <span className="value">{medalsCollected}/{MEDALS.length}</span>
      </button>

      <Dialog open={isInventoryOpen} onOpenChange={setIsInventoryOpen}>
        <DialogContent className="inventory-dialog">
          <DialogHeader>
            <div className="inventory-dialog__title">
              <PackageOpen aria-hidden="true" />
              <DialogTitle>Mostruário de medalhas</DialogTitle>
            </div>
            <DialogDescription>
              Complete uma trilha para adicionar sua medalha à coleção.
            </DialogDescription>
          </DialogHeader>

          <div className="medal-grid">
            {MEDALS.map((medal) => {
              const isCollected = gamificationState.medals.includes(medal.id);

              return (
                <article className={`medal-card ${isCollected ? `is-collected medal-card--${medal.color}` : ""}`} key={medal.id}>
                  <div className="medal-card__icon">
                    {isCollected ? <Medal aria-hidden="true" /> : <LockKeyhole aria-hidden="true" />}
                  </div>
                  <div>
                    <h3>{medal.name}</h3>
                    <p>{isCollected ? "Medalha conquistada" : medal.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
