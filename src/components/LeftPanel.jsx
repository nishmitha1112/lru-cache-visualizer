import { useCache } from "../context/CacheContext";

const LeftPanel = () => {
  const { cacheState, capacity } = useCache();

  return (
    <aside className="left-panel panel-card">
      <div className="panel-header">
        <div>
          <div className="panel-title">Capacity</div>
          <div className="panel-subtitle">Current cache usage</div>
        </div>
      </div>
      <div className="cache-usage">
        <div className="usage-text">
          {cacheState.length} / {capacity}
        </div>

        <div className="usage-bar">
          <div
            className="usage-fill"
            style={{
             width: `${(cacheState.length / capacity) * 100}%`

            }}
          />
        </div>
      </div>
    </aside>
  );
};

export default LeftPanel;
