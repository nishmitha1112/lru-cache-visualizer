import { useCache } from "../context/CacheContext";
import CacheCard from "./CacheCard";

const CacheView = () => {
 const { displayedState } = useCache();
const cacheState = displayedState.cacheState;


  return (
    <div className="cache-view">
      {cacheState.map((item, index) => (
        <CacheCard
          key={item.key}
          item={item}
          isLRU={index === cacheState.length - 1}
        />
      ))}
    </div>
  );
};

export default CacheView;
