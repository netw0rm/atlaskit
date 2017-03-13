// Mostly a duplicate of story-data.js in emoji
import { denormaliseEmojiServiceResponse, EmojiDescription, EmojiService, EmojiServiceResponse } from '@atlaskit/emoji';
import { mockEmojiResourceFactory, MockEmojiResource, MockEmojiResourceConfig } from './MockEmojiResource';

declare var require: {
    <T>(path: string): T;
};

export const getStandardEmojiData = (): any => require('./emoji-service-data-standard.json') as any;
export const getAtlassianEmojiData = (): any => require('./emoji-service-data-atlassian.json') as any;

let emojisSets: Map<string, EmojiDescription[]>;

const getEmojiSet = (name: string): EmojiDescription[] => {
  if (!emojisSets) {
    const standardEmojiData: EmojiServiceResponse = getStandardEmojiData();
    const atlassianEmojiData: EmojiServiceResponse = getAtlassianEmojiData();

    const emojis = denormaliseEmojiServiceResponse({
      emojis: [
        ...standardEmojiData.emojis,
        ...atlassianEmojiData.emojis,
      ],
      meta: standardEmojiData.meta, // No meta in atlasianEmojiData
    }).emojis;

    const standardEmojis = denormaliseEmojiServiceResponse(standardEmojiData).emojis;
    const atlassianEmojis = denormaliseEmojiServiceResponse(atlassianEmojiData).emojis;

    emojisSets = new Map<string, EmojiDescription[]>();
    emojisSets.set('all', emojis);
    emojisSets.set('standard', standardEmojis);
    emojisSets.set('atlassian', atlassianEmojis);
  }
  return emojisSets.get(name) || [];
};

export const getStandardEmojis = (): EmojiDescription[] => getEmojiSet('standard');
export const getAtlassianEmojis = (): EmojiDescription[] => getEmojiSet('atlassian');
export const getEmojis = (): EmojiDescription[] => getEmojiSet('all');

// const emojiData = denormaliseEmojis(emojis);
// export const emojiService = new EmojiService(emojiData);

export const getEmojiService = (): EmojiService => new EmojiService(getEmojis());

export const getEmojiResource = (config?: MockEmojiResourceConfig): Promise<MockEmojiResource> => mockEmojiResourceFactory(getEmojiService(), config);
