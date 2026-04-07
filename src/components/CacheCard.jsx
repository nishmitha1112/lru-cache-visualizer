import { useCache } from "../context/CacheContext";

const CacheCard = ({ item, isMRU, isLRU }) => {
  const { displayedState } = useCache();
const { activeKey, lastAction, evictedKey } = displayedState;


  const isActive = activeKey === item.key;
  const isEvicted = evictedKey === item.key;

  let className = "cache-card";

  if (isMRU) className += " mru";
  if (isLRU) className += " lru";
  if (isActive && lastAction === "HIT") className += " hit-anim";
  if (isActive && lastAction === "PUT") className += " put-anim";
  if (isEvicted) className += " evict-anim";
  if (!isActive && activeKey) className += " faded";

return (
  <div className="cache-card-wrapper">
    <div className={className}>
      <div className="key">{item.key}</div>
      <div className="value">{item.value}</div>
    </div>

    <div className="position-badges">
      {isMRU && <div className="position-indicator mru-indicator" title="Most Recently Used - this item was accessed or added last">MRU</div>}
      {isLRU && <div className="position-indicator lru-indicator" title="Least Recently Used - this item will be evicted next if cache is full">LRU</div>}
    </div>
  </div>
);
};

export default CacheCard;
