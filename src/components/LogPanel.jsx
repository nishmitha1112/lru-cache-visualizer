import { useCache } from "../context/CacheContext";

const LogPanel = () => {
  const { displayedState } = useCache();
const logs = displayedState.logs;


  return (
    <section className="log-panel panel-card">
      <div className="panel-header">
        <div>
          <div className="panel-title">Activity Timeline</div>
          <div className="panel-subtitle">Recent cache operations</div>
        </div>
      </div>

      <div className="logs-content">
        {logs.length === 0 && (
          <div className="logs-empty">
            No operations yet. Start with PUT or GET.
          </div>
        )}

        {logs.map((log, index) => (
          <div key={index} className={`log-item ${log.type}`} title={`${log.type}: ${log.message}`}>
            <span className="log-icon">
              {log.type === "HIT" && "✅"}
              {log.type === "MISS" && "❌"}
              {log.type === "INSERT" && "➕"}
            </span>
            {log.message}
          </div>
        ))}
      </div>
    </section>
  );
};

export default LogPanel;
