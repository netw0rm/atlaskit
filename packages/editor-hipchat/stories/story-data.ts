import { emoji as emojiData } from '@atlaskit/util-data-test';

import MentionResource from '../test/browser/_mock-ak-mention-resource';

export const resourceProvider = new MentionResource({
  minWait: 10,
  maxWait: 25,
});

export const mentionProvider = Promise.resolve(resourceProvider);
export const emojiProvider = emojiData.emojiStoryData.getEmojiResource();
