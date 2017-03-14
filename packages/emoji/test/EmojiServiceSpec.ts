import 'es6-promise/auto'; // 'whatwg-fetch' needs a Promise polyfill
import { expect } from 'chai';

import { EmojiDescription } from '../src/types';
import EmojiService from '../src/api/EmojiService';

import { emoji as emojiTestData } from '@atlaskit/util-data-test';

const { getEmojiService } = emojiTestData.emojiTestData;
const getAllEmojis = emojiTestData.emojiTestData.emojis;

function checkOrder(expected, actual) {
  expect(actual.length, `${actual.length} emojis`).to.equal(expected.length);
  expected.forEach((emoji, idx) => {
    expect(emoji.id, `emoji #${idx}`).to.equal(actual[idx].id);
  });
}

const cowboy: EmojiDescription = {
  id: '1f920',
  name: 'face with cowboy hat',
  shortcut: 'cowboy',
  type: 'STANDARD',
  category: 'PEOPLE',
  order: 10103,
  skinVariations: [],
  representation: {
    sprite: {
      url: 'https://pf-emoji-service--cdn.domain.dev.atlassian.io/standard/6ba7377a-fbd4-4efe-8dbc-f025cfb40c2b/32x32/people.png',
      row: 23,
      column: 25,
      height: 782,
      width: 850
    },
    x: 646,
    y: 714,
    height: 32,
    width: 32,
    xIndex: 19,
    yIndex: 21,
  },
};

describe('EmojiService', () => {
  describe('#search', () => {
    it('all', () => {
      const allEmojis = getAllEmojis();
      const splitCategoryEmojis = [
        ...allEmojis.slice(0, 88), // upto flag,
        cowboy,
        ...allEmojis.slice(88), // rest...
      ];
      const service = new EmojiService(splitCategoryEmojis);
      const emojis = service.all().emojis;
      const expectedEmoji = [
        ...allEmojis.slice(0, 11), // PEOPLE
        cowboy, // PEOPLE, but later
        ...allEmojis.slice(11), // the rest
      ];
      checkOrder(expectedEmoji, emojis);
    });
    it('search retains order', () => {
      const emojis = getEmojiService().search('flag').emojis;
      const flagEmojis = getAllEmojis().filter(emoji =>
        emoji.shortcut.indexOf('flag') === 0 || emoji.name && emoji.name.indexOf('flag') === 0
      );
      checkOrder(flagEmojis, emojis);
    });
    it('no categories repeat', () => {
      const emojis = getEmojiService().all().emojis;
      const foundCategories = new Set<string>();
      let lastCategory: string;

      emojis.forEach(emoji => {
        if (emoji.category !== lastCategory) {
          expect(foundCategories.has(emoji.category), 'New category not found before').to.equal(false);
          lastCategory = emoji.category;
        }
      });
    });
  });
});
