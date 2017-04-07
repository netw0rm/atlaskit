import Cache from '../test/Cache';

import { denormaliseEmojiServiceResponse } from '../src/api/EmojiLoader';
import EmojiRepository from '../src/api/EmojiRepository';
import { mockEmojiResourceFactory, MockEmojiResource, MockEmojiResourceConfig } from '../test/MockEmojiResource';
import { EmojiDescription, EmojiServiceResponse } from '../src/types';

declare var require: {
    <T>(path: string): T;
};

const cache = new Cache({ ttl: 10000 });

export const getStandardEmojiData = (): EmojiServiceResponse =>
  cache.getOrCreate('service-data-standard.json', () => require('./service-data-standard.json') as EmojiServiceResponse);
// tslint:disable-next-line:no-var-requires
export const getAtlassianEmojiData = (): EmojiServiceResponse =>
  cache.getOrCreate('service-data-atlassian.json', () => require('./service-data-atlassian.json') as EmojiServiceResponse);

export const getAllEmojiData = (): EmojiServiceResponse => {
  const standardEmojis = getStandardEmojiData();
  const atlassianEmojis = getAtlassianEmojiData();
  const standardSprites = standardEmojis.meta && standardEmojis.meta.spriteSheets || {};
  const atlassianSprites = atlassianEmojis.meta && atlassianEmojis.meta.spriteSheets || {};
  return {
    emojis: [
      ...standardEmojis.emojis,
      ...atlassianEmojis.emojis,
    ],
    meta: {
      spriteSheets: {
        ...standardSprites,
        ...atlassianSprites,
      },
    },
  };
};

const getEmojiSet = (name: string): EmojiDescription[] => {
  switch (name) {
    case 'all':
      return cache.getOrCreate(`emoji-set-all`, () => denormaliseEmojiServiceResponse(getAllEmojiData()).emojis);
    case 'standard':
      return cache.getOrCreate(`emoji-set-standard`, () => denormaliseEmojiServiceResponse(getStandardEmojiData()).emojis);
    case 'atlassian':
      return cache.getOrCreate(`emoji-set-standard`, () => denormaliseEmojiServiceResponse(getAtlassianEmojiData()).emojis);
    default:
      return [];
  }
};

export const getStandardEmojis = (): EmojiDescription[] => getEmojiSet('standard');
export const getAtlassianEmojis = (): EmojiDescription[] => getEmojiSet('atlassian');
export const getEmojis = (): EmojiDescription[] => getEmojiSet('all');

export const lorem = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt,
lorem eu vestibulum sollicitudin, erat nibh ornare purus, et sollicitudin lorem
felis nec erat. Quisque quis ligula nisi. Cras nec dui vestibulum, pretium massa ut,
egestas turpis. Quisque finibus eget justo a mollis. Mauris quis varius nisl. Donec
aliquet enim vel eros suscipit porta. Vivamus quis molestie leo. In feugiat felis mi,
ac varius odio accumsan ac. Pellentesque habitant morbi tristique senectus et netus et a
malesuada fames ac turpis egestas. Mauris elementum mauris ac leo porta venenatis.
Integer hendrerit lacus vel faucibus sagittis. Mauris elit urna, tincidunt at aliquet
sit amet, convallis placerat diam. Mauris id aliquet elit, non posuere nibh. Curabitur
ullamcorper lectus mi, quis varius libero ultricies nec. Quisque tempus neque ligula,
a semper massa dignissim nec.
`;

export const getEmojiRepository = (): EmojiRepository =>
  cache.getOrCreate('EmojiRepository', () => new EmojiRepository(getEmojis()));

export const getEmojiResource = (config?: MockEmojiResourceConfig): Promise<MockEmojiResource> => mockEmojiResourceFactory(getEmojiRepository(), config);
