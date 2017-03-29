import { EmojiDescription, EmojiId, EmojiResponse, OptionalEmojiDescription, SearchOptions } from '../types';
import EmojiLoader from './EmojiLoader';
import EmojiRepository, { EmojiSearchResult } from './EmojiRepository';
import { requestService, ServiceConfig } from './SharedResourceUtils';
import { AbstractResource, OnProviderChange, Provider } from './SharedResources';

export interface EmojiResourceConfig {
  /**
   * The service configuration for recording emoji selections.
   * A post will be performed to this URL with the EmojiId as the body.
   */
  recordConfig?: ServiceConfig;

  /**
   * This defines the different providers. Later providers will override earlier
   * providers when performing shortName based look up.
   */
  providers: ServiceConfig[];
}

export interface OnEmojiProviderChange extends OnProviderChange<EmojiSearchResult, any, void> {};

export interface Retry<T> {
  (): Promise<T>;
}

export interface ResolveReject<T> {
  resolve(result: T): void;
  reject(reason?: any): void;
}

export interface EmojiProvider extends Provider<string, EmojiSearchResult, any, undefined, SearchOptions> {
  /**
   * Returns the first matching emoji matching the shortName, or null if none found.
   */
  findByShortName(shortName: string): Promise<OptionalEmojiDescription>;

  /**
   * Returns the first matching emoji matching the emojiId.id.
   *
   * If not found or emojiId.id is undefined, fallback to a search by shortName.
   *
   * Returns undefined if none found.
   */
  findByEmojiId(emojiId: EmojiId): Promise<OptionalEmojiDescription>;

  /**
   * Finds emojis belonging to specified category.
   */
  findInCategory(categoryId: string): Promise<EmojiDescription[]>;

  /**
   * Records an emoji selection, for example for using in tracking recent emoji.
   *
   * Optional.
   */
  recordSelection?(id: EmojiId): Promise<any>;
}

interface LastQuery {
  query?: string;
  options?: SearchOptions;
}

export default class EmojiResource extends AbstractResource<string, EmojiSearchResult, any, undefined, SearchOptions> implements EmojiProvider {
  private recordConfig?: ServiceConfig;
  private emojiRepository: EmojiRepository;
  private lastQuery: LastQuery;
  private activeLoaders: number = 0;
  private retries: Map<Retry<any>, ResolveReject<any>> = new Map();

  // private mediaApiToken?: MediaApiToken;

  constructor(config: EmojiResourceConfig) {
    super();
    this.recordConfig = config.recordConfig;

    // Ensure order is retained by tracking until all done.
    const emojiResponses: EmojiResponse[] = [];

    this.activeLoaders = config.providers.length;

    config.providers.forEach((provider, index) => {
      const loader = new EmojiLoader(provider);
      const emojis = loader.loadEmoji();
      emojis.then((emojiResponse) => {
        this.activeLoaders--;
        emojiResponses[index] = emojiResponse;
        this.initEmojiService(emojiResponses);
        this.performRetries();
        this.refreshLastFilter();
      }).catch((reason) => {
        this.activeLoaders--;
        this.notifyError(reason);
      });
    });

    if (config.providers.length === 0) {
      throw new Error('No providers specified');
    }
  }

  private initEmojiService(emojiResponses: EmojiResponse[]): void {
    let emojis: EmojiDescription[] = [];
    emojiResponses.forEach(emojiResponse => {
      emojis = emojis.concat(emojiResponse.emojis);
    });
    this.emojiRepository = new EmojiRepository(emojis);
  }

  private performRetries(): void {
    const currentRetries = this.retries;
    this.retries = new Map();
    currentRetries.forEach((resolveReject, retry) => {
      retry().then(response => {
        resolveReject.resolve(response);
      })
      .catch(reason => {
        resolveReject.reject(reason);
      });
    });
  }

  private refreshLastFilter(): void {
    if (typeof this.lastQuery !== 'undefined') {
      const { query, options } = this.lastQuery;
      this.filter(query, options);
    }
  }

  private isLoaded = () => {
    return !this.activeLoaders;
  }

  private retryIfLoading<T>(retry: Retry<T>, defaultResponse?: T): Promise<T | undefined> {
    if (!this.isLoaded()) {
      return new Promise<T>((resolve, reject) => {
        this.retries.set(retry, { resolve, reject });
      });
    }
    return Promise.resolve<T | undefined>(defaultResponse);
  }

  filter(query?: string, options?: SearchOptions): void {
    this.lastQuery = {
      query: query || '',
      options,
    };
    if (this.emojiRepository) {
      const searchResult = this.emojiRepository.search(query, options);
      this.notifyResult(searchResult);
    } else {
      // not ready
      this.notifyNotReady();
    }
  }

  findByShortName(shortName: string): Promise<OptionalEmojiDescription> {
    if (this.isLoaded()) {
      // Wait for all emoji to load before looking by shortName (to ensure correct priority)
      const emoji = this.emojiRepository.findByShortName(shortName);
      return Promise.resolve(emoji);
    }
    return this.retryIfLoading(() => this.findByShortName(shortName), undefined);
  }

  findByEmojiId(emojiId: EmojiId): Promise<OptionalEmojiDescription> {
    const { id, shortName } = emojiId;
    if (this.emojiRepository) {
      if (id) {
        const emoji = this.emojiRepository.findById(id);
        if (emoji) {
          return Promise.resolve(emoji);
        }
        if (this.isLoaded()) {
          // all loaded but not found by id, fallback to searching by shortName to
          // at least render an alternative
          return this.findByShortName(shortName);
        }
      } else {
        // no id fallback to shortName
        return this.findByShortName(shortName);
      }
    }
    return this.retryIfLoading(() => this.findByEmojiId(emojiId), undefined);
  }

  findInCategory(categoryId: string): Promise<EmojiDescription[]> {
    if (this.emojiRepository) {
      return Promise.resolve(this.emojiRepository.findInCategory(categoryId));
    }
    return this.retryIfLoading(() => this.findInCategory(categoryId), []);
  }

  recordSelection(id: EmojiId): Promise<any> {
    if (this.recordConfig) {
      const { refreshedSecurityProvider, securityProvider, url } = this.recordConfig;
      const secOptions = securityProvider && securityProvider();
      const data = {
        emojiId: id,
      };
      const options = {
        method: 'POST',
      };
      return requestService(url, undefined, data, options, secOptions, refreshedSecurityProvider);
    }
    return Promise.reject('Resource does not support recordSelection');
  }
}
