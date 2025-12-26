import { useCache } from "../context/CacheContext";

const LeftPanel = () => {
  const { cacheState, capacity } = useCache();

  return (
    <div className="left-panel">
      <div className="cache-usage">
        <div className="usage-text">
          Cache Usage: {cacheState.length} / {capacity}
        </div>

        <div className="usage-bar">
          <div
            className="usage-fill"
            style={{
             height: `${(cacheState.length / capacity) * 100}%`

            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
