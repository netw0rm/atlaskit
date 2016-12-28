import emojiData from './story-data.json';

const transformedEmojis = emojiData.emojis.map((emoji) => {
  const newEmoji = { ...emoji };
  if (emoji.representation.spriteRef) {
    newEmoji.representation.sprite = emojiData.meta.sprites[emoji.representation.spriteRef];
  }

  if (emoji.skinVariations) {
    newEmoji.skinVariations = emoji.skinVariations.map((skinVariation) => {
      if (skinVariation.spriteRef) {
        return {
          ...skinVariation,
          sprite: emojiData.meta.sprites[emoji.representation.spriteRef],
        };
      }

      return skinVariation;
    });
  }

  return newEmoji;
});

export default transformedEmojis;
