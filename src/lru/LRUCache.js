// src/lru/LRUCache.js

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();

    // Dummy head & tail
    this.head = new Node(null, null); // Most recent side
    this.tail = new Node(null, null); // Least recent side

    this.head.next = this.tail;
    this.tail.prev = this.head;

    // Stats
    this.hits = 0;
    this.misses = 0;
    this.evictions = 0;
  }

  // ---------- INTERNAL HELPERS ----------
  _remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  _addAfterHead(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }

  _getLRUNode() {
    return this.tail.prev;
  }

  // ---------- GET ----------
  get(key) {
    if (!this.map.has(key)) {
      this.misses++;
      return {
        status: "MISS",
        key,
        value: null
      };
    }

    const node = this.map.get(key);
    this._remove(node);
    this._addAfterHead(node);

    this.hits++;

    return {
      status: "HIT",
      key,
      value: node.value
    };
  }

  // ---------- PUT ----------
  put(key, value) {
    let eviction = null;

    if (this.map.has(key)) {
      const existingNode = this.map.get(key);
      this._remove(existingNode);
    }

    const newNode = new Node(key, value);
    this._addAfterHead(newNode);
    this.map.set(key, newNode);

    if (this.map.size > this.capacity) {
      const lruNode = this._getLRUNode();
      this._remove(lruNode);
      this.map.delete(lruNode.key);

      this.evictions++;
      eviction = {
        key: lruNode.key,
        value: lruNode.value
      };
    }

    return {
      status: "PUT",
      key,
      value,
      eviction
    };
  }

  // ---------- STATE FOR UI ----------
  getCacheState() {
    const result = [];
    let current = this.head.next;

    while (current !== this.tail) {
      result.push({
        key: current.key,
        value: current.value
      });
      current = current.next;
    }

    return result;
  }

  getStats() {
    return {
      hits: this.hits,
      misses: this.misses,
      evictions: this.evictions
    };
  }

  reset() {
    this.map.clear();
    this.head.next = this.tail;
    this.tail.prev = this.head;

    this.hits = 0;
    this.misses = 0;
    this.evictions = 0;
  }
}

export default LRUCache;
