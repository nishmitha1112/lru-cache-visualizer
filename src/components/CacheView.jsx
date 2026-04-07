import { useCache } from "../context/CacheContext";
import CacheCard from "./CacheCard";

const CacheView = () => {
 const { displayedState } = useCache();
const cacheState = displayedState.cacheState;


  return (
    <section className="cache-panel panel-card">
      <div className="panel-header">
        <div>
          <div className="panel-title">Cache Items</div>
          <div className="panel-subtitle">MRU → LRU</div>
        </div>
      </div>
      <div className="cache-view">
        {cacheState.map((item, index) => (
          <CacheCard
            key={item.key}
            item={item}
            isMRU={index === 0}
            isLRU={index === cacheState.length - 1}
          />
        ))}
      </div>
    </section>
  );
};

export default CacheView;
