import { MentionResource } from '@atlaskit/mention';
import { EmojiResource } from 'ak-emoji';
import { MediaResource } from '../media';

export interface EditorServicesConfig {
  emojiResourceProvider?: () => Promise<EmojiResource>;
  mediaResourceProvider?: () => Promise<MediaResource>;
  mentionResourceProvider?: () => Promise<MentionResource>;
};
