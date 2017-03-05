import * as classNames from 'classnames';
import * as React from 'react';
import { PureComponent } from 'react';

import * as styles from './styles';
import Emoji from './Emoji';
import { toEmojiId } from '../../api/EmojiService';
import { EmojiDescription, OnEmojiEvent } from '../../types';
import { leftClick } from '../../util/mouse';

export interface Props {
  emoji: EmojiDescription;
  onSelected?: OnEmojiEvent;
  onMouseMove?: OnEmojiEvent;
  selected?: boolean;
}

// eslint-disable-next-line react/prefer-stateless-function
export default class EmojiButton extends PureComponent<Props, undefined> {

  handleMouseDown = (event) => {
    const { emoji, onSelected } = this.props;
    event.preventDefault();
    if (onSelected && leftClick(event)) {
      onSelected(toEmojiId(emoji), emoji, event);
    }
  }

  handleMouseMove = (event) => {
    const { emoji, onMouseMove } = this.props;
    if (onMouseMove) {
      onMouseMove(toEmojiId(emoji), emoji, event);
    }
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { emoji, selected } = this.props;

    const classes = [styles.emojiButton];

    return (
      <button
        className={classNames(classes)}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
      >
        <Emoji
          emoji={emoji}
          selected={selected}
        />
      </button>
    );
  }
}
