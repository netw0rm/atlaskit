import React, { PureComponent, PropTypes } from 'react';

import styles from 'style!../style.less';
import EmojiPreview from './EmojiPreview';
import EmojiPropTypes from './ak-emoji-prop-types';

export default class extends PureComponent {
  static propTypes = {
    selectedEmoji: EmojiPropTypes.emoji,
    // eslint-disable-next-line react/no-unused-prop-types
    emojis: PropTypes.arrayOf(EmojiPropTypes.emoji),
    selectedTone: PropTypes.number,
    onToneSelected: PropTypes.func,
  };

  render() {
    const { selectedEmoji, selectedTone, onToneSelected } = this.props;
    // const toneEmoji = filters.toneEmoji(emojis);

    return (
      <div className={styles.emojiPickerFooter}>
        <EmojiPreview
          emoji={selectedEmoji}
          selectedTone={selectedTone}
          onToneSelected={onToneSelected}
        />
      </div>
    );
  }

}
