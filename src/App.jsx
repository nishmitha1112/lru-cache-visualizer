import Header from "./components/Header";
import ControlPanel from "./components/ControlPanel";
import CacheView from "./components/CacheView";
import StatsPanel from "./components/StatsPanel";
import LogPanel from "./components/LogPanel";
import { CacheProvider } from "./context/CacheContext";
import "./styles/global.css";
import "./styles/animations.css";
import "./styles/themes.css";
import LeftPanel from "./components/LeftPanel";
import { useState, useEffect } from "react";

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <CacheProvider>
      <div className="app-shell">
        <Header theme={theme} setTheme={setTheme} />
        <main className="main-layout">
          <div className="left-section">
            <LeftPanel />
            <CacheView />
          </div>
          <div className="right-section">
            <ControlPanel />
            <StatsPanel />
            <LogPanel />
          </div>
        </main>
      </div>
    </CacheProvider>
  );
}

export default App;
