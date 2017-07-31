import { AbstractResource, OnProviderChange, Provider, ServiceConfig, utils as serviceUtils } from '@atlaskit/util-service-support';

import { customCategory, defaultCategories, selectedToneStorageKey } from '../constants';
import { EmojiDescription, EmojiId, EmojiResponse, EmojiSearchResult, EmojiUpload, OptionalEmojiDescription, SearchOptions, ToneSelection } from '../types';
import { isMediaEmoji, isPromise, toEmojiId } from '../type-helpers';
import debug from '../util/logger';
import EmojiLoader from './EmojiLoader';
import EmojiRepository from './EmojiRepository';
import MediaEmojiResource from './media/MediaEmojiResource';
import { UsageFrequencyTracker } from './internal/UsageFrequencyTracker';

export interface EmojiResourceConfig {
  /**
   * The service configuration for remotely recording emoji selections.
   * A post will be performed to this URL with the EmojiId as the body.
   */
  recordConfig?: ServiceConfig;

  /**
   * This defines the different providers. Later providers will override earlier
   * providers when performing shortName based look up.
   */
  providers: ServiceConfig[];

  /**
   * Must be set to true to enable upload support in the mention components.
   *
   * Can be used for the restriction of the upload UI based on permissions, or feature flags.
   *
   * Note this also requires that other conditions are met (for example, one of the providers
   * must support upload for the UploadingEmojiResource implementation of UploadingEmojiProvider).
   */
  allowUpload?: boolean;
}

export interface OnEmojiProviderChange extends OnProviderChange<EmojiSearchResult, any, void> {}

export interface Retry<T> {
  (): Promise<T> | T;
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
  findByShortName(shortName: string): OptionalEmojiDescription | Promise<OptionalEmojiDescription>;

  /**
   * Returns the first matching emoji matching the emojiId.id.
   *
   * If not found or emojiId.id is undefined, fallback to a search by shortName.
   *
   * Will load media api images before returning.
   */
  findByEmojiId(emojiId: EmojiId): OptionalEmojiDescription | Promise<OptionalEmojiDescription>;

  /**
   * Return the emoji that matches the supplied id or undefined. As with findByEmojiId, this call should load
   * the media api images before returning.
   */
  findById(id: string): OptionalEmojiDescription | Promise<OptionalEmojiDescription>;

  /**
   * Finds emojis belonging to specified category.
   *
   * Does not automatically load Media API images.
   */
  findInCategory(categoryId: string): Promise<EmojiDescription[]>;

  /**
   * Returns a map matching ascii representations to their corresponding EmojiDescription.
   */
  getAsciiMap(): Promise<Map<string, EmojiDescription>>;

  /**
   * Records an emoji selection, for example for using in tracking recent emoji.
   * If no recordConfig is configured then a resolved promise should be returned
   *
   * Optional.
   */
  recordSelection?(emoji: EmojiDescription): Promise<any>;

  /**
   * Load media emoji that may require authentication to download, producing
   * a new EmojiDescription to be used for rendering, if necessary.
   *
   * Future results may be returned from a cache.
   *
   * Acts as a no-op if not a media emoji.
   *
   * @return an OptionalEmojiDescription or a promise for one, may be the same as the input,
   *   or updated with a new url to cached image data. Will return the original EmojiDescription
   *   if not a custom emoji.
   */
  loadMediaEmoji(emoji: EmojiDescription): OptionalEmojiDescription | Promise<OptionalEmojiDescription>;

  /**
   * Indicates if media emoji should be rendered optimistically,
   * i.e. assume the url can be rendered directly from the URL, and
   * only explicitly loaded via loadEmojiImageData if it fails to load.
   */
  optimisticMediaRendering(emoji: EmojiDescription): boolean;

  /**
   * Used by the picker and typeahead to obtain a skin tone preference
   * if the user has previously selected one via the Tone Selector
   */
  getSelectedTone(): ToneSelection;

