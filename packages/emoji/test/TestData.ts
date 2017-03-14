import EmojiService from '../src/api/EmojiService';
import { EmojiDescription } from '../src/types';
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

export const getEmojiResourcePromise = (config?: MockEmojiResourceConfig): Promise<MockEmojiResource> => mockEmojiResourceFactory(emojiService, config);
