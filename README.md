# Shiny Path

Plataforma interativa para aprender Clean Code por meio de trilhas, ilhas de conteúdo, quizzes e desafios práticos.

## Funcionalidades

- Apresentação inicial com o mascote Scot, exibida uma única vez por navegador.
- Cinco trilhas progressivas: Código Limpo, Variáveis, Funções, Comentários e Formatação.
- Ilhas de conteúdo, perguntas de múltipla escolha e desafios de análise de código.
- Sistema de vidas, pontos, streaks e conquistas.
- Mostruário de medalhas: cada trilha concluída libera uma medalha.
- Menu lateral com desbloqueio progressivo e acompanhamento da evolução.
- Seção de créditos do projeto e do IFBA Campus Jacobina.

## Tecnologias

- React 19 + TypeScript
- Vite
- React Router
- Sass
- Tailwind CSS
- Radix Dialog
- Lucide React

## Como executar

Pré-requisitos: Node.js e npm.

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

Para verificar o código com ESLint:

```bash
npm run lint
```

## Estrutura principal

```text
src/
├── components/        # Header, menu, ilhas, mostruário e apresentação
├── data/trails.ts     # Fonte única dos dados das trilhas e ilhas
├── lib/               # Contextos de progresso, gamificação e áudio
├── pages/home/        # Mapa principal das trilhas
└── pages/island/      # Experiência de cada ilha
public/scot/           # Mascote da plataforma
```

Os textos, perguntas, desafios e a ordem das ilhas ficam centralizados em [`src/data/trails.ts`](src/data/trails.ts). Para criar ou alterar uma ilha, edite esse arquivo e mantenha o respectivo identificador no mapa da trilha.

## Progressão

O usuário começa pela trilha de Código Limpo. Ao concluir todas as ilhas de uma trilha, a próxima é desbloqueada e uma medalha é adicionada ao mostruário. A conclusão da apresentação e as medalhas são salvas no `localStorage` do navegador.

## Créditos

Instituto Federal de Educação, Ciência e Tecnologia da Bahia — Campus Jacobina.

- Carlos Eduardo de Souza — Licenciado em Computação (IFBA)
- Profa. Dra. Vanessa dos Santos Rios — Docente do IFBA