  /**
   * Used by Tone Selector to indicate to the provider that the user
   * has selected a skin tone preference that should be remembered
   */
  setSelectedTone(tone: ToneSelection);

  /**
   * Returns a list of all the non-default categories with emojis in the EmojiRepository
   * e.g. 'FREQUENT', 'ATLASSIAN' and 'CUSTOM'
   */
  calculateDynamicCategories?(): string[];
}

export interface UploadingEmojiProvider extends EmojiProvider {
  /**
   * Returns true if upload is supported.
   *
   * Waits until resources have loaded before returning.
   */
  isUploadSupported(): Promise<boolean>;

  /**
   * Uploads an emoji to the configured repository.
   *
   * Will return a promise with the EmojiDescription once completed.
   *
   * The last search will be re-run to ensure the new emoji is considered in the search.
   */
  uploadCustomEmoji(upload: EmojiUpload): Promise<EmojiDescription>;

  /**
   * Allows the preloading of data (e.g. authentication tokens) to speed the uploading of emoji.
   */
  prepareForUpload();
}

/**
 * Checks if the emojiProvider can support uploading at a feature level.
 *
 * Follow this up with an isUploadSupported() check to see if the provider is actually
 * configured to support uploads.
 */
export const supportsUploadFeature = (emojiProvider: EmojiProvider): emojiProvider is UploadingEmojiProvider => {
  const { isUploadSupported, prepareForUpload, uploadCustomEmoji } = emojiProvider as UploadingEmojiProvider;
  return !!(isUploadSupported && prepareForUpload && uploadCustomEmoji);
};

export interface LastQuery {
  query?: string;
  options?: SearchOptions;
}

export class EmojiResource extends AbstractResource<string, EmojiSearchResult, any, undefined, SearchOptions> implements EmojiProvider {
  protected recordConfig?: ServiceConfig;
  protected emojiRepository: EmojiRepository;
  protected lastQuery: LastQuery;
  protected activeLoaders: number = 0;
  protected retries: Map<Retry<any>, ResolveReject<any>> = new Map();
  protected mediaEmojiResource?: MediaEmojiResource;
  protected selectedTone: ToneSelection;
  protected usageTracker?: UsageFrequencyTracker;

