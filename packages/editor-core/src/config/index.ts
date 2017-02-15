import { EmojiResource } from 'ak-emoji';
import { MentionResource } from 'ak-mention';
import { MediaResource } from '../media';

export interface EditorServicesConfig {
  emojiResourceProvider?: () => Promise<EmojiResource>;
  mediaResourceProvider?: () => Promise<MediaResource>;
  mentionResourceProvider?: () => Promise<MentionResource>;
};
