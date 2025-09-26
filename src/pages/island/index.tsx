import { useParams, useNavigate } from "react-router-dom";
import { useProgress } from "../../lib/progress-context";
import { useGamification } from "../../lib/gamification-context";
import { useSound } from "../../lib/sound-context";
import { useState, useEffect } from "react";
import "./styles.scss";

interface IslandData {
  id: string;
  name: string;
  type: "content" | "question" | "code-error";
  contentText: string;
  questionData?: {
    question: string;
    answers: string[];
    correctAnswer: number;
  };
  codeErrorData?: {
    question: string;
    codeSnippet: string;
    errorLines: number[];
    explanation: string;
  };
}

const islandsData: Record<string, IslandData> = {
  "ilha-1": {
    id: "ilha-1",
    name: "Introdução às Variáveis",
    type: "content",
    contentText: "As variáveis são fundamentais em qualquer linguagem de programação. Elas são como caixas que armazenam dados que podem ser usados e modificados durante a execução do programa. Nesta trilha, você aprenderá como criar variáveis com nomes significativos e seguir as melhores práticas do código limpo."
  },
  "ilha-2": {
    id: "ilha-2",
    name: "Nomes Significativos",
    type: "question",
    contentText: "Teste seus conhecimentos sobre nomes de variáveis",
    questionData: {
      question: "Qual é a melhor prática para nomear variáveis?",
      answers: [
        "A: Usar nomes curtos como 'a', 'b', 'c'",
        "B: Usar nomes descritivos que revelem a intenção",
        "C: Usar nomes em português misturado com inglês",
        "D: Usar nomes muito longos e detalhados"
      ],
      correctAnswer: 1
    }
  },
  "ilha-3": {
    id: "ilha-3",
    name: "Acerte o Erro - Variáveis",
    type: "code-error",
    contentText: "Identifique os problemas no código abaixo",
    codeErrorData: {
      question: "Identifique as linhas que violam as boas práticas de nomenclatura de variáveis:",
      codeSnippet: `function calculateTotal(items) {
  let a = 0;
  let usr = null;
  let data = [];
  let num = items.length;
  
  for (let i = 0; i < num; i++) {
    let item = items[i];
    let price = item.price;
    let qty = item.quantity;
    
    a += price * qty;
    data.push(item);
  }
  
  return a;
}`,
      errorLines: [2, 3, 4, 5, 9, 10],
      explanation: "As linhas 2, 3, 4, 5, 9 e 10 violam as boas práticas: 'a' deveria ser 'total', 'usr' deveria ser 'user', 'data' deveria ser 'processedItems', 'num' deveria ser 'itemCount', 'qty' deveria ser 'quantity'. Nomes de variáveis devem ser descritivos e evitar abreviações."
    }
  },
  "ilha-4": {
    id: "ilha-4",
    name: "Evitando Abreviações",
    type: "content",
    contentText: "Evite abreviações desnecessárias. Nomes como 'usr', 'pwd', 'num' podem confundir outros desenvolvedores. Prefira nomes completos como 'user', 'password', 'number'. A clareza é mais importante que a brevidade. Lembre-se: você escreve o código uma vez, mas ele será lido muitas vezes."
  },
  "ilha-5": {
    id: "ilha-5",
    name: "Tipos de Dados",
    type: "question",
    contentText: "Teste sobre tipos de dados",
    questionData: {
      question: "Qual nome de variável é mais claro para armazenar uma lista de usuários?",
      answers: [
        "A: list",
        "B: users",
        "C: data",
        "D: arr"
      ],
      correctAnswer: 1
    }
  },
  "ilha-6": {
    id: "ilha-6",
    name: "Constantes e Valores Fixos",
    type: "content",
    contentText: "Use constantes para valores que não mudam. Em JavaScript, use 'const' para valores imutáveis. Em outras linguagens, use 'final', 'readonly' ou convenções como UPPER_CASE. Exemplo: const MAX_RETRY_COUNT = 3; const API_BASE_URL = 'https://api.example.com';"
  },
  "ilha-7": {
    id: "ilha-7",
    name: "Escopo e Vida Útil",
    type: "question",
    contentText: "Teste sobre escopo de variáveis",
    questionData: {
      question: "Onde você deve declarar uma variável que será usada apenas dentro de um loop?",
      answers: [
        "A: No início da função, antes do loop",
        "B: Dentro do loop, onde será usada",
        "C: No escopo global da aplicação",
        "D: Em um arquivo separado de configuração"
      ],
      correctAnswer: 1
    }
  },
  "funcao-1": {
    id: "funcao-1",
    name: "Introdução às Funções",
    type: "content",
    contentText: "Funções são blocos de código reutilizáveis que executam uma tarefa específica. Elas são fundamentais para organizar código, evitar repetição e tornar o programa mais legível. Uma função bem escrita deve ter um nome claro, fazer apenas uma coisa e ser pequena o suficiente para ser compreendida rapidamente."
  },
  "funcao-2": {
    id: "funcao-2",
    name: "Nomes de Funções",
    type: "question",
    contentText: "Teste sobre nomes de funções",
    questionData: {
      question: "Qual é a melhor prática para nomear funções?",
      answers: [
        "A: Usar verbos que descrevem a ação",
        "B: Usar nomes curtos como 'f', 'func', 'fn'",
        "C: Usar nomes em maiúsculas",
        "D: Usar nomes que não revelem a intenção"
      ],
      correctAnswer: 0
    }
  },
  "funcao-3": {
    id: "funcao-3",
    name: "Funções Pequenas",
    type: "content",
    contentText: "Funções devem ser pequenas. Uma regra geral é que uma função não deve ter mais de 20 linhas. Se uma função fica muito grande, divida-a em funções menores. Cada função deve fazer apenas uma coisa e fazê-la bem. Isso melhora a legibilidade e facilita testes e manutenção."
  },
  "funcao-4": {
    id: "funcao-4",
    name: "Um Nível de Abstração",
    type: "question",
    contentText: "Teste sobre níveis de abstração",
    questionData: {
      question: "O que significa 'um nível de abstração' em uma função?",
      answers: [
        "A: A função deve ter apenas um parâmetro",
        "B: A função deve fazer apenas uma coisa em um nível específico",
        "C: A função deve ter apenas uma linha de código",
        "D: A função deve retornar apenas um valor"
      ],
      correctAnswer: 1
    }
  },
  "funcao-5": {
    id: "funcao-5",
    name: "Parâmetros de Função",
    type: "content",
    contentText: "Funções devem ter poucos parâmetros. Idealmente, zero, um ou dois parâmetros. Mais que isso torna a função difícil de usar e entender. Se precisar de muitos parâmetros, considere usar objetos ou dividir a função. Evite parâmetros booleanos que criam múltiplas responsabilidades."
  },
  "funcao-6": {
    id: "funcao-6",
    name: "Efeitos Colaterais",
    type: "question",
    contentText: "Teste sobre efeitos colaterais",
    questionData: {
      question: "O que são efeitos colaterais em funções?",
      answers: [
        "A: Mudanças no estado global ou parâmetros",
        "B: Retornar valores diferentes",
        "C: Usar variáveis locais",
        "D: Ter muitos parâmetros"
      ],
      correctAnswer: 0
    }
  }
};

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
  
  const { unlockNextIsland, getIslandStatus } = useProgress();
  const { 
    loseLife, 
    gainPoints, 
    resetStreak, 
    incrementStreak, 
    addAttempt, 
    addCorrect,
    unlockAchievement,
    canContinue,
    gamificationState 
  } = useGamification();
  
  const { playSuccessSound, playErrorSound } = useSound();

  const islandData = islandId ? islandsData[islandId] : null;
  const currentStatus = islandId ? getIslandStatus(islandId) : "locked";
  const isLastIsland = islandId === 'ilha-7' || islandId === 'funcao-6';

  useEffect(() => {
    if (!islandId || !islandData) {
      navigate('/');
    }
  }, [islandId, islandData, navigate]);

  if (!islandData) {
    return (
      <div className="island-page">
        <div className="island-content">
          <h1>Ilha não encontrada</h1>
          <button onClick={() => navigate('/')} className="back-button">
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
      setSelectedErrorLines(prev => {
        if (prev.includes(lineNumber)) {
          return prev.filter(line => line !== lineNumber);
        } else {
          return [...prev, lineNumber];
        }
      });
    }
  }

  function handleConfirmCodeError() {
    if (selectedErrorLines.length > 0 && islandData.codeErrorData) {
      addAttempt();
      
      const isCorrect = selectedErrorLines.length === islandData.codeErrorData.errorLines.length &&
        selectedErrorLines.every(line => islandData.codeErrorData!.errorLines.includes(line)) &&
        islandData.codeErrorData.errorLines.every(line => selectedErrorLines.includes(line));
      
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
        
        unlockNextIsland(islandData.id);
        
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
    if (selectedAnswer !== null && islandData.questionData) {
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
        
        unlockNextIsland(islandData.id);
        
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
    unlockNextIsland(islandData.id);
  }

  function handleRestartGame() {
    window.location.reload();
  }

  return (
    <div className="island-page">
      <div className="island-header">
        <button onClick={() => navigate('/')} className="back-button">
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
                Você perdeu todas as vidas. Mas não desista!
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
                  <span className="value">{Math.round((gamificationState.totalCorrect / Math.max(gamificationState.totalAttempts, 1)) * 100)}%</span>
                </div>
              </div>
              <button onClick={handleRestartGame} className="restart-button">
                Jogar Novamente
              </button>
            </div>
          </div>
        ) : islandData.type === "content" ? (
          <div className="content-container">
            <div className="content-text">
              {islandData.contentText}
            </div>
            
            {!isContentCompleted ? (
              <div className="content-actions">
                <button onClick={handleContentComplete} className="complete-content-button">
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
                      <span className="text">Próxima ilha desbloqueada!</span>
                    </div>
                  ) : (
                    <div className="unlock-message">
                      <span className="icon">🎉</span>
                      <span className="text">Parabéns! Você completou toda a trilha!</span>
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
                    isAnswered && index === islandData.questionData?.correctAnswer ? "correct" : ""
                  } ${
                    isAnswered && selectedAnswer === index && index !== islandData.questionData?.correctAnswer ? "incorrect" : ""
                  }`}
                  disabled={isAnswered}
                >
                  {answer}
                </button>
              ))}
            </div>

            {isAnswered && (
              <div className={`result-feedback ${isCorrect ? "correct" : "incorrect"}`}>
                {isCorrect ? (
                  <div className="correct-message">
                    <span className="icon">🎉</span>
                    <span className="text">Parabéns! Resposta correta!</span>
                    <div className="points-earned">
                      <span className="icon">⭐</span>
                      <span className="text">+{10 + Math.floor(gamificationState.streak * 2)} pontos</span>
                    </div>
                    <div className="streak-info">
                      <span className="icon">🔥</span>
                      <span className="text">Streak: {gamificationState.streak}</span>
                    </div>
                    {!isLastIsland ? (
                      <div className="unlock-message">
                        <span className="icon">🔓</span>
                        <span className="text">Próxima ilha desbloqueada!</span>
                      </div>
                    ) : (
                      <div className="unlock-message">
                        <span className="icon">🎉</span>
                        <span className="text">Parabéns! Você completou toda a trilha!</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="incorrect-message">
                    <span className="icon">❌</span>
                    <span className="text">Ops! Tente novamente.</span>
                    <div className="lives-remaining">
                      <span className="icon">❤️</span>
                      <span className="text">Vidas restantes: {gamificationState.lives}</span>
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
                {islandData.codeErrorData?.codeSnippet.split('\n').map((line, index) => (
                  <div
                    key={index}
                    className={`code-line ${
                      selectedErrorLines.includes(index + 1) ? "selected-error" : ""
                    } ${
                      isCodeErrorAnswered && islandData.codeErrorData?.errorLines.includes(index + 1) ? "correct-error" : ""
                    } ${
                      isCodeErrorAnswered && selectedErrorLines.includes(index + 1) && !islandData.codeErrorData?.errorLines.includes(index + 1) ? "incorrect-error" : ""
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
                <span className="text">Clique nas linhas que violam o Clean Code</span>
              </div>
            </div>

            {isCodeErrorAnswered && (
              <div className={`result-feedback ${isCodeErrorCorrect ? "correct" : "incorrect"}`}>
                {isCodeErrorCorrect ? (
                  <div className="correct-message">
                    <span className="icon">🎉</span>
                    <span className="text">Excelente! Você identificou corretamente os problemas!</span>
                    <div className="points-earned">
                      <span className="icon">⭐</span>
                      <span className="text">+{15 + Math.floor(gamificationState.streak * 3)} pontos</span>
                    </div>
                    <div className="streak-info">
                      <span className="icon">🔥</span>
                      <span className="text">Streak: {gamificationState.streak}</span>
                    </div>
                    <div className="explanation">
                      <span className="icon">💡</span>
                      <span className="text">{islandData.codeErrorData?.explanation}</span>
                    </div>
                    {!isLastIsland ? (
                      <div className="unlock-message">
                        <span className="icon">🔓</span>
                        <span className="text">Próxima ilha desbloqueada!</span>
                      </div>
                    ) : (
                      <div className="unlock-message">
                        <span className="icon">🎉</span>
                        <span className="text">Parabéns! Você completou toda a trilha!</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="incorrect-message">
                    <span className="icon">❌</span>
                    <span className="text">Ops! Tente novamente.</span>
                    <div className="lives-remaining">
                      <span className="icon">❤️</span>
                      <span className="text">Vidas restantes: {gamificationState.lives}</span>
                    </div>
                    {gamificationState.streak > 0 && (
                      <div className="streak-lost">
                        <span className="icon">💔</span>
                        <span className="text">Streak perdido!</span>
                      </div>
                    )}
                    <div className="explanation">
                      <span className="icon">💡</span>
                      <span className="text">{islandData.codeErrorData?.explanation}</span>
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
          <button onClick={() => navigate('/')} className="close-button">
            Fechar
          </button>
        ) : islandData.type === "content" ? (
          !isContentCompleted ? (
            <button onClick={() => navigate('/')} className="close-button">
              Fechar
            </button>
          ) : (
            <button onClick={() => navigate('/')} className="close-button">
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
            <button onClick={() => navigate('/')} className="close-button">
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
            <button onClick={() => navigate('/')} className="close-button">
              {isCodeErrorCorrect ? "Continuar" : "Tentar Novamente"}
            </button>
          )
        ) : null}
      </div>
    </div>
  );
} 