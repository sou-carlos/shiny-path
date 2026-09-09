import { useParams, useNavigate } from "react-router-dom";
import { useProgress } from "../../lib/progress-context";
import { useGamification } from "../../lib/gamification-context";
import { useSound } from "../../lib/sound-context";
import { useState, useEffect } from "react";
import "./styles.scss";

import { islandsData, TRAIL_MEDALS } from "../../data/trails";

export function IslandPage() {
  const { islandId } = useParams<{ islandId: string }>();
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isContentCompleted, setIsContentCompleted] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [selectedErrorLines, setSelectedErrorLines] = useState<number[]>([]);
  const [isCodeErrorAnswered, setIsCodeErrorAnswered] = useState(false);
  const [isCodeErrorCorrect, setIsCodeErrorCorrect] = useState(false);

  const { unlockNextIsland, getIslandStatus, resetTrail } = useProgress();
  const {
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
    gamificationState,
    resumeFromLastTrail,
  } = useGamification();

  const { playSuccessSound, playErrorSound } = useSound();

  const islandData = islandId ? islandsData[islandId] : null;
  // const currentStatus = islandId ? getIslandStatus(islandId) : "locked";
  const isLastIsland =
    islandId === "codigo-limpo-4" ||
    islandId === "ilha-7" ||
    islandId === "funcao-6" ||
    islandId === "comentario-6" ||
    islandId === "formatacao-6";

  function completeIsland() {
    if (!islandData) return;

    const wasAlreadyCompleted = getIslandStatus(islandData.id) === "completed";
    unlockNextIsland(islandData.id);

    // A recompensa é concedida somente na primeira conclusão da última ilha
    // de cada trilha, evitando que uma trilha já concluída gere vidas extras.
    if (isLastIsland && !wasAlreadyCompleted) {
      gainLives(2);
      unlockMedal(TRAIL_MEDALS[islandData.id]);
    }
  }

  useEffect(() => {
    if (!islandId || !islandData) {
      navigate("/");
    }
  }, [islandId, islandData, navigate]);

  // Se o usuário tem 0 vidas e está em uma ilha de pergunta ou code-error, mostra Game Over
  // (evita bypass fechando e reabrindo a ilha para tentar de novo indefinidamente)
  useEffect(() => {
    if (
      islandData &&
      (islandData.type === "question" || islandData.type === "code-error") &&
      !canContinue
    ) {
      setShowGameOver(true);
    }
  }, [islandData, canContinue]);

  if (!islandData) {
    return (
      <div className="island-page">
        <div className="island-content">
          <h1>Ilha não encontrada</h1>
          <button onClick={() => navigate("/")} className="back-button">
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  function handleAnswerSelect(index: number) {
    if (!isAnswered) {
      setSelectedAnswer(index);
    }
  }

  function handleErrorLineSelect(lineNumber: number) {
    if (!isCodeErrorAnswered) {
      setSelectedErrorLines((prev) => {
        if (prev.includes(lineNumber)) {
          return prev.filter((line) => line !== lineNumber);
        } else {
          return [...prev, lineNumber];
        }
      });
    }
  }

  function handleConfirmCodeError() {
    if (selectedErrorLines.length > 0 && islandData?.codeErrorData) {
      addAttempt();

      const isCorrect =
        selectedErrorLines.length ===
          islandData.codeErrorData.errorLines.length &&
        selectedErrorLines.every((line) =>
          islandData.codeErrorData!.errorLines.includes(line)
        ) &&
        islandData.codeErrorData.errorLines.every((line) =>
          selectedErrorLines.includes(line)
        );

      setIsCodeErrorCorrect(isCorrect);
      setIsCodeErrorAnswered(true);

      if (isCorrect) {
        playSuccessSound();
        addCorrect();
        incrementStreak();

        const basePoints = 15;
        const streakBonus = Math.floor(gamificationState.streak * 3);
        const totalPoints = basePoints + streakBonus;
        gainPoints(totalPoints);

        completeIsland();

        if (gamificationState.streak >= 3) {
          unlockAchievement("🔥 Streak Master");
        }
        if (gamificationState.totalCorrect >= 5) {
          unlockAchievement("🎯 Sharp Shooter");
        }
        if (gamificationState.totalCorrect >= 10) {
          unlockAchievement("🔍 Code Inspector");
        }
      } else {
        playErrorSound();
        loseLife();
        resetStreak();

        if (!canContinue) {
          setShowGameOver(true);
        }
      }
    }
  }

  function handleConfirmAnswer() {
    if (selectedAnswer !== null && islandData?.questionData) {
      addAttempt();
      const correct = selectedAnswer === islandData.questionData.correctAnswer;
      setIsCorrect(correct);
      setIsAnswered(true);

      if (correct) {
        playSuccessSound();
        addCorrect();
        incrementStreak();

        const basePoints = 10;
        const streakBonus = Math.floor(gamificationState.streak * 2);
        const totalPoints = basePoints + streakBonus;
        gainPoints(totalPoints);

        completeIsland();

        if (gamificationState.streak >= 3) {
          unlockAchievement("🔥 Streak Master");
        }
        if (gamificationState.totalCorrect >= 5) {
          unlockAchievement("🎯 Sharp Shooter");
        }
      } else {
        playErrorSound();
        loseLife();
        resetStreak();

        if (!canContinue) {
          setShowGameOver(true);
        }
      }
    }
  }

  function handleContentComplete() {
    setIsContentCompleted(true);
    playSuccessSound();
    gainPoints(5);
    incrementStreak();
    completeIsland();
  }

  function handleRestartGame() {
    resetTrail(islandData!.id);
    resumeFromLastTrail();
    navigate("/");
  }

  return (
    <div className="island-page">
      <div className="island-header">
        <button onClick={() => navigate("/")} className="back-button">
          ← Voltar
        </button>
        <h1>{islandData.name}</h1>
      </div>

      <div className="island-content">
        {showGameOver ? (
          <div className="game-over-container">
            <div className="game-over-content">
              <div className="game-over-icon">💔</div>
              <h3 className="game-over-title">Game Over!</h3>
              <p className="game-over-message">
                Você perdeu todas as vidas. A trilha será reiniciada com 2 vidas!
              </p>
              <div className="game-over-stats">
                <div className="stat">
                  <span className="label">Pontuação:</span>
                  <span className="value">{gamificationState.points}</span>
                </div>
                <div className="stat">
                  <span className="label">Maior Streak:</span>
                  <span className="value">{gamificationState.maxStreak}</span>
                </div>
                <div className="stat">
                  <span className="label">Precisão:</span>
                  <span className="value">
                    {Math.round(
                      (gamificationState.totalCorrect /
                        Math.max(gamificationState.totalAttempts, 1)) *
                        100
                    )}
                    %
                  </span>
                </div>
              </div>
              <button onClick={handleRestartGame} className="restart-button">
                Reiniciar trilha
              </button>
            </div>
          </div>
        ) : islandData.type === "content" ? (
          <div className="content-container">
            <div className="content-text">{islandData.contentText}</div>

            {!isContentCompleted ? (
              <div className="content-actions">
                <button
                  onClick={handleContentComplete}
                  className="complete-content-button"
                >
                  Marcar como Concluído
                </button>
              </div>
            ) : (
              <div className="content-completed-feedback">
                <div className="correct-message">
                  <span className="icon">✅</span>
                  <span className="text">Conteúdo concluído!</span>
                  <div className="points-earned">
                    <span className="icon">⭐</span>
                    <span className="text">+5 pontos</span>
                  </div>
                  {!isLastIsland ? (
                    <div className="unlock-message">
                      <span className="icon">🔓</span>
                      <span className="text">Próxima trilha desbloqueada!</span>
                    </div>
                  ) : (
                    <div className="unlock-message">
                      <span className="icon">🎉</span>
                      <span className="text">
                        Parabéns! Você completou toda a trilha!
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : islandData.type === "question" ? (
          <div className="question-container">
            <div className="question-text">
              {islandData.questionData?.question}
            </div>

            <div className="answers-container">
              {islandData.questionData?.answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`answer-button ${
                    selectedAnswer === index ? "selected" : ""
                  } ${
                    isAnswered &&
                    index === islandData.questionData?.correctAnswer
                      ? "correct"
                      : ""
                  } ${
                    isAnswered &&
                    selectedAnswer === index &&
                    index !== islandData.questionData?.correctAnswer
                      ? "incorrect"
                      : ""
                  }`}
                  disabled={isAnswered}
                >
                  {answer}
                </button>
              ))}
            </div>

            {isAnswered && (
              <div
                className={`result-feedback ${
                  isCorrect ? "correct" : "incorrect"
                }`}
              >
                {isCorrect ? (
                  <div className="correct-message">
                    <span className="icon">🎉</span>
                    <span className="text">Parabéns! Resposta correta!</span>
                    <div className="points-earned">
                      <span className="icon">⭐</span>
                      <span className="text">
                        +{10 + Math.floor(gamificationState.streak * 2)} pontos
                      </span>
                    </div>
                    <div className="streak-info">
                      <span className="icon">🔥</span>
                      <span className="text">
                        Streak: {gamificationState.streak}
                      </span>
                    </div>
                    {!isLastIsland ? (
                      <div className="unlock-message">
                        <span className="icon">🔓</span>
                        <span className="text">Próxima trilha desbloqueada!</span>
                      </div>
                    ) : (
                      <div className="unlock-message">
                        <span className="icon">🎉</span>
                        <span className="text">
                          Parabéns! Você completou toda a trilha!
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="incorrect-message">
                    <span className="icon">❌</span>
                    <span className="text">Ops! Tente novamente.</span>
                    <div className="lives-remaining">
                      <span className="icon">❤️</span>
                      <span className="text">
                        Vidas restantes: {gamificationState.lives}
                      </span>
                    </div>
                    {gamificationState.streak > 0 && (
                      <div className="streak-lost">
                        <span className="icon">💔</span>
                        <span className="text">Streak perdido!</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : islandData.type === "code-error" ? (
          <div className="code-error-container">
            <div className="question-text">
              {islandData.codeErrorData?.question}
            </div>

            <div className="code-snippet-container">
              <div className="code-header">
                <span className="code-icon">💻</span>
                <span className="code-title">Código para análise:</span>
              </div>
              <div className="code-snippet">
                {islandData.codeErrorData?.codeSnippet
                  .split("\n")
                  .map((line, index) => (
                    <div
                      key={index}
                      className={`code-line ${
                        selectedErrorLines.includes(index + 1)
                          ? "selected-error"
                          : ""
                      } ${
                        isCodeErrorAnswered &&
                        islandData.codeErrorData?.errorLines.includes(index + 1)
                          ? "correct-error"
                          : ""
                      } ${
                        isCodeErrorAnswered &&
                        selectedErrorLines.includes(index + 1) &&
                        !islandData.codeErrorData?.errorLines.includes(
                          index + 1
                        )
                          ? "incorrect-error"
                          : ""
                      }`}
                      onClick={() => handleErrorLineSelect(index + 1)}
                    >
                      <span className="line-number">{index + 1}</span>
                      <span className="line-content">{line}</span>
                    </div>
                  ))}
              </div>
              <div className="code-instructions">
                <span className="icon">🎯</span>
                <span className="text">
                  Clique nas linhas que violam o Clean Code
                </span>
              </div>
            </div>

            {isCodeErrorAnswered && (
              <div
                className={`result-feedback ${
                  isCodeErrorCorrect ? "correct" : "incorrect"
                }`}
              >
                {isCodeErrorCorrect ? (
                  <div className="correct-message">
                    <span className="icon">🎉</span>
                    <span className="text">
                      Excelente! Você identificou corretamente os problemas!
                    </span>
                    <div className="points-earned">
                      <span className="icon">⭐</span>
                      <span className="text">
                        +{15 + Math.floor(gamificationState.streak * 3)} pontos
                      </span>
                    </div>
                    <div className="streak-info">
                      <span className="icon">🔥</span>
                      <span className="text">
                        Streak: {gamificationState.streak}
                      </span>
                    </div>
                    <div className="explanation">
                      <span className="icon">💡</span>
                      <span className="text">
                        {islandData.codeErrorData?.explanation}
                      </span>
                    </div>
                    {!isLastIsland ? (
                      <div className="unlock-message">
                        <span className="icon">🔓</span>
                        <span className="text">Próxima trilha desbloqueada!</span>
                      </div>
                    ) : (
                      <div className="unlock-message">
                        <span className="icon">🎉</span>
                        <span className="text">
                          Parabéns! Você completou toda a trilha!
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="incorrect-message">
                    <span className="icon">❌</span>
                    <span className="text">Ops! Tente novamente.</span>
                    <div className="lives-remaining">
                      <span className="icon">❤️</span>
                      <span className="text">
                        Vidas restantes: {gamificationState.lives}
                      </span>
                    </div>
                    {gamificationState.streak > 0 && (
                      <div className="streak-lost">
                        <span className="icon">💔</span>
                        <span className="text">Streak perdido!</span>
                      </div>
                    )}
                    <div className="explanation">
                      <span className="icon">💡</span>
                      <span className="text">
                        {islandData.codeErrorData?.explanation}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : null}
      </div>

      <div className="island-footer">
        {showGameOver ? (
          <button onClick={handleRestartGame} className="close-button">
            Reiniciar trilha
          </button>
        ) : islandData.type === "content" ? (
          !isContentCompleted ? (
            <button onClick={() => navigate("/")} className="close-button">
              Fechar
            </button>
          ) : (
            <button onClick={() => navigate("/")} className="close-button">
              Continuar
            </button>
          )
        ) : islandData.type === "question" ? (
          !isAnswered ? (
            <button
              onClick={handleConfirmAnswer}
              disabled={selectedAnswer === null}
              className="confirm-button"
            >
              Confirmar Resposta
            </button>
          ) : (
            <button onClick={() => navigate("/")} className="close-button">
              {isCorrect ? "Continuar" : "Tentar Novamente"}
            </button>
          )
        ) : islandData.type === "code-error" ? (
          !isCodeErrorAnswered ? (
            <button
              onClick={handleConfirmCodeError}
              disabled={selectedErrorLines.length === 0}
              className="confirm-button"
            >
              Confirmar Seleção
            </button>
          ) : (
            <button onClick={() => navigate("/")} className="close-button">
              {isCodeErrorCorrect ? "Continuar" : "Tentar Novamente"}
            </button>
          )
        ) : null}
      </div>
    </div>
  );
}
