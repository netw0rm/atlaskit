import { EmojiDescription, EmojiId, OptionalEmojiDescription } from '../src/types';
import { EmojiProvider } from '../src/api/EmojiResource';
import EmojiService, { EmojiSearchResult } from '../src/api/EmojiService';
import { AbstractResource } from '../src/api/SharedResources';
import debug from '../src/util/logger';

export interface PromiseBuilder<R> {
  (result: R): Promise<R>;
}

export interface MockEmojiResourceConfig {
  promiseBuilder?: PromiseBuilder<any>;
}

export class MockEmojiResource extends AbstractResource<string, EmojiSearchResult, any, undefined> implements EmojiProvider {
  private emojiService: EmojiService;
  private promiseBuilder: PromiseBuilder<any>;

  recordedSelections: EmojiId[] = [];

  constructor(emojiService: EmojiService, config?: MockEmojiResourceConfig) {
    super();
    this.emojiService = emojiService;
    this.promiseBuilder = (result) => Promise.resolve(result);
    if (config) {
      if (config.promiseBuilder) {
        this.promiseBuilder = config.promiseBuilder;
      }
    }
  }

  filter(query: string) {
    debug('MockEmojiResource.filter', query);
    this.promiseBuilder(this.emojiService.search(query)).then((result: EmojiSearchResult) => {
      this.notifyResult(result);
    });
  }

  findByShortcut(shortcut: string): Promise<OptionalEmojiDescription> {
    const emoji = this.emojiService.findByShortcut(shortcut);
    debug('MockEmojiResource.findByShortcut', shortcut, emoji);
    return this.promiseBuilder(emoji);
  }

  findById(id: EmojiId): Promise<OptionalEmojiDescription> {
    const emoji = this.emojiService.findById(id);
    debug('MockEmojiResource.findById', id, emoji);
    return this.promiseBuilder(emoji);
  }

  findInCategory(categoryId: string): Promise<EmojiDescription[]> {
    const emojis = this.emojiService.findInCategory(categoryId);
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

export const mockEmojiResourceFactory = (emojiService: EmojiService, config?: MockEmojiResourceConfig, promiseBuilder?: PromiseBuilder<MockEmojiResource>) => {
  const mockEmojiResource = new MockEmojiResource(emojiService, config);
  if (promiseBuilder) {
    return promiseBuilder(mockEmojiResource);
  }
  return Promise.resolve(mockEmojiResource);
};