  constructor(config: EmojiResourceConfig) {
    super();
    this.recordConfig = config.recordConfig;
    this.usageTracker = new UsageFrequencyTracker();

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
        this.initMediaEmojiResource(emojiResponse, provider).then(() => {
          this.performRetries();
          this.refreshLastFilter();
        });
      }).catch((reason) => {
        this.activeLoaders--;
        this.notifyError(reason);
      });
    });

    if (window.localStorage) {
      this.selectedTone = this.loadStoredTone();
    }

    if (config.providers.length === 0) {
      throw new Error('No providers specified');
    }
  }

  protected initEmojiRepository(emojiResponses: EmojiResponse[]): void {
    let emojis: EmojiDescription[] = [];
    emojiResponses.forEach(emojiResponse => {
      emojis = emojis.concat(emojiResponse.emojis);
    });
    this.emojiRepository = new EmojiRepository(emojis);
  }

  protected initMediaEmojiResource(emojiResponse: EmojiResponse, provider: ServiceConfig): Promise<void>  {
    if (!this.mediaEmojiResource && emojiResponse.mediaApiToken) {
      const mediaEmojiResource = new MediaEmojiResource(provider, emojiResponse.mediaApiToken);

      // Prime cache type + optimistic rendering by checking first Emoji.
      // If this is fails, it won't be primed until a good emoji is loaded later.
      const { emojis } = emojiResponse;
      if (emojis.length) {
        const done = mediaEmojiResource.optimisticRendering(emojis[0]);
        if (isPromise(done)) {
          return done.then(() => {
            debug('Primed mediaEmojiResource');
            this.mediaEmojiResource = mediaEmojiResource;
          }).catch(err => {
            debug('Failed to prime mediaEmojiResource');
            this.mediaEmojiResource = mediaEmojiResource;
          });
        } else {
          debug('Already primed mediaEmojiResource');
          this.mediaEmojiResource = mediaEmojiResource;
        }
      } else {
        debug('No emoji to prime mediaEmojiResource with');
        this.mediaEmojiResource = mediaEmojiResource;
      }
    }
    return Promise.resolve();
  }

  private performRetries(): void {
    const currentRetries = this.retries;
    this.retries = new Map();
    currentRetries.forEach((resolveReject, retry) => {
      const result = retry();
      if (isPromise(result)) {
        result.then(response => {
          resolveReject.resolve(response);
        })
        .catch(reason => {
          resolveReject.reject(reason);
        });
      } else {
        resolveReject.resolve(result);
      }
    });
  }

  private loadStoredTone(): ToneSelection {
    const storedToneString = window.localStorage.getItem(selectedToneStorageKey);
    if (storedToneString) {
      const storedTone = parseInt(storedToneString, 10);
      return !isNaN(storedTone) ? storedTone : undefined;
    }

    return undefined;
  }

  protected refreshLastFilter(): void {
    if (typeof this.lastQuery !== 'undefined') {
      const { query, options } = this.lastQuery;
      this.filter(query, options);
    }
  }

  protected isLoaded = () => {
    return !this.activeLoaders;
  }

  protected retryIfLoading<T>(retry: Retry<T>, defaultResponse: T): Promise<T> {
    if (!this.isLoaded()) {
      return new Promise<T>((resolve, reject) => {
        this.retries.set(retry, { resolve, reject });
      });
    }
    return Promise.resolve<T>(defaultResponse);
  }

  protected notifyResult(result: EmojiSearchResult): void {
    if (result.query === this.lastQuery.query) {
      super.notifyResult(result);
    }
  }

  loadMediaEmoji(emoji: EmojiDescription): OptionalEmojiDescription | Promise<OptionalEmojiDescription> {
    if (!this.mediaEmojiResource || !isMediaEmoji(emoji)) {
      return emoji;
    }
    return this.mediaEmojiResource.loadMediaEmoji(emoji);
  }

  optimisticMediaRendering(emoji: EmojiDescription): boolean {
    if (!isMediaEmoji(emoji)) {
      return true;
    }
    if (!this.mediaEmojiResource) {
      // Shouldn't have a media emoji without a mediaEmojiResouce, but anyway ;)
      return false;
    }
    const optimistic = this.mediaEmojiResource.optimisticRendering(emoji);

    if (isPromise(optimistic)) {
      // Not sure yet, so lets say no for now (this should normally be primed in most/all cases)
      return false;
    }

    return optimistic;
  }

  filter(query?: string, options?: SearchOptions): void {
    this.lastQuery = {
      query: query || '',
      options,
    };
    if (this.emojiRepository) {
      this.notifyResult(this.emojiRepository.search(query, options));
    } else {
      // not ready
      this.notifyNotReady();
    }
  }

  findByShortName(shortName: string): OptionalEmojiDescription | Promise<OptionalEmojiDescription> {
    if (this.isLoaded()) {
      // Wait for all emoji to load before looking by shortName (to ensure correct priority)
      return this.emojiRepository.findByShortName(shortName);
    }
    return this.retryIfLoading<any>(() => this.findByShortName(shortName), undefined);
  }

  findByEmojiId(emojiId: EmojiId): OptionalEmojiDescription | Promise<OptionalEmojiDescription> {
    const { id, shortName } = emojiId;
    if (this.emojiRepository) {
      if (id) {
        const emoji = this.emojiRepository.findById(id);
        if (emoji) {
          return emoji;
        }
        if (this.isLoaded()) {
          // all loaded but not found by id, try server to see if
          // this is a newly uploaded emoji
          if (this.mediaEmojiResource) {
            return this.mediaEmojiResource.findSiteEmoji(emojiId).then(emoji => {
              if (!emoji) {
                // if not, fallback to searching by shortName to
                // at least render an alternative
                return this.findByShortName(shortName);
              }
              this.addCustomEmoji(emoji);
              return emoji;
            });
          }

          // if not, fallback to searching by shortName to
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

  findById(id: string): OptionalEmojiDescription | Promise<OptionalEmojiDescription> {
    if (this.emojiRepository) {
      return this.emojiRepository.findById(id);
    }

    return this.retryIfLoading(() => this.findById(id), undefined);
  }

  findInCategory(categoryId: string): Promise<EmojiDescription[]> {
    if (this.emojiRepository) {
      return Promise.resolve(this.emojiRepository.findInCategory(categoryId));
    }
    return this.retryIfLoading(() => this.findInCategory(categoryId), []);
  }

  getAsciiMap(): Promise<Map<string, EmojiDescription>> {
    if (this.isLoaded()) {
      return Promise.resolve(this.emojiRepository.getAsciiMap());
    }
    return this.retryIfLoading(() => this.getAsciiMap(), new Map());
  }

  /**
   * Record the selection of an emoji to a remote service if 'recordConfig' has been supplied.
   * Regardless of the recordConfig, emoji selections will always be recorded locally for the
   * purposes of tracking the frequency of use.
   *
   * @param emoji The full description of the emoji to record usage for.
   */
  recordSelection(emoji: EmojiDescription): Promise<any> {
    const { recordConfig, usageTracker } = this;

    if (usageTracker) {
      usageTracker.recordUsage(emoji);
    }

    if (recordConfig) {
      const queryParams = {
        emojiId: toEmojiId(emoji)
      };
      const requestInit = {
        method: 'POST',
      };
      return serviceUtils.requestService(recordConfig, { queryParams, requestInit });
    }

    return Promise.resolve();
  }

  getSelectedTone(): ToneSelection {
    return this.selectedTone;
  }

  setSelectedTone(tone: ToneSelection) {
    this.selectedTone = tone;
    if (window.localStorage) {
      try {
        window.localStorage.setItem(selectedToneStorageKey, tone ? tone.toString() : '');
      } catch (e) {
        console.error('localStorage is full', e);
      }
    }
  }

  calculateDynamicCategories() {
    const categorySet = new Set();
    this.emojiRepository.all().emojis.forEach(emoji => categorySet.add(emoji.category));
    const dynamicCategoryList = Array.from(categorySet).filter(category => defaultCategories.indexOf(category) === -1);
    if (dynamicCategoryList.indexOf(customCategory) === -1 && !!this.mediaEmojiResource) {
      dynamicCategoryList.push(customCategory);
    }
    return dynamicCategoryList;
  }

  protected addCustomEmoji(emoji: EmojiDescription) {
    this.emojiRepository.addCustomEmoji(emoji);
  }
}

export default class UploadingEmojiResource extends EmojiResource implements UploadingEmojiProvider {
  protected allowUpload: boolean;

  constructor(config: EmojiResourceConfig) {
    super(config);
    this.allowUpload = !!config.allowUpload;
  }

  isUploadSupported(): Promise<boolean> {
    if (!this.allowUpload) {
      return Promise.resolve(false);
    }
    if (this.mediaEmojiResource) {
      return Promise.resolve(true);
    }
    return this.retryIfLoading(() => this.isUploadSupported(), false);
  }

  uploadCustomEmoji(upload: EmojiUpload): Promise<EmojiDescription> {
    return this.isUploadSupported().then(supported => {
      if (!supported || !this.mediaEmojiResource) {
        return Promise.reject('No media api support is configured');
      }

      return this.mediaEmojiResource.uploadEmoji(upload).then(emoji => {
        this.addCustomEmoji(emoji);
        this.refreshLastFilter();
        return emoji;
      });
    });
  }

  prepareForUpload() {
    if (this.mediaEmojiResource) {
      this.mediaEmojiResource.prepareForUpload();
    }
    return this.retryIfLoading(() => this.prepareForUpload(), undefined);
  }
}
