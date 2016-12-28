import React, { PureComponent, PropTypes } from 'react';

import styles from 'style!../../style.less';
import EmojiPropTypes from '../ak-emoji-prop-types';
import EmojiButton from '../common/EmojiButton';

export default class extends PureComponent {
  static propTypes = {
    selectedEmojiShortcut: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
    emojis: PropTypes.arrayOf(EmojiPropTypes.emoji).isRequired,
    onEmojiMouseEnter: PropTypes.func,
    onEmojiSelected: PropTypes.func,
  };

  static defaultProps = {
    style: {},
    onEmojiMouseEnter: () => {},
    onEmojiSelected: () => {},
  }

  render() {
    const { style, selectedEmojiShortcut, emojis, onEmojiMouseEnter, onEmojiSelected } = this.props;

    return (
      <div
        className={styles.emojiRow}
        style={style}
      >
        {emojis.map((emoji) => {
          const selected = selectedEmojiShortcut === emoji.shortcut;

          return (
            <div
              style={{ display: 'inline-block' }}
              onMouseOver={() => onEmojiMouseEnter(emoji)}
              key={emoji.shortcut}
            >

              <EmojiButton
                {...emoji}
                selected={selected}
                onClick={() => onEmojiSelected(emoji)}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
