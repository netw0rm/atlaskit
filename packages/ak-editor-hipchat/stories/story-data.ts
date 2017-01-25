import { EmojiService } from 'ak-emoji';
import MentionResource from '../test/_mock-ak-mention-resource';
import emojiData from './emoji-data';

export const resourceProvider = new MentionResource({
  minWait: 10,
  maxWait: 25,
});

export const emojiService = new EmojiService(emojiData);
