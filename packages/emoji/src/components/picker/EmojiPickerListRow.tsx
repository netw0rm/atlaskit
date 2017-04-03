import * as React from 'react';
import { PureComponent } from 'react';

import * as styles from './styles';
import EmojiButton from '../common/EmojiButton';
import { EmojiDescription, EmojiId, OnEmojiEvent, Styles } from '../../types';

export interface Props {
  emojis: EmojiDescription[];
  selectedEmoji?: EmojiId;
  style?: Styles;
  onMouseMove?: OnEmojiEvent;
  onSelected?: OnEmojiEvent;
}

export default class EmojiPickerListRow extends PureComponent<Props, undefined> {

  static defaultProps = {
    style: {},
    onEmojiMouseEnter: () => {},
    onEmojiSelected: () => {},
  };

  render() {
    const { style, selectedEmoji, emojis, onMouseMove, onSelected } = this.props;

    return (
      <div
        className={styles.emojiPickerRow}
        style={style}
      >
        {emojis.map((emoji) => {
          const selected = selectedEmoji && (selectedEmoji.id === emoji.id);

          return (
            <div
              style={{ display: 'inline-block' }}
              key={emoji.shortName}
            >

              <EmojiButton
                emoji={emoji}
                selected={selected}
                onSelected={onSelected}
                onMouseMove={onMouseMove}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
