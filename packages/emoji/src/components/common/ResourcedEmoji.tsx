import * as React from 'react';
import { PureComponent } from 'react';

import Emoji from './Emoji';
import EmojiPlaceholder from './EmojiPlaceholder';
import { EmojiId, OptionalEmojiDescription } from '../../types';
import EmojiProvider from '../../api/EmojiResource';

export interface Props {
  emojiId: EmojiId;
  emojiProvider: Promise<EmojiProvider>;
}

export interface State {
  emoji: OptionalEmojiDescription;
}

export default class ResourcedEmoji extends PureComponent<Props, State> {

  constructor(props) {
    super(props);

    this.state = {
      emoji: undefined,
    };
  }

  private refreshEmoji(emojiProviderPromise: Promise<EmojiProvider>, emojiId: EmojiId) {
    if (emojiProviderPromise) {
      emojiProviderPromise.then(emojiProvider => {
        emojiProvider.findByEmojiId(emojiId).then(emoji => {
          this.setState({
            emoji,
          });
        });
      });
    }
  }

  componentWillMount() {
    if (!this.state.emoji) {
      this.refreshEmoji(this.props.emojiProvider, this.props.emojiId);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.emojiProvider !== this.props.emojiProvider || nextProps.emojiId !== this.props.emojiId) {
      this.refreshEmoji(nextProps.emojiProvider, nextProps.emojiId);
    }
  }

  render() {
    const { emoji } = this.state;
    if (emoji) {
      return (<Emoji emoji={emoji} />);
    }

    const title = this.props.emojiId.shortcut;
    return <EmojiPlaceholder title={title} />;
  }
}
