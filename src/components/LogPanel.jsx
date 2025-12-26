import { useCache } from "../context/CacheContext";

const LogPanel = () => {
  const { displayedState } = useCache();
const logs = displayedState.logs;


  return (
  <div className="logs">
  <div className="logs-title">Logs</div>

  {logs.length === 0 && (
    <div className="logs-empty">
      No operations yet. Start with PUT or GET.
    </div>
  )}

  {logs.map((log, index) => (
    <div key={index} className={`log-item ${log.type}`}>
      {log.message}
    </div>
  ))}
</div>

  );
};

export default LogPanel;
