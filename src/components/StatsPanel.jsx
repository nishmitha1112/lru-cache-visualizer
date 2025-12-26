import { useCache } from "../context/CacheContext";

const StatsPanel = () => {
  const { displayedState } = useCache();
const stats = displayedState.stats;


  return (
    <div className="stats">
      <span className="hit">Hits: {stats.hits}</span>
      <span className="miss">Misses: {stats.misses}</span>
      <span className="eviction">Evictions: {stats.evictions}</span>
    </div>
  );
};

export default StatsPanel;
