import * as React from 'react';
import { PureComponent } from 'react';
import { style } from 'typestyle';
import EmojiButton from './emoji-button';

export interface Props {
  emojiService: any; // EmojiService
  onSelection: Function;
}

const selectorStyle = style({
  boxSizing: 'border-box',
  display: 'flex',
  padding: 0
});

export const defaultReactions = [
  'thumbsup',
  'thumbsdown',
  'grinning',
  'tada',
  'heart'
];

export default class Selector extends PureComponent<Props, {}> {

  private onEmojiSelected = (emoji) => {
    this.props.onSelection(emoji);
  }

  render() {
    const { emojiService } = this.props;
    const emojis = emojiService.all().emojis.filter(e => e.type.toLowerCase() === 'standard' && defaultReactions.indexOf(e.shortcut) !== -1);

    return (
      <div className={selectorStyle}>
        {emojis.map(emoji => {
          return (
            <div style={{display: 'inline-block'}} key={emoji.id}>
              <EmojiButton emoji={emoji} onClick={() => this.onEmojiSelected(emoji)} />
            </div>
          );
        })}
      </div>
    );
  }

}
