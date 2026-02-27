import { Island } from "../../components/island";
import { useProgress } from "../../lib/progress-context";
import type { SectionType } from "../../lib/progress-context";
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

  const cleanCodeIslands = [
    {
      id: "codigo-limpo-1",
      name: "O que é Código Limpo?",
      type: "content" as const,
      contentText: "Código Limpo (Clean Code) é uma filosofia de programação que prioriza a legibilidade, simplicidade e manutenibilidade do código. Popularizado por Robert C. Martin (Uncle Bob), o conceito defende que código deve ser escrito para ser facilmente entendido por humanos. Código limpo comunica claramente sua intenção, evita ambiguidades e facilita modificações."
    },
    {
      id: "codigo-limpo-2",
      name: "Por que o Código Limpo Importa?",
      type: "content" as const,
      contentText: "Programadores passam muito mais tempo lendo código do que escrevendo. Código mal escrito dificulta manutenção, introduz bugs e desperdiça tempo da equipe. Código limpo reduz custos de manutenção, acelera o início de novos desenvolvedores e torna o software mais confiável. É um investimento que se paga rapidamente."
    },
    {
      id: "codigo-limpo-3",
      name: "Princípios do Código Limpo",
      type: "content" as const,
      contentText: "Os pilares do código limpo incluem: nomes significativos (variáveis e funções que revelam intenção), funções pequenas e focadas, comentários úteis (não redundantes), e formatação consistente. Nesta trilha você explorará cada um desses temas em detalhes. O objetivo é transformar a escrita de código em uma arte de comunicação clara."
    },
    {
      id: "codigo-limpo-4",
      name: "Quiz: Você Entendeu?",
      type: "question" as const,
      contentText: "Teste seu entendimento sobre Código Limpo",
      questionData: {
        question: "Qual é o principal benefício do Código Limpo?",
        answers: [
          "A: O código executa mais rápido",
          "B: O código é mais fácil de ler, entender e manter",
          "C: O código ocupa menos espaço em disco",
          "D: O código funciona em qualquer linguagem"
        ],
        correctAnswer: 1
      }
    }
  ];

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

  const commentsIslands = [
    {
      id: "comentario-1",
      name: "Introdução aos Comentários",
      type: "content" as const,
      contentText: "Comentários são explicações escritas no código para ajudar outros desenvolvedores (e você mesmo no futuro) a entender o que o código faz. Comentários bem escritos explicam o 'porquê' e não o 'como'. Código limpo deve ser autoexplicativo, mas comentários são úteis para explicar decisões de negócio, algoritmos complexos ou contexto histórico."
    },
    {
      id: "comentario-2",
      name: "Comentários Úteis",
      type: "question" as const,
      contentText: "Teste sobre comentários úteis",
      questionData: {
        question: "Qual é o melhor tipo de comentário?",
        answers: [
          "A: Comentários que explicam o que o código faz",
          "B: Comentários que explicam por que o código existe",
          "C: Comentários que traduzem código para português",
          "D: Comentários que descrevem cada linha"
        ],
        correctAnswer: 1
      }
    },
    {
      id: "comentario-3",
      name: "Evitando Comentários Desnecessários",
      type: "code-error" as const,
      contentText: "Identifique comentários desnecessários",
      codeErrorData: {
        question: "Identifique os comentários desnecessários no código:",
        codeSnippet: `// Função que calcula o total
function calculateTotal(items) {
  // Inicializa total com zero
  let total = 0;
  
  // Loop pelos itens
  for (let item of items) {
    // Soma o preço ao total
    total += item.price;
  }
  
  // Retorna o total
  return total;
}`,
        errorLines: [1, 3, 5, 7, 9],
        explanation: "Os comentários nas linhas 1, 3, 5, 7 e 9 são desnecessários porque apenas repetem o que o código já deixa claro. O código é autoexplicativo e não precisa desses comentários óbvios."
      }
    },
    {
      id: "comentario-4",
      name: "Comentários de TODO",
      type: "content" as const,
      contentText: "Comentários TODO são úteis para marcar código temporário ou melhorias futuras. Use-os com moderação e sempre inclua um prazo ou responsável. Exemplo: // TODO: Refatorar esta função até 15/12/2024 - João. Evite deixar TODOs antigos no código, pois podem se tornar 'lixo técnico'."
    },
    {
      id: "comentario-5",
      name: "Documentação de Funções",
      type: "question" as const,
      contentText: "Teste sobre documentação",
      questionData: {
        question: "Quando você deve documentar uma função?",
        answers: [
          "A: Sempre, mesmo para funções simples",
          "B: Apenas para funções públicas ou complexas",
          "C: Nunca, o código deve ser autoexplicativo",
          "D: Apenas quando solicitado pelo chefe"
        ],
        correctAnswer: 1
      }
    },
    {
      id: "comentario-6",
      name: "Comentários de Bloco",
      type: "content" as const,
      contentText: "Use comentários de bloco para explicar algoritmos complexos ou decisões arquiteturais importantes. Eles devem ser informativos e atualizados. Se o código mudar, atualize também os comentários. Comentários desatualizados são piores que nenhum comentário."
    }
  ];

  const formattingIslands = [
    {
      id: "formatacao-1",
      name: "Introdução à Formatação",
      type: "content" as const,
      contentText: "A formatação do código é fundamental para a legibilidade. Código bem formatado é mais fácil de ler, entender e manter. Use indentação consistente, espaçamento adequado e quebras de linha estratégicas. A formatação deve seguir um padrão consistente em todo o projeto."
    },
    {
      id: "formatacao-2",
      name: "Indentação Consistente",
      type: "question" as const,
      contentText: "Teste sobre indentação",
      questionData: {
        question: "Qual é a melhor prática para indentação?",
        answers: [
          "A: Usar espaços e tabs misturados",
          "B: Usar apenas espaços ou apenas tabs consistentemente",
          "C: Não usar indentação",
          "D: Usar quantos espaços quiser"
        ],
        correctAnswer: 1
      }
    },
    {
      id: "formatacao-3",
      name: "Acerte o Erro - Formatação",
      type: "code-error" as const,
      contentText: "Identifique problemas de formatação",
      codeErrorData: {
        question: "Identifique os problemas de formatação no código:",
        codeSnippet: `function processUserData(user){
let name=user.name;
let email=user.email;
let age=user.age;
if(age>=18){
console.log('Adulto');
}else{
console.log('Menor');
}
return{name,email,age};
}`,
        errorLines: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        explanation: "O código tem vários problemas de formatação: falta espaços após vírgulas e operadores, falta quebras de linha, indentação inconsistente. Código bem formatado é mais legível e profissional."
      }
    },
    {
      id: "formatacao-4",
      name: "Quebras de Linha",
      type: "content" as const,
      contentText: "Use quebras de linha para separar conceitos diferentes. Linhas muito longas (mais de 80-120 caracteres) devem ser quebradas. Quebre após vírgulas, operadores ou pontos lógicos. Mantenha relacionamentos visuais claros entre elementos relacionados."
    },
    {
      id: "formatacao-5",
      name: "Espaçamento",
      type: "question" as const,
      contentText: "Teste sobre espaçamento",
      questionData: {
        question: "Onde você deve usar espaços em branco?",
        answers: [
          "A: Apenas no início das linhas",
          "B: Ao redor de operadores e após vírgulas",
          "C: Nunca usar espaços",
          "D: Em qualquer lugar que parecer bom"
        ],
        correctAnswer: 1
      }
    },
    {
      id: "formatacao-6",
      name: "Agrupamento Lógico",
      type: "content" as const,
      contentText: "Agrupe linhas relacionadas e separe grupos diferentes com linhas em branco. Declarações de variáveis, imports, funções relacionadas devem estar próximas. Use linhas em branco para criar 'parágrafos' no código, facilitando a leitura e compreensão."
    }
  ];

  const currentIslands = currentSection === 'clean-code' ? cleanCodeIslands :
                         currentSection === 'variables' ? variablesIslands : 
                         currentSection === 'functions' ? functionsIslands :
                         currentSection === 'comments' ? commentsIslands :
                         currentSection === 'formatting' ? formattingIslands : [];
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
