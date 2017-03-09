import { EmojiProvider, ResourcedEmoji } from '@atlaskit/emoji';
import {
  akBorderRadius,
  akColorN30A,
  akColorN400,
  akColorN40A
} from '@atlaskit/util-shared-styles';
import * as cx from 'classnames';
import * as React from 'react';
import { PureComponent } from 'react';
import { style } from 'typestyle';
import { ReactionSummary } from '../reactions-resource';
import { isLeftClick } from './helpers';

const emojiStyle = style({
  transformOrigin: 'center center 0',
  transition: 'transform cubic-bezier(0.23, 1, 0.32, 1) 200ms',
  $nest: {
    '&&> div': {
      flex: 'auto',
      width: 'auto',
      height: '20px',
      $nest: {
        '> span': {
          margin: '2px 4px',
          width: '16px',
          height: '16px'
        }
      }
    },
    '&&> span': {
      flex: 'auto',
      width: '24px',
      height: '20px',
      backgroundSize: '16px 16px'
    }
  }
});

const countStyle = style({
  flex: 'auto',
  fontSize: '12px',
  lineHeight: '20px',
  padding: '0 4px 0 0',
  minWidth: '12px'
});

const reactionStyle = style({
  outline: 'none',
  display: 'flex',
  flexDirection: 'row',
  minWidth: '36px',
  height: '20px',
  background: 'transparent',
  border: '0',
  borderRadius: akBorderRadius,
  color: akColorN400,
  cursor: 'pointer',
  padding: 0,
  margin: 0,
  transition: 'background cubic-bezier(0.23, 1, 0.32, 1) 500ms',
  $nest: {
    '&:hover': {
      background: akColorN40A,
      $nest: {
        [`> .${emojiStyle}`]: {
          transform: 'scale(1.3)'
        }
      }
    },
    [`&:active > .${emojiStyle}`]: {
      transform: 'scale(.9)'
    },
    '&.reacted': {
      background: akColorN30A
    }
  }
});

export interface Props {
  reaction: ReactionSummary;
  emojiProvider: Promise<EmojiProvider>;
  onClick: Function;
}

export default class Reaction extends PureComponent<Props, {}> {

  private handleMouseDown = (event) => {
    event.preventDefault();
    if (this.props.onClick && isLeftClick(event)) {
      this.props.onClick(event);
    }
  }

  render() {
    const { emojiProvider, reaction } = this.props;

    const classNames = cx(reactionStyle, {
      'reacted': reaction.reacted
    });

    return (
      <button
        className={classNames}
        onMouseUp={this.handleMouseDown}
      >
        <span className={emojiStyle}><ResourcedEmoji emojiProvider={emojiProvider} emojiId={{ id: reaction.emojiId }} /></span>
        <span className={countStyle}>
          {reaction.count < 100 ? reaction.count : '99+'}
        </span>
      </button>
    );
  }

}
