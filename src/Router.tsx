import { Route, Routes } from "react-router-dom";

import { Home } from "./pages/home";
import { IslandPage } from "./pages/island";

interface RouterProps {
  onMenuMinimize?: (minimized: boolean) => void;
}

export function Router({ onMenuMinimize }: RouterProps) {
  return (
    <Routes>
      <Route path="/" element={<Home onMenuMinimize={onMenuMinimize} />} />
      <Route path="/island/:islandId" element={<IslandPage />} />
    </Routes>
  );
}
