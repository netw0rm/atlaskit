import * as React from 'react';
import { Component } from 'react';
import { style } from 'typestyle';
import { EmojiId, EmojiProvider } from '@atlaskit/emoji';
import Reaction from './internal/reaction';
import ReactionPicker from './reaction-picker';
import { ReactionsProvider, ReactionSummary } from './reactions-resource';
import { compareEmojiId } from './internal/helpers';

export interface OnEmoji {
  (emojiId: EmojiId): any;
}

export interface Props {
  ari: string;
  reactionsProvider: ReactionsProvider;
  emojiProvider: Promise<EmojiProvider>;
  onReactionClick: OnEmoji;
  boundariesElement?: string;
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

  private onEmojiClick = (emojiId: EmojiId) => {
    this.props.onReactionClick(emojiId);
  }

  componentWillMount() {
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
    const { emojiProvider, boundariesElement } = this.props;
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
      />
    );
  }

  render() {
    const { emojiProvider } = this.props;
    const { reactions } = this.state;

    return (
      <div className={reactionsStyle}>
        {reactions.sort((a, b) => compareEmojiId(a.emojiId, b.emojiId)).map(reaction => {
          const { emojiId } = reaction;
          const key = emojiId.id || emojiId.shortName;
          return (
            <div style={{ display: 'inline-block' }} key={key}>
              <Reaction
                reaction={reaction}
                emojiProvider={emojiProvider}
                onClick={() => this.onEmojiClick(reaction.emojiId)}
              />
            </div>
          );
        })}
        {this.renderPicker()}
      </div>
    );
  }

}
