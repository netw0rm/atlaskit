/**
 * TODO: Replace other LRUCache usage by this
 */
import {LRUCache} from 'lru-fast';

const CACHE_SIZE = 200;
const cache = new LRUCache(CACHE_SIZE);

export const set = (key: string = '', value: any) : any => {
  cache.set(key, value);

  return get(key);
};

export const get = (key: string = '') : any => {
  return cache.get(key);
};

export const getWithDefault = (key: string = '', value: Function) : any => {
  if (get(key)) { return get(key); }

  return set(key, value());
};

export default {
  set,
  get,
  getWithDefault
};
