import { denormaliseEmojis } from '../src/api/EmojiResource';
import EmojiService from '../src/api/EmojiService';
import { EmojiDescription, EmojiServiceResponse } from '../src/types';

declare var require: {
    <T>(path: string): T;
};

let emojisSets: Map<string, EmojiDescription[]>;

const getEmojiSet = (name: string): EmojiDescription[] => {
  if (!emojisSets) {
    // tslint:disable-next-line:no-var-requires
    const standardEmojiData: EmojiServiceResponse = require('./service-data-standard.json') as EmojiServiceResponse;
    // tslint:disable-next-line:no-var-requires
    const atlassianEmojiData: EmojiServiceResponse = require('./service-data-atlassian.json') as EmojiServiceResponse;

    const emojis = denormaliseEmojis({
      emojis: [
        ...standardEmojiData.emojis,
        ...atlassianEmojiData.emojis,
      ],
      meta: standardEmojiData.meta, // No meta in atlasianEmojiData
    }).emojis;

    const standardEmojis = denormaliseEmojis(standardEmojiData).emojis;
    const atlassianEmojis = denormaliseEmojis(atlassianEmojiData).emojis;

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

export const lorem = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt,
lorem eu vestibulum sollicitudin, erat nibh ornare purus, et sollicitudin lorem
felis nec erat. Quisque quis ligula nisi. Cras nec dui vestibulum, pretium massa ut,
egestas turpis. Quisque finibus eget justo a mollis. Mauris quis varius nisl. Donec
aliquet enim vel eros suscipit porta. Vivamus quis molestie leo. In feugiat felis mi,
ac varius odio accumsan ac. Pellentesque habitant morbi tristique senectus et netus et
malesuada fames ac turpis egestas. Mauris elementum mauris ac leo porta venenatis.
Integer hendrerit lacus vel faucibus sagittis. Mauris elit urna, tincidunt at aliquet
sit amet, convallis placerat diam. Mauris id aliquet elit, non posuere nibh. Curabitur
ullamcorper lectus mi, quis varius libero ultricies nec. Quisque tempus neque ligula,
a semper massa dignissim nec.
`;

export const getEmojiService = (): EmojiService => new EmojiService(getEmojis());
export default getEmojiService;
