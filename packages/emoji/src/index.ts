import Emoji from './components/common/Emoji';
import EmojiPlaceholder from './components/common/EmojiPlaceholder';
import ResourcedEmoji from './components/common/ResourcedEmoji';
import EmojiPicker from './components/picker/EmojiPicker';
import EmojiTypeAhead from './components/typeahead/EmojiTypeAhead';
import EmojiResource, { EmojiProvider } from './api/EmojiResource';
import { AbstractResource } from './api/SharedResources';
import EmojiRepository, { EmojiSearchResult } from './api/EmojiRepository';
import EmojiLoader, { denormaliseEmojiServiceResponse } from './api/EmojiLoader';
import { toEmojiId, toOptionalEmojiId } from './type-helpers';

export {
  // Classes
  AbstractResource,
  Emoji,
  EmojiPlaceholder,
  EmojiLoader,
  EmojiPicker,
  EmojiResource,
  EmojiRepository,
  EmojiTypeAhead,
  ResourcedEmoji,
  // functions
  denormaliseEmojiServiceResponse,
  toEmojiId,
  toOptionalEmojiId,
  // interfaces
  EmojiProvider,
  EmojiSearchResult,
};

export * from './types';

export default EmojiPicker;
