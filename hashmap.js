const HashMap = () => {
  let capacity = 0;
  let maxCapacity = 16;
  const LOADFACTOR = 0.75;
  let buckets = [];

  for (let i = 0; i < maxCapacity; i++) {
    buckets.push(null);
  }

  function hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % maxCapacity;
    }
    return hashCode;
  }

  function expandMaxCapacity() {
    maxCapacity *= 2;
    for (let i = 0; i < maxCapacity; i++) {
      if (!buckets[i]) buckets[i] = null;
    }
  }

  function set(key, value) {
    if (capacity / maxCapacity > LOADFACTOR) {
      expandMaxCapacity();
    }
    let index = hash(key);
    validateIndex(index);
    if (!buckets[index]) {
      buckets[index] = [[key, value]];
    } else { 
      buckets[index].push([key, value]);
    }
    capacity++;
  }

  function logBuckets() {
    console.log('buckets:');
    for (let i = 0; i < buckets.length; i++) {
      console.log(i.toString() + " - " + (buckets[i] ?? "null"));
    }
  }

  function validateIndex(index) {
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
  }

  function get(key) {
    let index = hash(key); 
    validateIndex(index);
    if (buckets[index]) {
      for (let j = 0; j < buckets[index].length; j++) {
        if (buckets[index][j][0] === key) {
          return buckets[index][j][1];
        }
      }
    };
    return null;
  }

  function has(key) {
    return get(key) ? true : false;
  }

  function remove(key) {
    let index = hash(key); 
    validateIndex(index);
    if (buckets[index]) {
      for (let j = 0; j < buckets[index].length; j++) {
        if (buckets[index][j][0] === key) {
          if (buckets[index].length > 1) {
            buckets[index].splice(j, 1);
            return true;
          } else {
            buckets[index] = null;
            return true;
          }
        }
      }
    };
    return false;
  }

  function length() {
    let count = 0;
    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i]) count += buckets[i].length;
    }
    return count;
  }

  function clear() {
    buckets = [];
    maxCapacity = 16;
    for (let i = 0; i < maxCapacity; i++) {
      buckets.push(null);
    }
  }

  function keys() {
    const keys = [];
    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i]) keys.push(...buckets[i].map((item) => item[0]));
    }
    return keys;
  }

  function values() {
    const values = [];
    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i]) values.push(...buckets[i].map((item) => item[1]));
    }
    return values;
  }

  function entries() {
    const entries = [];
    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i]) entries.push(...buckets[i]);
    }
    return entries;
  }

  return {
    set,
    logBuckets,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries
  }
};


const myhashmap = HashMap();
myhashmap.set('project', 'odin')
myhashmap.set('web', 'developer')
myhashmap.set('flipper', 'seven')
myhashmap.set('mr', 'beast')
myhashmap.set('tyler', 'durden')
myhashmap.set('john', 'lennon')
myhashmap.set('mike', 'tyson')
myhashmap.set('curt', 'kobain')
myhashmap.set('pavel', 'durov')
myhashmap.set('morgan', 'freeman')
myhashmap.set('kill', 'bill')
myhashmap.set('fort', 'night')
myhashmap.logBuckets();