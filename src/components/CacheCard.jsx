import { useCache } from "../context/CacheContext";

const CacheCard = ({ item, isLRU }) => {
  const { displayedState } = useCache();
const { activeKey, lastAction, evictedKey } = displayedState;


  const isActive = activeKey === item.key;
  const isEvicted = evictedKey === item.key;

  let className = "cache-card";

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

    {isLRU && (
      <div className="lru-indicator">
        ↑ LRU
      </div>
    )}
  </div>
);
};

export default CacheCard;
