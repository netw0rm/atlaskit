import * as Cache from 'timed-cache';

import EmojiRepository from '../src/api/EmojiRepository';
import { denormaliseEmojiServiceResponse } from '../src/api/EmojiLoader';
import { EmojiDescription, EmojiDescriptionWithVariations, EmojiServiceResponse } from '../src/types';
import { mockEmojiResourceFactory, MockEmojiResource, MockEmojiResourceConfig } from './MockEmojiResource';

export const spriteEmoji: EmojiDescription = {
  id: 'grimacing',
  shortName: ':grimacing:',
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
  shortName: ':grimacing:',
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

const cache = new Cache({ defaultTtl: 10000 });
const getOrCreate = (key: string, create: () => any): any => {
  let data = cache.get(key);
  if (!data) {
    data = create();
  }
  // Force ttl reset to keep alive
  cache.put(key, data);
  return data;
};

// tslint:disable-next-line:no-var-requires
export const getStandardServiceEmojis = (): EmojiServiceResponse =>
  getOrCreate('test-emoji-standard.json', () => require('./test-emoji-standard.json') as EmojiServiceResponse);
// tslint:disable-next-line:no-var-requires
export const getAtlassianServiceEmojis = (): EmojiServiceResponse =>
  getOrCreate('test-emoji-atlassian.json', () => require('./test-emoji-atlassian.json') as EmojiServiceResponse);

export const getStandardEmojis = (): EmojiDescription[] =>
  getOrCreate('standardEmojis', () => denormaliseEmojiServiceResponse(getStandardServiceEmojis()).emojis);
export const getAtlassianEmojis = (): EmojiDescription[] =>
  getOrCreate('atlassianEmojis', () => denormaliseEmojiServiceResponse(getAtlassianServiceEmojis()).emojis);
export const getEmojis = (): EmojiDescription[] =>
  getOrCreate('allEmojis', () => [ ...getStandardEmojis(), ...getAtlassianEmojis() ]);

export const getEmojiRepository = () =>
  getOrCreate('EmojiRepository', () => new EmojiRepository(getEmojis()));

export const getGrinEmoji = () => getEmojiRepository().findByShortName(':grin:') as EmojiDescriptionWithVariations;
export const getEvilburnsEmoji = () => getEmojiRepository().findByShortName(':evilburns:') as EmojiDescriptionWithVariations;
export const getThumbsupEmoji = () => getEmojiRepository().findByShortName(':thumbsup:') as EmojiDescriptionWithVariations;

export const getEmojiResourcePromise = (config?: MockEmojiResourceConfig): Promise<MockEmojiResource> => mockEmojiResourceFactory(getEmojiRepository(), config);

export const generateSkinVariation = (base: EmojiDescription, idx: number): EmojiDescription => {
  const { id, shortName, name } = base;
  return {
    id: `${id}-${idx}`,
    shortName: `${shortName.substring(0, shortName.length - 1)}-${idx}:`,
    name: `${name} ${idx}`,
    type: 'SITE',
    category: 'CHEESE',
    representation: {
      imagePath: `https://path-to-skin-variation-tone${idx}.png`,
      width: 24,
      height: 24,
    },
  };
};
