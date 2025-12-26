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
    <div className="controls">

      {/* ================= TOP: Capacity + Reset ================= */}
      <div className="capacity-row">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Enter Capacity"
          value={capacityInput}
          disabled={isDisabled || isCapacityLocked}
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
          Reset Cache
        </button>
      </div>

      {/* ================= MODE SELECTOR ================= */}
      <div className="mode-selector">
        <span>Choose one:</span>
        <button
          disabled={isDisabled}
          className={mode === "PUT" ? "active" : ""}
          onClick={() => setMode("PUT")}
        >
          PUT
        </button>
        <button
          disabled={isDisabled}
          className={mode === "GET" ? "active" : ""}
          onClick={() => setMode("GET")}
        >
          GET
        </button>
      </div>

      {/* ================= PUT SECTION ================= */}
      {mode === "PUT" && (
        <div className="put-section">
          <input
            placeholder="Enter Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            disabled={isDisabled}
          />

          <input
            placeholder="Enter Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={isDisabled}
          />

          <button
            disabled={isDisabled}
            onClick={() => {
              handlePut(key, value);
              setKey("");
              setValue("");
            }}
          >
            Execute PUT
          </button>
        </div>
      )}

      {/* ================= GET SECTION ================= */}
      {mode === "GET" && (
        <div className="get-section">
          <input
            placeholder="Enter Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            disabled={isDisabled}
            className={lastAction === "MISS" ? "miss-anim" : ""}
          />

          <button
            disabled={isDisabled}
            onClick={() => {
              handleGet(key);
              setKey("");
            }}
          >
            Execute GET
          </button>
        </div>
      )}

      

      {/* ================= TIMELINE ================= */}
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

     
    </div>
  );
};

export default ControlPanel;
