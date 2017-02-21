import * as React from 'react';
import { PureComponent } from 'react';

import * as styles from './styles';
import EmojiPreview from '../common/EmojiPreview';
import { EmojiDescription, OnToneSelected } from '../../types';

export interface Props {
  emojis: EmojiDescription[];
  selectedEmoji?: EmojiDescription;
  selectedTone?: number;
  onToneSelected?: OnToneSelected;
}

export default class EmojiPickerFooter extends PureComponent<Props, undefined> {
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
