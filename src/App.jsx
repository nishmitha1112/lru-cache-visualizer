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


function App() {

  return (
    <CacheProvider>
      <Header />

      
      <div className="main-layout">
        <LeftPanel />

        <div className="center-panel">
          <ControlPanel />
          <StatsPanel />
          <CacheView />
          <LogPanel />
        </div>

        <div className="right-panel"></div>
      </div>
    </CacheProvider>
  );
}

export default App;
