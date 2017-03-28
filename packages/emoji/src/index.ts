import Emoji from './components/common/Emoji';
import EmojiPlaceholder from './components/common/EmojiPlaceholder';
import ResourcedEmoji from './components/common/ResourcedEmoji';
import EmojiPicker from './components/picker/EmojiPicker';
import EmojiTypeAhead from './components/typeahead/EmojiTypeAhead';
import EmojiResource, { EmojiProvider } from './api/EmojiResource';
import { AbstractResource } from './api/SharedResources';
import EmojiService, { EmojiSearchResult } from './api/EmojiService';
import EmojiLoader, { denormaliseEmojiServiceResponse } from './api/EmojiLoader';

export {
  // Classes
  AbstractResource,
  Emoji,
  EmojiPlaceholder,
  EmojiLoader,
  EmojiPicker,
  EmojiResource,
  EmojiService,
  EmojiTypeAhead,
  ResourcedEmoji,
  // functions
  denormaliseEmojiServiceResponse,
  // interfaces
  EmojiProvider,
  EmojiSearchResult,
};

export * from './types';

export default EmojiPicker;
