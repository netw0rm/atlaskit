import { EmojiDescription } from '../types';

/**
 * Returns a number representing the result of comparing e1 and e2.
 * Compatible with Array.sort, which is to say -
 *   - less than 0 if e1 should come first
 *   - 0 if they are equal; e1 and e2 will be unchanged in position relative to each other
 *   - greater than 0 if e2 should come first.
 */
export interface EmojiComparator {
  compare(e1: EmojiDescription, e2: EmojiDescription): number;
}

/**
 * A comparator you can supply if you don't want any specific sorting to be applied.
 */
export class NoSortComparator {
  private static INSTANCE: NoSortComparator;
  private constructor() {}

  public static get Instance()
  {
      return this.INSTANCE || (this.INSTANCE = new this());
  }

  compare(e1: EmojiDescription, e2: EmojiDescription) {
    return 0;
  }
}

/**
 * A combinator comparator that applies an ordered chained of sub-comparators. The first comparator that
 * returns a non-zero value stops the chain and causes that value to be returned. If a comparator returns a
 * zero then the next one in the chain is tried.
 *
 * If no comparators in the chain return a non-zero value then zero will be returned.
 */
export class ChainedEmojiComparator implements EmojiComparator {

  private chain: EmojiComparator[];

  constructor(...comparators: EmojiComparator[]) {
    this.chain = comparators;
  }

  compare(e1: EmojiDescription, e2: EmojiDescription): number {
    for (let i = 0; i < this.chain.length; i++) {
      const result = this.chain[i].compare(e1, e2);
      if (result !== 0) {
        return result;
      }
    }

    return 0;
  }
}
