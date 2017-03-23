import * as React from 'react';
import { PureComponent } from 'react';

import { EmojiDescription, OnToneSelected } from '../../types';
import EmojiButton from './EmojiButton';

export interface Props {
  emoji: EmojiDescription;
  onToneSelected: OnToneSelected;
}

export default class ToneSelector extends PureComponent<Props, undefined> {
  render() {
    const { emoji, onToneSelected } = this.props;
    const variations = emoji.skinVariations;
    let toneEmojis: EmojiDescription[] = [];
    if (variations) {
      toneEmojis = variations.map((skinVariation, i) => ({
        ...emoji,
        shortcut: `${emoji.shortcut}_tone${i + 1}`,
        representation: skinVariation,
      }));
    }

    toneEmojis.unshift(emoji);

    return (
      <div>
        {
          toneEmojis.map((em, i) => (
            <EmojiButton
              key={`${em.id}-${i}`}
              onSelected={() => onToneSelected(i + 1)}
              emoji={emoji}
            />
          ))
        }
      </div>
    );
  }
}
