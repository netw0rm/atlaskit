import * as React from 'react';
import { PureComponent } from 'react';

import {
  TypeAheadItemRowStyle,
  TypeAheadItemStyle,
} from './styles';
import { EmojiDescription, OnEmojiEvent } from '../../types';
import { toEmojiId } from '../../type-helpers';
import EmojiPreview from '../common/EmojiPreview';
import { leftClick } from '../../util/mouse';

export interface Props {
  onMouseMove: OnEmojiEvent;
  onSelection: OnEmojiEvent;
  selected: boolean;
  emoji: EmojiDescription;
}

export default class EmojiTypeAheadItem extends PureComponent<Props, undefined> {

  // internal, used for callbacks
  onEmojiSelected = (event) => {
    const { emoji, onSelection } = this.props;
    if (leftClick(event) && onSelection) {
      event.preventDefault();
      onSelection(toEmojiId(emoji), emoji, event);
    }
  }

  onEmojiMenuItemMouseMove = (event) => {
    const { emoji, onMouseMove } = this.props;
    if (onMouseMove) {
      onMouseMove(toEmojiId(emoji), emoji, event);
    }
  }

  render() {
    const { selected, emoji } = this.props;

    return (
      <TypeAheadItemStyle
        selected={selected}
        onMouseDown={this.onEmojiSelected}
        onMouseMove={this.onEmojiMenuItemMouseMove}
        // TODO works or not?
        data-emoji-id={emoji.shortName}
      >
        <TypeAheadItemRowStyle>
          <EmojiPreview
            emoji={emoji}
          />
        </TypeAheadItemRowStyle>
      </TypeAheadItemStyle>
    );
  }
}
