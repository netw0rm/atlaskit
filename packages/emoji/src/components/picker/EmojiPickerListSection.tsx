import * as React from 'react';
import { PureComponent } from 'react';
import AkButton from '@atlaskit/button';

import { akColorB300 } from '@atlaskit/util-shared-styles';

import * as styles from './styles';
import { EmojiDescription, EmojiId, OnEmojiEvent } from '../../types';
import { isEmojiLoaded } from '../../type-helpers';
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
  showUploadPrompt?: boolean;
  onOpenUpload?: () => void;
}

export default class EmojiPickerListSection extends PureComponent<Props, {}> {

  renderUploadPrompt() {
    const { emojis, onOpenUpload, showUploadPrompt } = this.props;

    if (!showUploadPrompt) {
      return undefined;
    }

    if (emojis.length) {
      // Button style
      return (
        <button className={styles.addEmoji} onClick={onOpenUpload}>
          <svg viewBox={`0 0 30 30`} xmlns="http://www.w3.org/2000/svg" width="28px" height="28px">
            <line x1="15" y1="10" x2="15" y2="20" stroke={akColorB300} strokeWidth="2" strokeLinecap="round" />
            <line x1="10" y1="15" x2="20" y2="15" stroke={akColorB300} strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      );
    }

    // Message style
    return (
      <AkButton
        appearance="link"
        onClick={onOpenUpload}
      >
        Add your own custom emoji
      </AkButton>
    );
  }

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
            const { shortName, category, id, name } = emoji;
            const key = id || `${shortName}-${category}`;
            let emojiComponent;

            if (isEmojiLoaded(emoji)) {
              emojiComponent = (
                <Emoji
                  emoji={emoji}
                  selected={selected}
                  onSelected={onSelected}
                  onMouseMove={onMouseMove}
                />
              );
            } else {
              emojiComponent = (
                <EmojiPlaceholder shortName={shortName} name={name} />
              );
            }

            return (
              <span
                className={styles.emojiItem}
                key={key}
              >
                {emojiComponent}
              </span>
            );
         })}
         {this.renderUploadPrompt()}
        </div>
      </div>
    );
  }
}
