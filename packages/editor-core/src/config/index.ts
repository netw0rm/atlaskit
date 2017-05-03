import { MentionResource } from '@atlaskit/mention';
import { EmojiResource } from '@atlaskit/emoji';
import { MediaProviderRW } from '@atlaskit/media-core';

export interface EditorServicesConfig {
  emojiResourceProvider?: () => Promise<EmojiResource>;
  mediaResourceProvider?: () => Promise<MediaProviderRW>;
  mentionResourceProvider?: () => Promise<MentionResource>;
}
