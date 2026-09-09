import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useState } from "react";

import "./styles.scss";

const WELCOME_STEPS = [
  {
    eyebrow: "Olá, eu sou o Scot!",
    title: "Vamos deixar seu código mais claro.",
    description:
      "No Shiny Path, você aprende Clean Code de um jeito leve, prático e no seu ritmo.",
  },
  {
    eyebrow: "Uma trilha por vez",
    title: "Aprenda enquanto explora.",
    description:
      "Passe pelas ilhas, descubra conceitos essenciais e transforme boas práticas em hábito.",
  },
  {
    eyebrow: "Tudo pronto",
    title: "Seu caminho começa agora.",
    description:
      "Complete desafios, acompanhe sua evolução e escreva código que outras pessoas adoram ler.",
  },
];

interface WelcomeProps {
  onComplete: () => void;
}

export function Welcome({ onComplete }: WelcomeProps) {
  const [activeStep, setActiveStep] = useState(0);
  const step = WELCOME_STEPS[activeStep];
  const isLastStep = activeStep === WELCOME_STEPS.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
      return;
    }

    setActiveStep((currentStep) => currentStep + 1);
  };

  return (
    <main className="welcome-screen" aria-labelledby="welcome-title">
      <div className="welcome-screen__glow welcome-screen__glow--one" />
      <div className="welcome-screen__glow welcome-screen__glow--two" />

      <section className="welcome-card">
        <button className="welcome-skip" type="button" onClick={onComplete}>
          Pular apresentação
        </button>

        <div className="welcome-copy">
          <div className="welcome-brand">
            <Sparkles size={18} aria-hidden="true" />
            <span>Shiny Path</span>
          </div>
          <p className="welcome-eyebrow">{step.eyebrow}</p>
          <h1 id="welcome-title">{step.title}</h1>
          <p className="welcome-description">{step.description}</p>

          <div className="welcome-footer">
            <div className="welcome-progress" aria-label={`Etapa ${activeStep + 1} de ${WELCOME_STEPS.length}`}>
              {WELCOME_STEPS.map((_, index) => (
                <span
                  className={index === activeStep ? "is-active" : ""}
                  key={index}
                />
              ))}
            </div>
            <button className="welcome-action" type="button" onClick={handleNext}>
              {isLastStep ? "Começar jornada" : "Continuar"}
              {isLastStep ? <Check size={18} aria-hidden="true" /> : <ArrowRight size={18} aria-hidden="true" />}
            </button>
          </div>
        </div>

        <div className="welcome-mascot" aria-hidden="true">
          <div className="welcome-mascot__halo" />
          <img src="/scot/scot_1.png" alt="" />
          <span className="welcome-mascot__badge">Clean Code</span>
        </div>
      </section>
    </main>
  );
}
