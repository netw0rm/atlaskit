import { removeEmojiOneIdSkintone } from '../EmojiUtils';
import { atlassianCategory, customCategory, localStoragePrefix } from '../../constants';
import { EmojiDescription } from '../../types';
import StoredDuplicateLimitedQueue from '../../StoredDuplicateLimitedQueue';

/**
 * Keeps track of the last 150 emoji usages, although limiting the maximum count for a single emoji to 25 to
 * ensure we don't end up with only a single emoji being recorded. Usage is persisted to local storage for
 * consistency between 'sessions'.
 *
 * Skin tone variations for an emoji will be 'collapsed' so they are tracked as their base emoji. Gender
 * variations are not collapsed in this way and will be tracked per gender. This decision reflects the UI of
 * the EmojiPicker component.
 */
export class UsageFrequencyTracker {

  protected queue: StoredDuplicateLimitedQueue<string>;
  private gateway: Gateway;

  constructor() {
    this.queue = new StoredDuplicateLimitedQueue({
      storage: window.localStorage,
      storagePrefix: localStoragePrefix,
      maxDuplicates: 25,
      minUniqueItems: 5
    });

    this.gateway = new Gateway(10);
  }

  /**
   * @param emoji the emoji who's usage is to be recorded. If the emoji has no id then no usage will be recorded
   */
  recordUsage(emoji: EmojiDescription): void {
    let emojiId = emoji.id;
    if (emojiId) {
      if (emoji.category !== atlassianCategory && emoji.category !== customCategory) {
        emojiId = removeEmojiOneIdSkintone(emojiId);
      }

      this.gateway.submit(() => {
        if (emojiId) {
          this.queue.enqueue(emojiId);
        }
      });
    }
  }
}

export class Gateway {
  private maximumPermitted: number;
  private count: number;

  constructor(maximumPermitted: number) {
    if (maximumPermitted < 1) {
      throw new RangeError('The maximumPermitted parameter must be 1 or more.');
    }

    this.maximumPermitted = maximumPermitted;
    this.count = 0;
  }

  /**
   * Run the supplied function if the count of already submitted work allows it. Drop the work
   * if it's not allowed to run.
   *
   * Will return true if the function has been submitted or false if it was not submitted.
   */
  submit(f: () => void): boolean {
    if (this.count >= this.maximumPermitted) {
      return false;
    }

    this.count++;
    const wrappedFunc = () => {
      try {
        f();
      } finally {
         this.completed();
      }
    };

    setTimeout(wrappedFunc);

    return true;
  }

  private completed(): void {
    this.count--;
  }
}
