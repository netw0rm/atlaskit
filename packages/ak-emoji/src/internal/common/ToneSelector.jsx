import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!../../style.less';
import EmojiButton from '../common/EmojiButton';
import EmojiPropTypes from '../ak-emoji-prop-types';

export default class ToneSelector extends PureComponent {
  static propTypes = {
    emoji: EmojiPropTypes.emoji.isRequired,
    onToneSelected: PropTypes.func.isRequired,
  };

  render() {
    const emoji = this.props.emoji;
    const variations = emoji.skinVariations;
    const toneEmojis = variations.map((skinVariation, i) => ({
      ...emoji,
      shortcut: `${emoji.shortcut}_tone${i + 1}`,
      representation: skinVariation,
    }));

    toneEmojis.unshift(emoji);

    return (
      <div className={styles.toneSelector}>
        {
          toneEmojis.map((em, i) => (
            <EmojiButton
              key={em.shortcut}
              onClick={() => this.props.onToneSelected(i)}
              {...em}
            />
          ))
        }
      </div>
    );
  }
}
