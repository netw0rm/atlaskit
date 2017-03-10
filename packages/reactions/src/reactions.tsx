import * as React from 'react';
import { Component } from 'react';
import { style } from 'typestyle';
import { EmojiProvider } from '@atlaskit/emoji';
import Reaction from './internal/reaction';
import ReactionPicker from './reaction-picker';
import { ReactionsProvider, ReactionSummary } from './reactions-resource';

export interface Props {
  ari: string;
  reactionsProvider: ReactionsProvider;
  emojiProvider: Promise<EmojiProvider>;
  onReactionClick: Function;
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

  private onEmojiClick = (emojiId) => {
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
        {[...reactions].sort((a, b) => a.emojiId > b.emojiId ? 1 : -1).map(reaction => {
          return (
            <div style={{ display: 'inline-block' }} key={reaction.emojiId}>
              <Reaction
                key={`reaction-${reaction.emojiId}`}
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
