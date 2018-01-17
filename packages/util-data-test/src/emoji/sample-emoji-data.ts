import { EmojiServiceResponse } from '@atlaskit/emoji';

declare var require: {
  <T>(path: string): T;
};

// tslint:disable-next-line:no-var-requires
export const standardServiceEmojis: EmojiServiceResponse = require('./test-emoji-standard.json') as EmojiServiceResponse;
// tslint:disable-next-line:no-var-requires
export const atlassianServiceEmojis: EmojiServiceResponse = require('./test-emoji-atlassian.json') as EmojiServiceResponse;
