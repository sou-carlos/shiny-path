import { useGamification } from "../../lib/gamification-context";
import "./styles.scss";

export function GamificationStatus() {
  const { gamificationState } = useGamification();

  return (
    <div className="gamification-status">
      <div className="status-item lives">
        <span className="icon">❤️</span>
        <span className="value">{gamificationState.lives}</span>
      </div>
    </div>
  );
} 