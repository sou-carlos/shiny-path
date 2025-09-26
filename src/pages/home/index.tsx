import { Island } from "../../components/island";
import { useProgress } from "../../lib/progress-context";
import { GamificationStatus } from "../../components/gamification-status";
import { SideMenu } from "../../components/side-menu";
import { useState } from "react";
import "./styles.scss";

interface HomeProps {
  onMenuMinimize?: (minimized: boolean) => void;
}

export function Home({ onMenuMinimize }: HomeProps) {
  const { islandProgress, getCurrentSection } = useProgress();
  const [currentSection, setCurrentSection] = useState<'variables' | 'functions'>(getCurrentSection());
  const [isMenuMinimized, setIsMenuMinimized] = useState(false);

  const variablesIslands = [
    {
      id: "ilha-1",
      name: "Introdução às Variáveis",
      type: "content" as const,
      contentText: "As variáveis são fundamentais em qualquer linguagem de programação. Elas são como caixas que armazenam dados que podem ser usados e modificados durante a execução do programa. Nesta trilha, você aprenderá como criar variáveis com nomes significativos e seguir as melhores práticas do código limpo."
    },
    {
      id: "ilha-2",
      name: "Nomes Significativos",
      type: "question" as const,
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
    {
      id: "ilha-3",
      name: "Acerte o Erro - Variáveis",
      type: "code-error" as const,
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
    {
      id: "ilha-4",
      name: "Evitando Abreviações",
      type: "content" as const,
      contentText: "Evite abreviações desnecessárias. Nomes como 'usr', 'pwd', 'num' podem confundir outros desenvolvedores. Prefira nomes completos como 'user', 'password', 'number'. A clareza é mais importante que a brevidade. Lembre-se: você escreve o código uma vez, mas ele será lido muitas vezes."
    },
    {
      id: "ilha-5",
      name: "Tipos de Dados",
      type: "question" as const,
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
    {
      id: "ilha-6",
      name: "Constantes e Valores Fixos",
      type: "content" as const,
      contentText: "Use constantes para valores que não mudam. Em JavaScript, use 'const' para valores imutáveis. Em outras linguagens, use 'final', 'readonly' ou convenções como UPPER_CASE. Exemplo: const MAX_RETRY_COUNT = 3; const API_BASE_URL = 'https://api.example.com';"
    },
    {
      id: "ilha-7",
      name: "Escopo e Vida Útil",
      type: "question" as const,
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
    }
  ];

  const functionsIslands = [
    {
      id: "funcao-1",
      name: "Introdução às Funções",
      type: "content" as const,
      contentText: "Funções são blocos de código reutilizáveis que executam uma tarefa específica. Elas são fundamentais para organizar código, evitar repetição e tornar o programa mais legível. Uma função bem escrita deve ter um nome claro, fazer apenas uma coisa e ser pequena o suficiente para ser compreendida rapidamente."
    },
    {
      id: "funcao-2",
      name: "Nomes de Funções",
      type: "question" as const,
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
    {
      id: "funcao-3",
      name: "Funções Pequenas",
      type: "content" as const,
      contentText: "Funções devem ser pequenas. Uma regra geral é que uma função não deve ter mais de 20 linhas. Se uma função fica muito grande, divida-a em funções menores. Cada função deve fazer apenas uma coisa e fazê-la bem. Isso melhora a legibilidade e facilita testes e manutenção."
    },
    {
      id: "funcao-4",
      name: "Um Nível de Abstração",
      type: "question" as const,
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
    {
      id: "funcao-5",
      name: "Parâmetros de Função",
      type: "content" as const,
      contentText: "Funções devem ter poucos parâmetros. Idealmente, zero, um ou dois parâmetros. Mais que isso torna a função difícil de usar e entender. Se precisar de muitos parâmetros, considere usar objetos ou dividir a função. Evite parâmetros booleanos que criam múltiplas responsabilidades."
    },
    {
      id: "funcao-6",
      name: "Efeitos Colaterais",
      type: "question" as const,
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
  ];

  const currentIslands = currentSection === 'variables' ? variablesIslands : functionsIslands;
  const sectionTitle = currentSection === 'variables' 
    ? "Trilha das Variáveis" 
    : "Trilha das Funções";

  const handleSectionChange = (section: 'variables' | 'functions') => {
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
      <h1 className="home-title">Bem vindo a trilha do código limpo!</h1>
      <h2 className="section-title">{sectionTitle}</h2>
      
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
    </div>
  );
}
