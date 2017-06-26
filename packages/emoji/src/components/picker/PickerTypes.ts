import { EmojiProvider } from '../../api/EmojiResource';

export interface PickerContext {
  emojiPicker: {
    emojiProvider: Promise<EmojiProvider>;
  };
}
