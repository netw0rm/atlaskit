import { denormaliseEmojis } from '../src/api/EmojiResource';
import EmojiService from '../src/api/EmojiService';
import { EmojiServiceResponse } from '../src/types';

declare var require: {
    <T>(path: string): T;
};

// tslint:disable-next-line:no-var-requires
const standardEmojiData: EmojiServiceResponse = require('./service-data-standard.json') as EmojiServiceResponse;
// tslint:disable-next-line:no-var-requires
const atlassianEmojiData: EmojiServiceResponse = require('./service-data-atlassian.json') as EmojiServiceResponse;

export const emojis = denormaliseEmojis({
  emojis: [
    ...standardEmojiData.emojis,
    ...atlassianEmojiData.emojis,
  ],
  meta: standardEmojiData.meta, // No meta in atlasianEmojiData
}).emojis;

export const standardEmojis = denormaliseEmojis(standardEmojiData).emojis;
export const atlassianEmojis = denormaliseEmojis(atlassianEmojiData).emojis;

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

export default new EmojiService(emojis);
