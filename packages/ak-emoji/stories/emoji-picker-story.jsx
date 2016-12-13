import { storiesOf } from '@kadira/storybook';
import React from 'react';

import EmojiPicker from '../src/EmojiPicker';
import EmojiPickerFooter from '../src/EmojiPickerFooter';
import CategorySelector from '../src/CategorySelector';
import ToneSelector from '../src/ToneSelector';
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

storiesOf('Emoji Picker', module)
  .add('category selector', () => (
    <CategorySelector
      activeCategoryId="OBJECT"
      availableCategories={{
        PEOPLE: true,
        NATURE: true,
        FOODS: true,
      }}
    />
    ))
  .add('footer', () => (
    <EmojiPickerFooter
      selectedEmoji={transformedEmojis[0]}
      selectedTone={1}
      emojis={transformedEmojis}
    />
    ))
  .add('tone selector', () => (
    <ToneSelector emojis={transformedEmojis} />
    ))
  .add('picker', () => (
    <div style={{ padding: '10px' }} >
      <EmojiPicker emojis={transformedEmojis} />
    </div>
    ));
