import { BrowserRouter } from "react-router-dom";
import { useState } from "react";

import "./App.css";
import { Router } from "./Router";
import { Header } from "./components/header";
import { ProgressProvider } from "./lib/progress-context";
import { GamificationProvider } from "./lib/gamification-context";
import { SoundProvider } from "./lib/sound-context";

function App() {
  const [isMenuMinimized, setIsMenuMinimized] = useState(false);

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
