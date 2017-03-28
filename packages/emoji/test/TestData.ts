import EmojiService from '../src/api/EmojiService';
import { EmojiDescription, EmojiMeta, EmojiRepresentation, EmojiServiceDescription, EmojiServiceRepresentation, EmojiServiceResponse, SpriteSheet } from '../src/types';
import { isSpriteRepresentation } from '../src/type-helpers';
import { mockEmojiResourceFactory, MockEmojiResource, MockEmojiResourceConfig } from './MockEmojiResource';

export const spriteEmoji: EmojiDescription = {
  id: 'grimacing',
  shortcut: ':grimacing:',
  name: 'Grimacing',
  type: 'standard',
  category: 'PEOPLE',
  order: 666,
  representation: {
    sprite: {
      url: 'https://path-to-spritesheet.png',
      row: 6,
      column: 6,
      height: 1024,
      width: 1024,
    },
    xIndex: 1,
    yIndex: 1,
    x: 123,
    y: 456,
    height: 72,
    width: 72,
  },
};

export const imageEmoji: EmojiDescription = {
  id: 'grimacing',
  shortcut: ':grimacing:',
  name: 'Grimacing',
  type: 'standard',
  category: 'PEOPLE',
  order: 777,
  representation: {
    imagePath: 'https://path-to-image.png',
    width: 24,
    height: 24,
  },
};

declare var require: {
    <T>(path: string): T;
};

// tslint:disable-next-line:no-var-requires
export const emojis: EmojiDescription[] = require('./test-emoji.json') as EmojiDescription[];

export const standardEmojis: EmojiDescription[] = emojis.filter(emoji => emoji.category !== 'ATLASSIAN');
export const atlassianEmojis: EmojiDescription[] = emojis.filter(emoji => emoji.category === 'ATLASSIAN');

export const emojiService = new EmojiService(emojis);

export const grinEmoji = emojiService.findByShortcut('grin') as EmojiDescription;
export const areyoukiddingmeEmoji = emojiService.findByShortcut('areyoukiddingme') as EmojiDescription;
export const thumbsupEmoji = emojiService.findByShortcut('thumbsup') as EmojiDescription;

export const getEmojiResourcePromise = (config?: MockEmojiResourceConfig): Promise<MockEmojiResource> => mockEmojiResourceFactory(emojiService, config);

// Returns EmojiDescription test data in service as a service response.
export const asServiceData = (emojis: EmojiDescription[]): EmojiServiceResponse => {
  const meta: EmojiMeta  = {};
  const serviceEmojis: EmojiServiceDescription[] = [];

  const setSpriteSheet = (sprite: SpriteSheet, category: string) => {
    if (!meta.spriteSheets) {
      meta.spriteSheets = {};
    }
    if (!meta.spriteSheets[category]) {
      meta.spriteSheets[category] = sprite;
    }
  };

  const convertRepresentation = (rep: EmojiRepresentation, category: string): EmojiServiceRepresentation => {
    if (isSpriteRepresentation(rep)) {
      const { sprite, ...others } = rep;
      setSpriteSheet(rep.sprite, category);
      return {
        ...others,
        spriteRef: category,
      };
    }
    return { ...rep };
  };

  emojis.forEach(emoji => {
    const { representation, skinVariations, modifiers, id, category, ...others } = emoji;
    const serviceEmoji: EmojiServiceDescription = {
      id: id || '',
      category,
      ...others,
      representation: convertRepresentation(representation, category),
      skinVariations: skinVariations && skinVariations.map(rep => convertRepresentation(rep, category)),
    };
    serviceEmojis.push(serviceEmoji);
  });

  return {
    emojis: serviceEmojis,
    meta,
  };
};
