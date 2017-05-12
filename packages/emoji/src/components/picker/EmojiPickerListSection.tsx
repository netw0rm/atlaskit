import * as React from 'react';
import { PureComponent } from 'react';

import * as styles from './styles';
import { EmojiDescription, EmojiId, OnEmojiEvent } from '../../types';
import { isMediaApiRepresentation } from '../../type-helpers';
import Emoji from '../common/Emoji';
import EmojiPlaceholder from '../common/EmojiPlaceholder';

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
            const { shortName, category, id, name, representation } = emoji;
            const key = id || `${shortName}-${category}`;
            let emojiComponent;

            if (isMediaApiRepresentation(representation)) {
              emojiComponent = (
                <EmojiPlaceholder title={shortName} name={name} />
              );
            } else {
              emojiComponent = (
                <Emoji
                  emoji={emoji}
                  selected={selected}
                  onSelected={onSelected}
                  onMouseMove={onMouseMove}
                />
              );
            }

            return (
              <span
                className={styles.pickerEmoji}
                key={key}
              >
                {emojiComponent}
              </span>
            );
         })}
        </div>
      </div>
    );
  }
}
