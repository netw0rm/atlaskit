import { EmojiServiceResponse } from '@atlaskit/emoji';

declare var require: {
  <T>(path: string): T;
};

export const getStandardEmojiData = (): EmojiServiceResponse => require('./service-data-standard.json') as EmojiServiceResponse;
export const getAtlassianEmojiData = (): EmojiServiceResponse => require('./service-data-atlassian.json') as EmojiServiceResponse;
