import * as uid from 'uid';

import { customCategory, customType } from '../src/constants';
import { EmojiDescription, EmojiId, EmojiUpload, OptionalEmojiDescription, SearchOptions } from '../src/types';
import { addCustomCategoryToResult, UploadingEmojiProvider } from '../src/api/EmojiResource';
import EmojiRepository, { EmojiSearchResult } from '../src/api/EmojiRepository';
import { AbstractResource } from '../src/api/SharedResources';
import debug from '../src/util/logger';

export interface PromiseBuilder<R> {
  (result: R): Promise<R>;
}

export interface MockEmojiResourceConfig {
  promiseBuilder?: PromiseBuilder<any>;
  uploadSupported?: boolean;
}

export const emojiFromUpload = (upload: EmojiUpload) => {
  const { shortName, name, dataURL, height, width } = upload;
  return {
    id: uid(),
    shortName,
    name,
    type: customType,
    category: customCategory,
    order: -1,
    representation: {
      width,
      height,
      imagePath: dataURL,
    }
  };
};

export class MockEmojiResource extends AbstractResource<string, EmojiSearchResult, any, undefined, SearchOptions> implements UploadingEmojiProvider {
  private emojiRepository: EmojiRepository;
  private promiseBuilder: PromiseBuilder<any>;
  private uploadSupported: boolean;
  private lastQuery: string = '';

  recordedSelections: EmojiId[] = [];

  constructor(emojiService: EmojiRepository, config?: MockEmojiResourceConfig) {
    super();
    this.emojiRepository = emojiService;
    this.promiseBuilder = (result) => Promise.resolve(result);
    this.uploadSupported = false;
    if (config) {
      if (config.promiseBuilder) {
        this.promiseBuilder = config.promiseBuilder;
      }
      this.uploadSupported = !!config.uploadSupported;
    }
  }

  filter(query: string, options?: SearchOptions) {
    debug('MockEmojiResource.filter', query);
    this.lastQuery = query;
    this.promiseBuilder(this.emojiRepository.search(query, options)).then((result: EmojiSearchResult) => {
      this.notifyResult(addCustomCategoryToResult(this.uploadSupported, result));
    });
  }

  findByShortName(shortName: string): Promise<OptionalEmojiDescription> {
    const emoji = this.emojiRepository.findByShortName(shortName);
    debug('MockEmojiResource.findByShortcut', shortName, emoji);
    return this.promiseBuilder(emoji);
  }

  findByEmojiId(emojiId: EmojiId): Promise<OptionalEmojiDescription> {
    const { id, shortName } = emojiId;
    if (id) {
      const emoji = this.emojiRepository.findById(id);
      debug('MockEmojiResource.findById', emojiId, emoji);
      return this.promiseBuilder(emoji);
    }
    const emoji = this.emojiRepository.findByShortName(shortName);
    debug('MockEmojiResource.findById; not id using shortName', emojiId, emoji);
    return this.promiseBuilder(emoji);
  }

  findInCategory(categoryId: string): Promise<EmojiDescription[]> {
    const emojis = this.emojiRepository.findInCategory(categoryId);
    return this.promiseBuilder(emojis);
  }

  recordSelection?(id: EmojiId): Promise<any> {
    this.recordedSelections.push(id);
    return this.promiseBuilder(undefined);
  }

  isUploadSupported(): Promise<boolean> {
    return this.promiseBuilder(this.uploadSupported);
  }

  uploadCustomEmoji(upload: EmojiUpload) {
    const emoji = emojiFromUpload(upload);
    this.emojiRepository.addCustomEmoji(emoji);
    this.filter(this.lastQuery);
    return this.promiseBuilder(emoji);
  }

  prepareForUpload() {}

  // Make public for testing
  notifyNotReady() {
    super.notifyNotReady();
  }

}

export const mockEmojiResourceFactory = (emojiRepository: EmojiRepository, config?: MockEmojiResourceConfig, promiseBuilder?: PromiseBuilder<MockEmojiResource>) => {
  const mockEmojiResource = new MockEmojiResource(emojiRepository, config);
  if (promiseBuilder) {
    return promiseBuilder(mockEmojiResource);
  }
  return Promise.resolve(mockEmojiResource);
};
