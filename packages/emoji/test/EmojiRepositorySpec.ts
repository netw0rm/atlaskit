import { expect } from 'chai';

import { EmojiDescription } from '../src/types';
import EmojiRepository from '../src/api/EmojiRepository';

import { emojis as allEmojis, emojiRepository, thumbsupEmoji, thumbsdownEmoji } from './TestData';

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

const siteTest: EmojiDescription = {
  id: '1f921',
  name: 'collision symbol',
  shortName: ':test:',
  type: 'SITE',
  category: 'SYMBOL',
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

const atlassianTest: EmojiDescription = {
  id: '1f922',
  name: 'boom',
  shortName: ':test:',
  type: 'ATLASSIAN',
  category: 'SYMBOL',
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

const standardTest: EmojiDescription = {
  id: '1f923',
  name: 'BOOM',
  shortName: ':test:',
  type: 'STANDARD',
  category: 'SYMBOL',
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


describe('EmojiRepository', () => {
  describe('#search', () => {
    it('all', () => {
      const expectedEmojis = [
        ...allEmojis.slice(0, 10), // upto flag,
        cowboy,
        ...allEmojis.slice(10), // rest...
      ];
      const service = new EmojiRepository(expectedEmojis);
      const emojis = service.all().emojis;
      checkOrder(expectedEmojis, emojis);
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

    it('returns exact matches first', () => {
      const emojis = emojiRepository.search(':grin').emojis;
      const grinEmojis = allEmojis.filter(emoji => emoji.shortName.indexOf(':grin') === 0).sort((e1, e2) => {
        // If second emoji matches query exactly, bring forward
        if (e2.shortName === ':grin:' && e1.shortName !== ':grin:') {
          return 1;
        }
        // Leave emojis in current order
        return -1;
      });
      checkOrder(grinEmojis, emojis);
    });

    it('conflicting shortName matches show in type order Site -> Atlassian -> Standard', () => {
      const splitCategoryEmojis = [
        ...allEmojis.slice(0, 10), // upto flag,
        atlassianTest,
        standardTest,
        siteTest,
        ...allEmojis.slice(10), // rest...
      ];
      const service = new EmojiRepository(splitCategoryEmojis);
      const emojis = service.search(':test').emojis;
      const expectedEmoji = [
        siteTest,
        atlassianTest,
        standardTest,
      ];
      checkOrder(expectedEmoji, emojis);
    });

    it('thumbsup emojis appears before thumbs down', () => {
      const emojis = emojiRepository.search(':thumbs').emojis;
      const expectedEmoji = [
        thumbsupEmoji,
        thumbsdownEmoji,
      ];
      checkOrder(expectedEmoji, emojis);
    });

    it('options - limit ignored if missing', () => {
      const service = new EmojiRepository(allEmojis);
      const emojis = service.search('').emojis;
      checkOrder(allEmojis, emojis);
    });

    it('options - limit results', () => {
      const service = new EmojiRepository(allEmojis);
      const emojis = service.search('', { limit: 10 }).emojis;
      checkOrder(allEmojis.slice(0, 10), emojis);
    });
  });
});
