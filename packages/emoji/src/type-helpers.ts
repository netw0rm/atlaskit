import {
  EmojiDescription,
  EmojiDescriptionWithVariations,
  EmojiId,
  ImageRepresentation,
  OptionalEmojiDescription,
  SpriteRepresentation,
  SpriteServiceRepresentation,
} from './types';

export const isSpriteServiceRepresentation = (rep): rep is SpriteServiceRepresentation => !!(rep && (<SpriteServiceRepresentation> rep).spriteRef);
export const isSpriteRepresentation = (rep): rep is SpriteRepresentation => !!(rep && (<SpriteRepresentation> rep).sprite);
export const isImageRepresentation = (rep): rep is ImageRepresentation => !!(rep && (<ImageRepresentation> rep).imagePath);

export const isEmojiDescriptionWithVariations = (emoji): emoji is EmojiDescriptionWithVariations =>
  !!(emoji && (<EmojiDescriptionWithVariations> emoji).skinVariations);

export const toEmojiId = (emoji: EmojiDescription): EmojiId => ({
  shortName: emoji.shortName,
  id: emoji.id,
  fallback: emoji.fallback,
});

export const toOptionalEmojiId = (emoji: OptionalEmojiDescription): EmojiId | undefined => {
  if (!emoji) {
    return undefined;
  }
  return toEmojiId(emoji);
};

