import * as React from 'react';
import { PureComponent } from 'react';

import * as styles from './styles';
import { EmojiDescription, EmojiId, OnEmojiEvent } from '../../types';
import Emoji from '../common/Emoji';

export interface Props {
  id?: string;
  title?: string;
  emojis: EmojiDescription[];
  selectedEmoji?: EmojiId;
  onSelected?: OnEmojiEvent;
  onMouseMove?: OnEmojiEvent;
  className?: string;
}

export default class EmojiPickerListSection extends PureComponent<Props, {}> {

  render() {
    const { className, emojis, id, onMouseMove, onSelected, selectedEmoji, title } = this.props;

    return (
      <div
        id={id}
        data-category-id={title}
        className={className}
      >
        <div className={styles.emojiCategoryTitle} >
          {title}
        </div>
        <div>
          {emojis.map((emoji) => {
            const selected = selectedEmoji && selectedEmoji.id === emoji.id;
            const key = emoji.id || `${emoji.shortName}-${emoji.category}`;

            return (
              <Emoji
                emoji={emoji}
                selected={selected}
                key={key}
                onSelected={onSelected}
                onMouseMove={onMouseMove}
                className={styles.pickerEmoji}
              />
            );
         })}
        </div>
      </div>
    );
  }
}
