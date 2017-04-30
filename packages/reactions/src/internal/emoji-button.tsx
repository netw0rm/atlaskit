import { EmojiId, EmojiProvider, ResourcedEmoji, OnEmojiEvent } from '@atlaskit/emoji';
import * as React from 'react';
import { PureComponent } from 'react';
import { style } from 'typestyle';
import { isLeftClick } from './helpers';
import { analyticsService } from '../analytics';

const emojiButtonStyle = style({
  outline: 'none',
  display: 'flex',
  backgroundColor: 'transparent',
  border: 0,
  borderRadius: '5px',
  cursor: 'pointer',
  margin: '0',
  padding: '4px',
  $nest: {
    '&:hover > span': {
      transform: 'scale(1.5)'
    },
    '&:active > span': {
      transform: 'scale(.8)'
    },
    '&> span': {
      transformOrigin: 'center center 0',
      transition: 'transform cubic-bezier(0.23, 1, 0.32, 1) 200ms',
      $nest: {
        '&&> div': {
          width: '28px',
          height: '28px',
          $nest: {
            '> span': {
              width: '20px',
              height: '20px'
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
    }
  }
});

export interface Props {
  emojiId: EmojiId;
  emojiProvider: Promise<EmojiProvider>;
  onClick: OnEmojiEvent;
}

export default class EmojiButton extends PureComponent<Props, {}> {

  private handleMouseDown = (event) => {
    event.preventDefault();
    if (this.props.onClick && isLeftClick(event)) {
      const emojiId = this.props.emojiId.id ? this.props.emojiId.id  : '';
      analyticsService.trackEvent('reactions.emoji.click', { emojiId });
      this.props.onClick(this.props.emojiId, undefined, event);
    }
  }

  render() {
    const { emojiId, emojiProvider } = this.props;

    return (
      <button
        onMouseUp={this.handleMouseDown}
        className={emojiButtonStyle}
      >
        <span><ResourcedEmoji emojiProvider={emojiProvider} emojiId={emojiId} /></span>
      </button>
    );
  }

}
