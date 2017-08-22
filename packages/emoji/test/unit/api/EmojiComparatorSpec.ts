import { expect } from 'chai';

import { EmojiDescription } from '../../../src/types';
import { ChainedEmojiComparator, EmojiComparator } from '../../../src/api//EmojiComparator';

class PresetResultComparator implements EmojiComparator {
  private result: number;

  constructor(result: number) {
    this.result = result;
  }

  compare(e1, e2) {
    return this.result;
  }
}

describe('ChainedEmojiComparator', () => {

  const emoji: EmojiDescription = {
    shortName: 'abc',
    type: 'standard',
    category: 'monkey trousers',
    representation: undefined,
    searchable: false
  };

  it('should return first comparator result when not 0', () => {
    const comparator = new ChainedEmojiComparator(new PresetResultComparator(100), new PresetResultComparator(200));

    expect(comparator.compare(emoji,emoji)).to.equal(100);
  });

  it('should return second comparator result when first is 0', () => {
    const comparator = new ChainedEmojiComparator(new PresetResultComparator(0), new PresetResultComparator(200));

    expect(comparator.compare(emoji,emoji)).to.equal(200);
  });

  it('should return 0 when all comparators return 0', () => {
    const comparator = new ChainedEmojiComparator(new PresetResultComparator(0), new PresetResultComparator(0));

    expect(comparator.compare(emoji,emoji)).to.equal(0);
  });

  it('should return 0 when no comparators', () => {
    const comparator = new ChainedEmojiComparator();

    expect(comparator.compare(emoji,emoji)).to.equal(0);
  });
});
