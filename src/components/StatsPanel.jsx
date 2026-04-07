import { useCache } from "../context/CacheContext";

const StatsPanel = () => {
  const { displayedState } = useCache();
const stats = displayedState.stats;


  return (
    <section className="stats-panel panel-card">
      <div className="panel-header">
        <div>
          <div className="panel-title">Cache Statistics</div>
          <div className="panel-subtitle">Real-time hits, misses, and evictions</div>
        </div>
      </div>
      <div className="stats">
        <div className="stat-card hit" title="Number of successful cache hits">
          <span className="stat-label">Hits</span>
          <span className="stat-value">{stats.hits}</span>
        </div>
        <div className="stat-card miss" title="Number of cache misses">
          <span className="stat-label">Misses</span>
          <span className="stat-value">{stats.misses}</span>
        </div>
        <div className="stat-card eviction" title="Number of items evicted from cache">
          <span className="stat-label">Evictions</span>
          <span className="stat-value">{stats.evictions}</span>
        </div>
      </div>
    </section>
  );
};

export default StatsPanel;
