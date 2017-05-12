import { EmojiDescription, EmojiId, EmojiResponse, OptionalEmojiDescription, SearchOptions } from '../types';
import { isMediaApiRepresentation } from '../type-helpers';
import EmojiLoader from './EmojiLoader';
import EmojiRepository, { EmojiSearchResult } from './EmojiRepository';
import { requestService, ServiceConfig } from './SharedResourceUtils';
import { AbstractResource, OnProviderChange, Provider } from './SharedResources';
import MediaEmojiResource from './MediaEmojiResource';

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

export interface OnEmojiProviderChange extends OnProviderChange<EmojiSearchResult, any, void> {}

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
   *
   * Will load media api images before returning.
   */
  findByShortName(shortName: string): Promise<OptionalEmojiDescription>;

  /**
   * Returns the first matching emoji matching the emojiId.id.
   *
   * If not found or emojiId.id is undefined, fallback to a search by shortName.
   *
   * Will load media api images before returning.
   */
  findByEmojiId(emojiId: EmojiId): Promise<OptionalEmojiDescription>;

  /**
   * Finds emojis belonging to specified category.
   *
   * Does not automatically load Media API images.
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

// Batch size === 1 row in the emoji picker
const mediaEmojiBatchSize = 8;

export default class EmojiResource extends AbstractResource<string, EmojiSearchResult, any, undefined, SearchOptions> implements EmojiProvider {
  private recordConfig?: ServiceConfig;
  private emojiRepository: EmojiRepository;
  private lastQuery: LastQuery;
  private activeLoaders: number = 0;
  private retries: Map<Retry<any>, ResolveReject<any>> = new Map();
  private mediaEmojiResource?: MediaEmojiResource;

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
        this.initEmojiRepository(emojiResponses);
        this.initMediaEmojiResource(emojiResponse, provider.url);
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

  private initEmojiRepository(emojiResponses: EmojiResponse[]): void {
    let emojis: EmojiDescription[] = [];
    emojiResponses.forEach(emojiResponse => {
      emojis = emojis.concat(emojiResponse.emojis);
    });
    this.emojiRepository = new EmojiRepository(emojis);
  }

  private initMediaEmojiResource(emojiResponse: EmojiResponse, siteUrl: string): void {
    if (!this.mediaEmojiResource && emojiResponse.mediaApiToken) {
      this.mediaEmojiResource = new MediaEmojiResource(siteUrl, emojiResponse.mediaApiToken);
    }
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

  protected notifyResult(result: EmojiSearchResult): void {
    if (result.query === this.lastQuery.query) {
      const { emojis } = result;
      const mediaEmoji: EmojiDescription[] = [];
      emojis.forEach(emoji => {
        const representation = emoji.representation;
        if (isMediaApiRepresentation(representation)) {
          mediaEmoji.push(emoji);
        }
      });
      super.notifyResult(result);
      this.loadMediaEmoji(result, mediaEmoji);
    }
  }

  private loadMediaEmoji(result: EmojiSearchResult, mediaEmojis: EmojiDescription[]) {
    // only load a batch of media emoji at a time (next notifyResult will load the next batch)
    if (this.mediaEmojiResource && mediaEmojis.length) {
      const activeLoadersAtStart = this.activeLoaders;
      const loaders: Promise<EmojiDescription>[] = [];
      mediaEmojis.slice(0, mediaEmojiBatchSize).forEach(mediaEmoji => {
        if (this.mediaEmojiResource) { // for typescript's sake
          loaders.push(this.mediaEmojiResource.getMediaEmojiAsImageEmoji(mediaEmoji));
        }
      });
      Promise.all(loaders).then(loadedEmojis => {
        if (result.query === this.lastQuery.query && activeLoadersAtStart === this.activeLoaders) {
          // these loaded emojis are still relevant...
          const { emojis, ...other } = result;
          const newEmojis: EmojiDescription[] = [];
          emojis.forEach(emoji => {
            if (loadedEmojis.length && isMediaApiRepresentation(emoji.representation)) {
              const loadedEmoji = loadedEmojis.shift() as EmojiDescription;
              const representation = loadedEmoji.representation;
              if (!isMediaApiRepresentation(representation)) {
                // loaded, keep, if not loaded, drop as it's not going to load
                newEmojis.push(loadedEmoji);
              }
            } else {
              newEmojis.push(emoji);
            }
          });

          this.notifyResult({
            ...other,
            emojis: newEmojis,
          });
        }
      });
    }
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
      if (!emoji) {
        return Promise.resolve(emoji);
      }
      return this.loadIfMediaEmoji(emoji);
    }
    return this.retryIfLoading(() => this.findByShortName(shortName), undefined);
  }

  findByEmojiId(emojiId: EmojiId): Promise<OptionalEmojiDescription> {
    const { id, shortName } = emojiId;
    if (this.emojiRepository) {
      if (id) {
        const emoji = this.emojiRepository.findById(id);
        if (emoji) {
          return this.loadIfMediaEmoji(emoji);
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

  /**
   * Loads the media image data for the image and returns
   * as an it as an Image representation.
   *
   * If it is not a media emoji, the original emoji is returned.
   *
   * If for some reason there is not media tokens available the
   * original emoji is returned.
   *
   * Optional if not using Atlassian media api for custom emoji storage.
   */
  private loadIfMediaEmoji(emoji: EmojiDescription): Promise<EmojiDescription> {
    if (!this.mediaEmojiResource) {
      return Promise.resolve(emoji);
    }
    return this.mediaEmojiResource.getMediaEmojiAsImageEmoji(emoji);
  }
}
