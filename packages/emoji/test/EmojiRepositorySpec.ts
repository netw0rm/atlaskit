import 'es6-promise/auto'; // 'whatwg-fetch' needs a Promise polyfill
import { expect } from 'chai';

import { EmojiDescription } from '../src/types';
import EmojiRepository from '../src/api/EmojiRepository';

import { emojis as allEmojis, emojiRepository, grinEmoji } from './TestData';

function checkOrder(expected, actual) {
  expect(actual.length, `${actual.length} emojis`).to.equal(expected.length);
  expected.forEach((emoji, idx) => {
    expect(emoji.id, `emoji #${idx}`).to.equal(actual[idx].id);
  });
}

const cowboy: EmojiDescription = {
  id: '1f920',
  name: 'face with cowboy hat',
  shortName: ':cowboy:',
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

const golf: EmojiDescription = {
  id: '26f3',
  name: 'flag in hole',
  shortName: ':golf:',
  fallback: '⛳️',
  type: 'STANDARD',
  category: 'ACTIVITY',
  order: 427,
  representation: {
    sprite: {
      url: 'https://pf-emoji-service--cdn.domain.dev.atlassian.io/standard/6ba7377a-fbd4-4efe-8dbc-f025cfb40c2b/32x32/activity.png',
      row: 23,
      column: 25,
      height: 782,
      width: 850
    },
    x: 272,
    y: 0,
    height: 32,
    width: 32,
    xIndex: 8,
    yIndex: 0
  },
};

describe('EmojiRepository', () => {
  describe('#search', () => {
    it('all', () => {
      const splitCategoryEmojis = [
        ...allEmojis.slice(0, 10), // upto flag,
        cowboy,
        ...allEmojis.slice(10), // rest...
      ];
      const service = new EmojiRepository(splitCategoryEmojis);
      const emojis = service.all().emojis;
      const expectedEmoji = [
        ...allEmojis.slice(0, 10), // PEOPLE
        cowboy, // PEOPLE, but later
        ...allEmojis.slice(10), // the rest
      ];
      checkOrder(expectedEmoji, emojis);
    });

    it('handles emojis from service not ordered by category', () => {
      const unorderedEmojis = [
        grinEmoji,
        golf,
        cowboy
      ];
      const service = new EmojiRepository(unorderedEmojis);
      const orderedEmojis = [unorderedEmojis[0], unorderedEmojis[2], unorderedEmojis[1]];
      const fEmojis = service.search('f').emojis;
      checkOrder(fEmojis, orderedEmojis);
    });

    it('retains emoji order', () => {
      const emojis = emojiRepository.search('f').emojis;
      const fEmojis = allEmojis.filter(emoji =>
        emoji.shortName.indexOf(':f') === 0 ||
        emoji.name && emoji.name.split(' ').filter(token =>
          token.indexOf('f') === 0
        ).length !== 0 // matches emojis where a name token starts with 'f'
      );
      checkOrder(fEmojis, emojis);
    });

    it('no categories repeat', () => {
      const emojis = emojiRepository.all().emojis;
      const foundCategories = new Set<string>();
      let lastCategory: string;

      emojis.forEach(emoji => {
        if (emoji.category !== lastCategory) {
          expect(foundCategories.has(emoji.category), 'New category not found before').to.equal(false);
          lastCategory = emoji.category;
        }
      });
    });

    it('retains category order', () => {
      const emojis = emojiRepository.all().emojis;
      const grEmojis = emojiRepository.search('gr').emojis;
      const orderedCategories: string[] = [];
      const grCategories: string[] = [];
      let lastCategory: string;

      emojis.forEach(emoji => {
        if (emoji.category !== lastCategory) {
          orderedCategories.push(emoji.category);
          lastCategory = emoji.category;
        }
      });

      lastCategory = '';
      grEmojis.forEach(emoji => {
        if (emoji.category !== lastCategory) {
          grCategories.push(emoji.category);
          lastCategory = emoji.category;
        }
      });
      expect(orderedCategories.filter(category => grCategories.indexOf(category) !== -1)).to.deep.equal(grCategories);
    });
  });
});
