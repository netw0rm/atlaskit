import 'es6-promise/auto'; // 'whatwg-fetch' needs a Promise polyfill
import { expect } from 'chai';

import { EmojiDescription } from '../src/types';
import EmojiRepository from '../src/api/EmojiRepository';

import { getEmojis, getEmojiRepository } from './TestData';

function checkOrder(expected, actual) {
  expect(actual.length, `${actual.length} emojis`).to.equal(expected.length);
  expected.forEach((emoji, idx) => {
    expect(emoji.id, `emoji #${idx}`).to.equal(actual[idx].id);
  });
}

const cowboy: EmojiDescription = {
  id: '1f920',
  name: 'face with cowboy hat',
  shortName: 'cowboy',
  type: 'STANDARD',
  category: 'PEOPLE',
  order: 10103,
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
      const splitCategoryEmojis = [
        ...getEmojis().slice(0, 80), // upto flag,
        cowboy,
        ...getEmojis().slice(80), // rest...
      ];
      const service = new EmojiRepository(splitCategoryEmojis);
      const emojis = service.all().emojis;
      const expectedEmoji = [
        ...getEmojis().slice(0, 10), // PEOPLE
        cowboy, // PEOPLE, but later
        ...getEmojis().slice(10), // the rest
      ];
      checkOrder(expectedEmoji, emojis);
    });
    it('search retains order', () => {
      const emojis = getEmojiRepository().search('flag').emojis;
      const flagEmojis = getEmojis().filter(emoji =>
        emoji.shortName.indexOf(':flag') === 0 || emoji.name && emoji.name.indexOf('flag') === 0
      );
      checkOrder(flagEmojis, emojis);
    });
    it('no categories repeat', () => {
      const emojis = getEmojiRepository().all().emojis;
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
