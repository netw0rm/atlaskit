import * as React from 'react';
import { PureComponent, SyntheticEvent } from 'react';
import { style } from 'typestyle';
import { EmojiId, EmojiProvider, OnEmojiEvent, OptionalEmojiDescription } from '@atlaskit/emoji';
import EmojiButton from './emoji-button';

export interface Props {
  emojiProvider: Promise<EmojiProvider>;
  onSelection: OnEmojiEvent;
}

const selectorStyle = style({
  boxSizing: 'border-box',
  display: 'flex',
  padding: 0
});

export const defaultReactionsByShortcut: Map<string, string> = new Map<string, string>([
  ['thumbsup', '1f44d'],
  ['thumbsdown', '1f44e'],
  ['grinning', '1f600'],
  ['tada', '1f389'],
  ['heart', '2764'],
]);

export const defaultReactions: string[] = [
  defaultReactionsByShortcut.get('thumbsup') as string,
  defaultReactionsByShortcut.get('thumbsdown') as string,
  defaultReactionsByShortcut.get('grinning') as string,
  defaultReactionsByShortcut.get('tada') as string,
  defaultReactionsByShortcut.get('heart') as string,
];

export const isDefaultReaction = (emojiId: string) => defaultReactions.filter(otherEmojiId => otherEmojiId === emojiId).length > 0;

export default class Selector extends PureComponent<Props, {}> {

  private onEmojiSelected = (emojiId: EmojiId, emoji: OptionalEmojiDescription, event: SyntheticEvent<any>) => {
    this.props.onSelection(emojiId, emoji, event);
  }

  render() {
    const { emojiProvider } = this.props;

    return (
      <div className={selectorStyle}>
        {defaultReactions.map(emojiId => {
          return (
            <div style={{display: 'inline-block'}} key={emojiId}>
              <EmojiButton emojiId={{id: emojiId}} emojiProvider={emojiProvider} onClick={this.onEmojiSelected} />
            </div>
          );
        })}
      </div>
    );
  }

}
