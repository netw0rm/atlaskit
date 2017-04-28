import { MentionResource } from '@atlaskit/mention';
import { EmojiResource } from '@atlaskit/emoji';
import { MediaProvider } from '../media';

export interface EditorServicesConfig {
  emojiResourceProvider?: () => Promise<EmojiResource>;
  mediaResourceProvider?: () => Promise<MediaProvider>;
  mentionResourceProvider?: () => Promise<MentionResource>;
};
