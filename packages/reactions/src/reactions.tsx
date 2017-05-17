import * as React from 'react';
import * as cx from 'classnames';
import { Component } from 'react';
import { style, keyframes } from 'typestyle';
import { EmojiProvider } from '@atlaskit/emoji';
import Reaction from './internal/reaction';
import ReactionPicker from './reaction-picker';
import { CSSTransitionGroup } from 'react-transition-group';
import { ReactionsProvider, ReactionSummary } from './reactions-resource';
import { compareEmojiId } from './internal/helpers';

export interface OnEmoji {
  (emojiId: string): any;
}

const shakeAnimation = keyframes({
  $debugName: 'shake',
  '0%': {
    transform: 'rotateZ(0)',
  },
  '25%': {
    transform: 'rotateZ(8deg)',
  },
  '50%': {
    transform: 'rotateZ(0)',
  },
  '75%': {
    transform: 'rotateZ(-8deg)',
  },
  '100%': {
    transform: 'rotateZ(0)',
  },
});

const styled = style({
  display: 'inline-block',
  $nest: {
    '&.shake': {
      animation: `${shakeAnimation} 200ms 2 ease-in-out`
    }
  }
});

export interface Props {
  ari: string;
  containerAri: string;
  reactionsProvider: ReactionsProvider;
  emojiProvider: Promise<EmojiProvider>;
  onReactionClick: OnEmoji;
  onReactionHover?: Function;
  boundariesElement?: string;
  allowAllEmojis?: boolean;
}

export interface State {
  reactions: ReactionSummary[];
  shake: string | undefined;
}

const reactionsStyle = style({
  position: 'relative',
  background: 'white',
  borderRadius: '15px',
  $nest: {
    '&> span > div': {
      margin: '0 4px 0 4px'
    },
    '&> span > div:first-child': {
      margin: '0 4px 0 0',
    }
  }
});

export default class Reactions extends Component<Props, State> {
  private timeouts: Array<number>;

  constructor(props) {
    super(props);
    this.state = {
      reactions: [],
      shake: undefined
    };
    this.timeouts = [];
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
    const { ari, containerAri, reactionsProvider } = this.props;
    reactionsProvider.subscribe({ari, containerAri }, this.updateState);
  }

  componentWillUnmount() {
    const { ari, containerAri, reactionsProvider } = this.props;
    reactionsProvider.unsubscribe({ari, containerAri}, this.updateState);
    this.timeouts.forEach(clearTimeout);
  }

  private updateState = (state) => {
    this.setState({
      reactions: state
    });
  }

  private handleReactionPickerSelection = (emojiId) => {
    if (this.state.reactions.filter((reaction) => reaction.emojiId === emojiId && reaction.reacted).length === 0) {
      this.onEmojiClick(emojiId);
    } else {
      this.setState({
        shake: emojiId,
      });
      this.timeouts.push(setTimeout(() => this.setState({ shake: undefined }), 200));
    }
  }

  private renderPicker() {
    const { emojiProvider, boundariesElement, allowAllEmojis } = this.props;

    return (
      <ReactionPicker
        emojiProvider={emojiProvider}
        onSelection={this.handleReactionPickerSelection}
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
        {this.renderPicker()}
        <CSSTransitionGroup
            transitionName="reaction"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
        >
          {reactions.sort((a, b) => compareEmojiId(a.emojiId, b.emojiId)).map((reaction, index) => {
            const { emojiId } = reaction;
            const key = emojiId || `unknown-${index}`;

            const classNames = cx(styled, {
              'shake': emojiId === this.state.shake,
            });

            return (
              <div className={classNames} key={key}>
                <Reaction
                  reaction={{...reaction}}
                  emojiProvider={emojiProvider}
                  onClick={this.onEmojiClick}
                  onMouseOver={this.onReactionHover}
                />
              </div>
            );
          })}
        </CSSTransitionGroup>
      </div>
    );
  }

}
