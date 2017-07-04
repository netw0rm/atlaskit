import { EmojiDescription } from '../../types';
import { EmojiProvider } from '../../api/EmojiResource';

export interface OnEmojiLoaded {
  (emoji?: EmojiDescription): void;
}

export interface EmojiContext {
  emoji: {
    emojiProvider: EmojiProvider;
    onEmojiLoaded?: OnEmojiLoaded;
  };
}
