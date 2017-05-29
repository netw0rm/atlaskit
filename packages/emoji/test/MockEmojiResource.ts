import { EmojiDescription, EmojiId, OptionalEmojiDescription, SearchOptions } from '../src/types';
import { EmojiProvider } from '../src/api/EmojiResource';
import EmojiRepository, { EmojiSearchResult } from '../src/api/EmojiRepository';
import { AbstractResource } from '../src/api/SharedResources';
import debug from '../src/util/logger';

export interface PromiseBuilder<R> {
  (result: R): Promise<R>;
}

export interface MockEmojiResourceConfig {
  promiseBuilder?: PromiseBuilder<any>;
}

export class MockEmojiResource extends AbstractResource<string, EmojiSearchResult, any, undefined, SearchOptions> implements EmojiProvider {
  private emojiRepository: EmojiRepository;
  private promiseBuilder: PromiseBuilder<any>;

  recordedSelections: EmojiId[] = [];

  constructor(emojiService: EmojiRepository, config?: MockEmojiResourceConfig) {
    super();
    this.emojiRepository = emojiService;
    this.promiseBuilder = (result) => Promise.resolve(result);
    if (config) {
      if (config.promiseBuilder) {
        this.promiseBuilder = config.promiseBuilder;
      }
    }
  }

  filter(query: string, options?: SearchOptions) {
    debug('MockEmojiResource.filter', query);
    this.promiseBuilder(this.emojiRepository.search(query, options)).then((result: EmojiSearchResult) => {
      this.notifyResult(result);
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
