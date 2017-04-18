// import { AbstractResource, EmojiDescription, EmojiId, EmojiProvider, EmojiSearchResult, EmojiRepository, OptionalEmojiDescription, SearchOptions } from '@atlaskit/emoji';

// export interface PromiseBuilder<R> {
//   (result: R): Promise<R>;
// }

// export interface MockEmojiResourceConfig {
//   promiseBuilder?: PromiseBuilder<any>;
// }

// export class MockEmojiResource extends AbstractResource<string, EmojiSearchResult, any, undefined, SearchOptions> implements EmojiProvider {
//   private emojiRepository: EmojiRepository;
//   private promiseBuilder: PromiseBuilder<any>;

//   recordedSelections: EmojiId[] = [];

//   constructor(emojiRepository: EmojiRepository, config?: MockEmojiResourceConfig) {
//     super();
//     this.emojiRepository = emojiRepository;
//     this.promiseBuilder = (result) => Promise.resolve(result);
//     if (config) {
//       if (config.promiseBuilder) {
//         this.promiseBuilder = config.promiseBuilder;
//       }
//     }
//   }

//   filter(query: string) {
//     this.promiseBuilder(this.emojiRepository.search(query)).then((result: EmojiSearchResult) => {
//       this.notifyResult(result);
//     });
//   }

//   findByShortName(shortcut: string): Promise<OptionalEmojiDescription> {
//     const emoji = this.emojiRepository.findByShortName(shortcut);
//     return this.promiseBuilder(emoji);
//   }

//   findByEmojiId(emojiId: EmojiId): Promise<OptionalEmojiDescription> {
//     const { id } = emojiId;
//     if (!id) {
//       return this.promiseBuilder(undefined);
//     }
//     const emoji = this.emojiRepository.findById(id);
//     return this.promiseBuilder(emoji);
//   }

//   findInCategory(categoryId: string): Promise<EmojiDescription[]> {
//     const emojis = this.emojiRepository.findInCategory(categoryId);
//     return this.promiseBuilder(emojis);
//   }

//   recordSelection?(id: EmojiId): Promise<any> {
//     this.recordedSelections.push(id);
//     return this.promiseBuilder(undefined);
//   }

//   // Make public for testing
//   notifyNotReady() {
//     super.notifyNotReady();
//   }

// }

// export const mockEmojiResourceFactory = (emojiRepository: EmojiRepository, config?: MockEmojiResourceConfig, promiseBuilder?: PromiseBuilder<MockEmojiResource>) => {
//   const mockEmojiResource = new MockEmojiResource(emojiRepository, config);
//   if (promiseBuilder) {
//     return promiseBuilder(mockEmojiResource);
//   }
//   return Promise.resolve(mockEmojiResource);
// };
