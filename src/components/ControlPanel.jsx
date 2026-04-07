import { useEffect, useState } from "react";
import { useCache } from "../context/CacheContext";

const ControlPanel = () => {
  const {
    capacity,
    updateCapacity,
    mode,
    setMode,
    handleGet,
    handlePut,
    resetCache,
    isAnimating,
    isCapacityLocked,
    lastAction,
    history,
    historyIndex,
    setHistoryIndex,
    isViewingHistory
  } = useCache();

  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [capacityInput, setCapacityInput] = useState(capacity.toString());

  useEffect(() => {
    setCapacityInput(capacity.toString());
  }, [capacity]);

  const isDisabled = isAnimating || isViewingHistory;

  return (
    <section className="panel-card controls-panel">
      <div className="panel-header">
        <div>
          <div className="panel-title">Cache Control</div>
          <div className="panel-subtitle">Configure capacity and run operations</div>
        </div>
      </div>

      <div className="capacity-row">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Capacity"
          value={capacityInput}
          disabled={isDisabled || isCapacityLocked}
          title="Set the maximum number of items the cache can hold"
          onChange={(e) => {
            const val = e.target.value;
            if (val === "") {
              setCapacityInput("");
              return;
            }
            if (!/^[0-9]+$/.test(val)) return;

            const num = Number(val);
            if (num >= 1 && num <= 50) {
              setCapacityInput(val);
              updateCapacity(num);
            }
          }}
        />

        <button
          className="reset-btn"
          onClick={() => {
            resetCache();
            setKey("");
            setValue("");
            setCapacityInput("");
          }}
        >
          🔄 Reset Cache
        </button>
      </div>

      <div className="mode-selector">
        <span>Mode</span>
        <button
          disabled={isDisabled}
          className={mode === "PUT" ? "active" : ""}
          onClick={() => setMode("PUT")}
          title="Switch to PUT mode to add or update cache items"
        >
          ➕ PUT
        </button>
        <button
          disabled={isDisabled}
          className={mode === "GET" ? "active" : ""}
          onClick={() => setMode("GET")}
          title="Switch to GET mode to retrieve cache items"
        >
          🔍 GET
        </button>
      </div>

      {mode === "PUT" && (
        <div className="put-section">
          <input
            placeholder="Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            disabled={isDisabled}
            title="Enter the key for the cache item"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isDisabled) {
                handlePut(key, value);
                setKey("");
                setValue("");
              }
            }}
          />

          <input
            placeholder="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={isDisabled}
            title="Enter the value for the cache item"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isDisabled) {
                handlePut(key, value);
                setKey("");
                setValue("");
              }
            }}
          />

          <button
            disabled={isDisabled}
            onClick={() => {
              handlePut(key, value);
              setKey("");
              setValue("");
            }}
            title="Add or update the item in the cache"
          >
            🚀 Execute PUT
          </button>
        </div>
      )}

      {mode === "GET" && (
        <div className="get-section">
          <input
            placeholder="Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            disabled={isDisabled}
            className={lastAction === "MISS" ? "miss-anim" : ""}
            title="Enter the key to retrieve from the cache"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isDisabled) {
                handleGet(key);
                setKey("");
              }
            }}
          />

          <button
            disabled={isDisabled}
            onClick={() => {
              handleGet(key);
              setKey("");
            }}
            title="Retrieve the item from the cache"
          >
            🔍 Execute GET
          </button>
        </div>
      )}

      {history.length > 0 && (
        <div className="timeline-control">
          <label>
            Timeline: Step {historyIndex + 1} / {history.length}
          </label>

          <input
            type="range"
            min="0"
            max={history.length - 1}
            value={historyIndex}
            onChange={(e) => setHistoryIndex(Number(e.target.value))}
          />

          {isViewingHistory && (
            <div className="timeline-hint">
              Viewing history (read-only)
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default ControlPanel;
