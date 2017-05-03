import * as React from 'react';
import { Component } from 'react';
import { style } from 'typestyle';
import { EmojiProvider } from '@atlaskit/emoji';
import Reaction from './internal/reaction';
import ReactionPicker from './reaction-picker';
import { ReactionsProvider, ReactionSummary } from './reactions-resource';
import { compareEmojiId } from './internal/helpers';

export interface OnEmoji {
  (emojiId: string): any;
}

export interface Props {
  ari: string;
  reactionsProvider: ReactionsProvider;
  emojiProvider: Promise<EmojiProvider>;
  onReactionClick: OnEmoji;
  onReactionHover?: Function;
  boundariesElement?: string;
  allowAllEmojis?: boolean;
}

export interface State {
  reactions: ReactionSummary[];
}

const reactionsStyle = style({
  position: 'relative',
  marginTop: '4px',
  background: 'white',
  borderRadius: '15px',
  $nest: {
    '&> div': {
      margin: '0 0 0 4px'
    },
    '&> div:first-child': {
      margin: 0
    }
  }
});

export default class Reactions extends Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      reactions: []
    };
  }

  private onEmojiClick = (emojiId: string) => {
    this.props.onReactionClick(emojiId);
  }

  private onReactionHover = (reaction: ReactionSummary) => {
    const { onReactionHover } = this.props;
    if (onReactionHover) {
      onReactionHover(reaction);
    }
  }

  componentDidMount() {
    const { ari, reactionsProvider } = this.props;
    reactionsProvider.subscribe(ari, this.updateState);
  }

  componentWillUnmount() {
    const { ari, reactionsProvider } = this.props;
    reactionsProvider.unsubscribe(ari, this.updateState);
  }

  private updateState = (state) => {
    this.setState({
      reactions: state
    });
  }

  private renderPicker() {
    const { emojiProvider, boundariesElement, allowAllEmojis } = this.props;
    const { reactions } = this.state;

    if (!reactions.length) {
      return null;
    }

    return (
      <ReactionPicker
        emojiProvider={emojiProvider}
        onSelection={(emojiId) => this.onEmojiClick(emojiId)}
        miniMode={true}
        boundariesElement={boundariesElement}
        allowAllEmojis={allowAllEmojis}
      />
    );
  }

  render() {
    const { emojiProvider } = this.props;
    const { reactions } = this.state;

    return (
      <div className={reactionsStyle}>
        {reactions.sort((a, b) => compareEmojiId(a.emojiId, b.emojiId)).map((reaction, index) => {
          const { emojiId } = reaction;
          const key = emojiId || `unknown-${index}`;
          return (
            <div style={{ display: 'inline-block' }} key={key}>
              <Reaction
                reaction={reaction}
                emojiProvider={emojiProvider}
                onClick={() => this.onEmojiClick(reaction.emojiId)}
                onMouseOver={() => this.onReactionHover(reaction)}
              />
            </div>
          );
        })}
        {this.renderPicker()}
      </div>
    );
  }

}
