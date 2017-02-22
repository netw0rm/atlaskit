import { EmojiDescription } from '../src/types';

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
