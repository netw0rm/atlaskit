import * as React from 'react';
import { Component } from 'react';
import { style } from 'typestyle';
import Reaction from './internal/reaction';
import ReactionPicker from './reaction-picker';
import AbstractReactionsService from './reactions-service';
import { ReactionSummary } from './reactions-service';

export interface Props {
  ari: string;
  reactionsService: AbstractReactionsService;
  emojiService: any; // EmojiService
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
    const { ari, reactionsService } = this.props;
    reactionsService.subscribe(ari, this.updateState);
  }

  componentWillUnmount() {
    const { ari, reactionsService } = this.props;
    reactionsService.unsubscribe(ari, this.updateState);
  }

  private updateState = (state) => {
    this.setState({
      reactions: state
    });
  }

  private renderPicker() {
    const { emojiService, boundariesElement } = this.props;
    const { reactions } = this.state;

    if (!reactions.length) {
      return null;
    }

    return (
      <ReactionPicker
        emojiService={emojiService}
        onSelection={(emojiId) => this.onEmojiClick(emojiId)}
        miniMode={true}
        boundariesElement={boundariesElement}
      />
    );
  }

  render() {
    const { emojiService } = this.props;
    const { reactions } = this.state;

    return (
      <div className={reactionsStyle}>
        {reactions.sort((a, b) => a.emojiId > b.emojiId ? 1 : 0).map(reaction => {
          return (
            <div style={{ display: 'inline-block' }} key={reaction.emojiId}>
              <Reaction
                reaction={reaction}
                emojiService={emojiService}
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
