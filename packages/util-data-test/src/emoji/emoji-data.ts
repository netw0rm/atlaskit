import { EmojiServiceResponse } from '@atlaskit/emoji';

declare var require: {
  <T>(path: string): T;
};

export const getStandardEmojiData = (): EmojiServiceResponse => require('../json-data/service-data-standard.json') as EmojiServiceResponse;
export const getAtlassianEmojiData = (): EmojiServiceResponse => require('../json-data/service-data-atlassian.json') as EmojiServiceResponse;
