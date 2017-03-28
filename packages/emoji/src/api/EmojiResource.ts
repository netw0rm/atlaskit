import { EmojiDescription, EmojiId, EmojiModifiers, EmojiResponse, OptionalEmojiDescription } from '../types';
import EmojiLoader from './EmojiLoader';
import EmojiService, { EmojiSearchResult } from './EmojiService';
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
   * providers when performing shortcut based look up.
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

export interface EmojiProvider extends Provider<string, EmojiSearchResult, any, undefined, EmojiModifiers> {
  /**
   * Returns the first matching emoji matching the shortcut, or null if none found.
   */
  findByShortcut(shortcut: string, modifiers?: EmojiModifiers): Promise<OptionalEmojiDescription>;

  /**
   * Returns the first matching emoji matching the emojiId.id.
   *
   * If not found or emojiId.id is undefined, fallback to a search by shortcut.
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
  modifiers?: EmojiModifiers;
}

export default class EmojiResource extends AbstractResource<string, EmojiSearchResult, any, undefined, EmojiModifiers> implements EmojiProvider {
  private recordConfig?: ServiceConfig;
  private emojiService: EmojiService;
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
    this.emojiService = new EmojiService(emojis);
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
      this.filter(this.lastQuery.query, this.lastQuery.modifiers);
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

  filter(query?: string, modifiers?: EmojiModifiers): void {
    this.lastQuery = {
      query: query || '',
      modifiers,
    };
    if (this.emojiService) {
      const searchResult = this.emojiService.search(query, modifiers);
      this.notifyResult(searchResult);
    } else {
      // not ready
      this.notifyNotReady();
    }
  }

  findByShortcut(shortcut: string, modifiers?: EmojiModifiers): Promise<OptionalEmojiDescription> {
    if (this.isLoaded()) {
      // Wait for all emoji to load before looking by shortcut (to ensure correct priority)
      const emoji = this.emojiService.findByShortcut(shortcut, modifiers);
      return Promise.resolve(emoji);
    }
    return this.retryIfLoading(() => this.findByShortcut(shortcut, modifiers), undefined);
  }

  findByEmojiId(emojiId: EmojiId): Promise<OptionalEmojiDescription> {
    const { id, modifiers, shortcut } = emojiId;
    if (this.emojiService) {
      if (id) {
        const emoji = this.emojiService.findById(id, modifiers);
        if (emoji) {
          return Promise.resolve(emoji);
        }
        if (this.isLoaded()) {
          // all loaded but not found by id, fallback to searching by shortcut to
          // at least render an alternative
          return this.findByShortcut(shortcut, modifiers);
        }
      } else {
        // no id fallback to shortcut
        return this.findByShortcut(shortcut, modifiers);
      }
    }
    return this.retryIfLoading(() => this.findByEmojiId(emojiId), undefined);
  }

  findInCategory(categoryId: string): Promise<EmojiDescription[]> {
    if (this.emojiService) {
      return Promise.resolve(this.emojiService.findInCategory(categoryId));
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
