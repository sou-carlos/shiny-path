import { BrowserRouter } from "react-router-dom";
import { useState } from "react";

import "./App.css";
import { Router } from "./Router";
import { Header } from "./components/header";
import { ProgressProvider } from "./lib/progress-context";
import { GamificationProvider } from "./lib/gamification-context";
import { SoundProvider } from "./lib/sound-context";
import { Welcome } from "./components/welcome";

const WELCOME_STORAGE_KEY = "shiny-path-welcome-completed";

function App() {
  const [isMenuMinimized, setIsMenuMinimized] = useState(false);
  const [hasCompletedWelcome, setHasCompletedWelcome] = useState(
    () => localStorage.getItem(WELCOME_STORAGE_KEY) === "true",
  );

  const completeWelcome = () => {
    localStorage.setItem(WELCOME_STORAGE_KEY, "true");
    setHasCompletedWelcome(true);
  };

  if (!hasCompletedWelcome) {
    return <Welcome onComplete={completeWelcome} />;
  }

  return (
    <SoundProvider>
      <GamificationProvider>
        <ProgressProvider>
          <div className="app-container">
            <Header isMenuMinimized={isMenuMinimized} />
            <BrowserRouter>
              <Router onMenuMinimize={setIsMenuMinimized} />
            </BrowserRouter>
          </div>
        </ProgressProvider>
      </GamificationProvider>
    </SoundProvider>
  );
}

export default App;
