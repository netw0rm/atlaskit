import classNames from 'classnames';
import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!./style.less';
import Emoji from './Emoji';
import EmojiPropTypes from './internal/ak-emoji-prop-types';
import { toneEmojiShortName } from './internal/constants';

// eslint-disable-next-line react/prefer-stateless-function
export default class extends PureComponent {
  static propTypes = {
    emojis: PropTypes.arrayOf(EmojiPropTypes.emoji).isRequired,
    onToneSelected: PropTypes.func.isRequired,
  };

  render() {
    const toneEmoji = this.props.emojis.filter(emoji => emoji.shortcut === toneEmojiShortName);

    const variations = toneEmoji[0].skinVariations;
    const toneEmojis = variations.map((skinVariation, i) => Object.assign({}, toneEmoji[0], {
      shortcut: `${toneEmoji[0].shortcut}_tone${i + 1}`,
      representation: skinVariation,
    }));

    toneEmojis.unshift(toneEmoji[0]);

    const classes = [styles.toneSelector];
    return (
      <div className={classNames(classes)}>
        {
          toneEmojis.map((emoji, i) => <Emoji
            key={emoji.shortcut}
            onClick={() => this.props.onToneSelected(i)}
            {...emoji}
          />)
        }
      </div>
    );
  }
}
