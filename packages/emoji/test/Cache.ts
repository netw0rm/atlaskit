export interface CacheOptions {
  ttl?: number;
}

interface Entry {
  value: any;
  timeout: any;
}

export default class Cache {
  private options: CacheOptions;
  private cache = new Map<string, Entry>();

  constructor(options: CacheOptions) {
    this.options = {
      ttl: 10000,
      ...options
    };
  }

  put(key: string, value: any) {
    const prev = this.cache.get(key);
    if (prev) {
      clearTimeout(prev.timeout);
      this.cache.delete(key);
    }
    const next: Entry = {
      value,
      timeout: setTimeout(() => {
        this.cache.delete(key);
      }, this.options.ttl)
    };
    this.cache.set(key, next);
  }

  get(key: string): any {
    const entry = this.cache.get(key);
    return entry && entry.value;
  }

  getOrCreate(key: string, create: () => any): any {
    let data = this.get(key);
    if (!data) {
      data = create();
    }
    // Force ttl reset to keep alive
    this.put(key, data);
    return data;
  }
}
