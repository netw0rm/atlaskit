import 'es6-promise/auto'; // 'whatwg-fetch' needs a Promise polyfill
import 'whatwg-fetch';
import debug from '../util/logger';

import { Presence } from '../types';
import { AbstractResource, ResourceProvider } from './MentionResource';

export interface PresenceMap {
  [userId: string]: Presence;
}

export interface PresenceResourceConfig {
  url: string;
  cloudId: string;
  productId?: string;
  cache?: PresenceCache;
  parser?: PresenceParser;
}

export interface PresenceCache {
  contains(userId: string): boolean;
  get(userId: string): Presence|null;
  getBulk(userIds: string[]): PresenceMap;
  getMissingUserIds(userIds: string[]): string[];
  update(presUpdate: PresenceMap): void;
}

export interface PresenceParser {
  mapState(state: string): string;
  parse(response: Response): PresenceMap;
}

export interface PresenceProvider extends ResourceProvider<PresenceMap> {
  refreshPresence(userIds: string[]): void;
}

class AbstractPresenceResource extends AbstractResource<PresenceMap> implements PresenceProvider {
  refreshPresence(userIds: string[]): void {
    throw new Error(`not yet implemented.\nParams: userIds=${userIds}`);
  }

  protected notifyListeners(presences: PresenceMap): void {
    this.changeListeners.forEach((listener, key) => {
      try {
        listener(presences);
      } catch (e) {
        // ignore error from listener
        debug(`error from listener '${key}', ignoring`, e);
      }
    });
  }
}

class PresenceResource extends AbstractPresenceResource {
  private config: PresenceResourceConfig;
  private presenceCache: PresenceCache;
  private presenceParser: PresenceParser;

  constructor(config: PresenceResourceConfig) {
    super();

    if (!config.url) {
      throw new Error('config.url is a required parameter');
    }

    if (!config.cloudId) {
      throw new Error('config.cloudId is a required parameter');
    }

    this.config = config;
    this.presenceCache = config.cache || new DefaultPresenceCache();
    this.presenceParser = config.parser || new DefaultPresenceParser();
  }

  refreshPresence(userIds: string[]): void {
    const cacheHits = this.presenceCache.getBulk(userIds);
    this.notifyListeners(cacheHits);
    const cacheMisses = this.presenceCache.getMissingUserIds(userIds);

    if (cacheMisses.length) {
      this.retrievePresence(cacheMisses);
    }
  }

  private retrievePresence(userIds: string[]) {
    this.queryDirectoryForPresences(userIds)
      .then((res) => this.presenceParser.parse(res))
      .then(presences => {
        this.notifyListeners(presences);
        this.presenceCache.update(presences);
      });
  }

  private queryDirectoryForPresences(userIds: string[]): Promise<Response> {
    let data = {
      query: `query getPresenceForMentions($organizationId: String!, $userIds: [String!], $productId: String) { 
                PresenceBulk(organizationId: $organizationId, product: $productId, userIds: $userIds) { 
                  userId 
                  state
                }
              }`,
      variables: {
        organizationId: this.config.cloudId,
        userIds: userIds
      }
    };
    if (this.config.productId) {
      data.variables['productId'] = this.config.productId;
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include' as 'include',
      body: JSON.stringify(data)
    };
    return fetch(new Request(this.config.url + 'graphql', options)).then(response => response.json());
  }
}

export class DefaultPresenceCache implements PresenceCache {
  private cache: PresenceMap;
  private expiry: number;

  constructor() {
    this.cache = {};
    this.expiry = Date.now(); // Initialise cache in an expired state
  }

  /**
   * Cleans expired entries from cache.
   * (Currently, the entire cache shares a single expiry.  Will possibly add per-entry expires in future.)
   */
  private _clean(): void {
    if (this.expiry < Date.now()) {
      this.cache = {};
    }
  }

  /**
   * Checks if a user exists in the cache
   * @param userId
   */
  contains(userId: string): boolean {
    return this.cache.hasOwnProperty(userId);
  }

  /**
   * Retrieves a presence from the cache after cleaning expired entries
   * @param userId - to index the cache
   * @returns Presence - the presence that matches the userId
   */
  get(userId: string): Presence|null {
    this._clean();
    if (this.cache.hasOwnProperty(userId)) {
      return this._get(userId);
    } else {
      return null;
    }
  }

  /**
   * Internal use version that avoids cleaning the cache each time
   * @param userId - to index the cache
   * @returns Presence - the presence that matches the userId
   */
  private _get(userId: string): Presence {
    return this.cache[userId];
  }

  /**
   * Retrieve multiple presences at once from the cache
   * Cleans cache prior to hitting it.
   * @param userIds - to index the cache
   * @returns PresenceMap - A map of userIds to cached Presences
   */
  getBulk(userIds: string[]): PresenceMap {
    this._clean();
    return this._getBulk(userIds);
  }

  /**
   * Internal use version that avoids cleaning the cache each time
   * @param userIds - to index the cache
   * @returns PresenceMap - A map of userIds to cached Presences
   */
  private _getBulk(userIds: string[]): PresenceMap {
    const presences: PresenceMap = {};
    for (const userId of userIds) {
      if (this.contains(userId)) {
        presences[userId] = this._get(userId);
      }
    }
    return presences;
  }

  /**
   * For a given list of ids, returns a subset
   * of all the ids with missing cache entries.
   * @param userIds - to index the cache
   * @returns string[] - ids missing from the cache
   */
  getMissingUserIds(userIds: string[]): string[] {
    return userIds.filter((id) => !this.contains(id));
  }

  /**
   * Cleans then updates the cache
   * @param presMap
   */
  update(presMap: PresenceMap): void {
    this._clean();
    this._update(presMap);
  }

  /**
   * Updates the cache by adding the new Presence entries and extending the expiry time
   * @param presMap
   */
  private _update(presMap: PresenceMap): void {
    const cacheTimeout: number = 20000;
    Object.keys(presMap)
      .forEach(userId => {
        this.cache[userId] = presMap[userId];
      });
    this.expiry = Date.now() + cacheTimeout;
  }
}

export class DefaultPresenceParser implements PresenceParser {
  mapState(state: string): string {
    if (state === 'unavailable') {
      return 'offline';
    } else if (state === 'available') {
      return 'online';
    } else {
      return state;
    }
  }

  parse(response: Response): PresenceMap {
    const presences: PresenceMap = {};
    if (response.hasOwnProperty('data') && response['data'].hasOwnProperty('PresenceBulk')) {
      const results = response['data'].PresenceBulk;
      // Store map of state and time indexed by userId.  Ignore null results.
      for (const user of results) {
        if (user.userId && user.state) {
          presences[user.userId] = { status: this.mapState(user.state) };
        } else if (!user.hasOwnProperty('userId') || !user.hasOwnProperty('state')) {
          console.error('Unexpected response from presence service contains keys: ' + Object.keys(user));
        }
      }
    }
    return presences;
  }
}

export { AbstractPresenceResource };
export default PresenceResource;
