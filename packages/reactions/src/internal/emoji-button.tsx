import { Emoji } from '@atlaskit/emoji';
import * as React from 'react';
import { PureComponent } from 'react';
import { style } from 'typestyle';
import { isLeftClick } from './helpers';

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
  emoji: any; // EmojiPops
  onClick: Function;
}

export default class EmojiButton extends PureComponent<Props, {}> {

  private handleMouseDown = (event) => {
    event.preventDefault();
    if (this.props.onClick && isLeftClick(event)) {
      this.props.onClick(event);
    }
  }

  render() {
    const { emoji } = this.props;

    return (
      <button
        onMouseUp={this.handleMouseDown}
        className={emojiButtonStyle}
      >
        <span><Emoji {...emoji} /></span>
      </button>
    );
  }

}
