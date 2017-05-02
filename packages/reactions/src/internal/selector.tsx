import * as React from 'react';
import { PureComponent, SyntheticEvent } from 'react';
import { style } from 'typestyle';
import { EmojiId, EmojiProvider, OnEmojiEvent, OptionalEmojiDescription } from '@atlaskit/emoji';
import EmojiButton from './emoji-button';

import { equalEmojiId } from './helpers';

export interface Props {
  emojiProvider: Promise<EmojiProvider>;
  onSelection: OnEmojiEvent;
}

const selectorStyle = style({
  boxSizing: 'border-box',
  display: 'flex',
  padding: 0
});

export const defaultReactionsByShortName: Map<string, EmojiId> = new Map<string, EmojiId>([
  [':thumbsup:', { id: '1f44d', shortName: ':thumbsup:' }],
  [':thumbsdown:', { id: '1f44e', shortName: ':thumbsdown:' }],
  [':grinning:', { id: '1f600', shortName: ':grinning:' }],
  [':tada:', { id: '1f389', shortName: ':tada:' }],
  [':heart:', { id: '2764', shortName: ':heart:' }],
]);

export const defaultReactions: EmojiId[] = [
  defaultReactionsByShortName.get(':thumbsup:') as EmojiId,
  defaultReactionsByShortName.get(':thumbsdown:') as EmojiId,
  defaultReactionsByShortName.get(':grinning:') as EmojiId,
  defaultReactionsByShortName.get(':tada:') as EmojiId,
  defaultReactionsByShortName.get(':heart:') as EmojiId,
];

export const isDefaultReaction = (emojiId: EmojiId) => defaultReactions.filter(otherEmojiId => equalEmojiId(otherEmojiId, emojiId)).length > 0;

export default class Selector extends PureComponent<Props, {}> {

  private onEmojiSelected = (emojiId: EmojiId, emoji: OptionalEmojiDescription, event: SyntheticEvent<any>) => {
    this.props.onSelection(emojiId, emoji, event);
  }

  render() {
    const { emojiProvider } = this.props;

    return (
      <div className={selectorStyle}>
        {defaultReactions.map(emojiId => {
          const key = emojiId.id || emojiId.shortName;
          return (
            <div style={{display: 'inline-block'}} key={key}>
              <EmojiButton emojiId={emojiId} emojiProvider={emojiProvider} onClick={this.onEmojiSelected} />
            </div>
          );
        })}
      </div>
    );
  }

}
