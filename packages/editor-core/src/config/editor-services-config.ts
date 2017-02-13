
import { EmojiResource } from 'ak-emoji';
import { MentionResource } from 'ak-mention';
import { MediaResource } from '../media';

export interface EditorServicesConfig {
  emojiResourceProvider?: () => Promise<EmojiResource>;
  mediaResourceProvider?: () => Promise<MediaResource>;
  mentionResourceProvider?: () => Promise<MentionResource>;
  reactionsResourceProvider?: () => Promise<any>;

  // TODO: add as soon as ReactionsResource is merged
  // @link https://bitbucket.org/atlassian/atlaskit/pull-requests/1670/feat-reactions-picker/diff
  //
  // reactionsResourceProvider?: Promise<ReactionsResource>
};
