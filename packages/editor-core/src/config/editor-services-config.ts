
import { EmojiResource } from '@atlaskit/emoji';
import { MentionResource } from '@atlaskit/mention';
import { MediaResource } from '../media';

export type EditorServicesConfig = {
  mentionResourceProvider?: Promise<MentionResource>
  emojiResourceProvider?: Promise<EmojiResource>
  reactionsResourceProvider?: Promise<ReactionsResource>
  mediaResourceProvider?: Promise<MediaResource>
};
