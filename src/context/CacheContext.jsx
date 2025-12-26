import { createContext, useContext, useRef, useState } from "react";
import LRUCache from "../lru/LRUCache";

const CacheContext = createContext();

export const CacheProvider = ({ children }) => {
  const [capacity, setCapacity] = useState(3);
  const [cacheState, setCacheState] = useState([]);
  const [activeKey, setActiveKey] = useState(null);
const [lastAction, setLastAction] = useState(null);
const [evictedKey, setEvictedKey] = useState(null);
const [isCapacityLocked, setIsCapacityLocked] = useState(false);
const [theme, setTheme] = useState("dark");

  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({ hits: 0, misses: 0, evictions: 0 });
  const [mode, setMode] = useState("PUT");
  const [isAnimating, setIsAnimating] = useState(false);

  const cacheRef = useRef(new LRUCache(capacity));
  const [history, setHistory] = useState([]);
const [historyIndex, setHistoryIndex] = useState(-1);


const resetCache = () => {
  cacheRef.current.reset();
  setCacheState([]);
  setLogs([]);
  setStats({ hits: 0, misses: 0, evictions: 0 });
  setIsCapacityLocked(false);
  setHistory([]);
  setHistoryIndex(-1);
};

const updateCapacity = (value) => {
  setCapacity(value);
  cacheRef.current = new LRUCache(value);

  setCacheState([]);
  setLogs([]);
  setStats({ hits: 0, misses: 0, evictions: 0 });
};

  const addLog = (type, message) => {
    setLogs(prev => [...prev, { type, message }]);
  };
  const recordSnapshot = () => {
  setHistory(prev => [
    ...prev.slice(0, historyIndex + 1),
    {
      cacheState: cacheRef.current.getCacheState(),
      logs: [...logs],
      stats: { ...cacheRef.current.getStats() },
      activeKey,
      lastAction,
      evictedKey
    }
  ]);

  setHistoryIndex(prev => prev + 1);
};


 const handleGet = (key) => {
  setIsAnimating(true);
   setIsCapacityLocked(true);
  setActiveKey(key);

  const result = cacheRef.current.get(key);

  if (result.status === "HIT") {
    setLastAction("HIT");
    addLog("hit", `Cache HIT for key "${key}"`);
  } else {
    setLastAction("MISS");
    addLog("miss", `Cache MISS for key "${key}"`);
  }

  setCacheState(cacheRef.current.getCacheState());
  setStats(cacheRef.current.getStats());
recordSnapshot();

  setTimeout(() => {
    setIsAnimating(false);
    setActiveKey(null);
    setLastAction(null);
  }, 800);
};

const handlePut = (key, value) => {
  setIsAnimating(true);
  setIsCapacityLocked(true); 
  setActiveKey(key);
  setLastAction("PUT");
  setEvictedKey(null);

  const result = cacheRef.current.put(key, value);

  addLog("put", `Inserted key "${key}"`);

  if (result.eviction) {
    setEvictedKey(result.eviction.key);
    addLog("eviction", `Evicted LRU key "${result.eviction.key}"`);
  }
  setCacheState(cacheRef.current.getCacheState());
  setStats(cacheRef.current.getStats());
  recordSnapshot();

  setTimeout(() => {
    setIsAnimating(false);
    setActiveKey(null);
    setLastAction(null);
    setEvictedKey(null);
  }, 900);
};
const isViewingHistory =
  historyIndex >= 0 && historyIndex < history.length - 1;

const displayedState = isViewingHistory
  ? history[historyIndex]
  : {
      cacheState,
      logs,
      stats,
      activeKey,
      lastAction,
      evictedKey
    };



  return (
    <CacheContext.Provider
value={{
  capacity,
  displayedState,
isViewingHistory,
  cacheState,
  logs,
  stats,
  mode,
  setMode,
  isAnimating,
  isCapacityLocked,
  activeKey,
  lastAction,
  evictedKey,
  theme,
  setTheme,
  history,
  historyIndex,
  setHistoryIndex,
  updateCapacity,
  handleGet,
  handlePut,
  resetCache
}}

    >
      {children}
    </CacheContext.Provider>
  );
};

export const useCache = () => useContext(CacheContext);
