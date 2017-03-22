import * as React from 'react';
import { PureComponent } from 'react';

import Emoji from './Emoji';
import EmojiPlaceholder from './EmojiPlaceholder';
import { OptionalEmojiDescription } from '../../types';
import EmojiProvider from '../../api/EmojiResource';

export interface Props {
  shortcut: string;
  emojiProvider: Promise<EmojiProvider>;
}

export interface State {
  emoji: OptionalEmojiDescription;
}

/**
 * This is a version on ResourceEmoji that accepts a shortcut instead of an EmojiId.
 *
 * This is a fallback for legacy applications that store emoji using a shortcut instead of
 * the EmojiId, for example in a mark down based document/storage format.
 *
 * Use ResourcedEmoji if EmojiId is available.
 */
export default class ResourcedEmojiShortcut extends PureComponent<Props, State> {

  constructor(props) {
    super(props);

    this.state = {
      emoji: undefined,
    };
  }

  private refreshEmoji(emojiProviderPromise: Promise<EmojiProvider>, shortcut: string) {
    if (emojiProviderPromise) {
      emojiProviderPromise.then(emojiProvider => {
        emojiProvider.findByShortcut(shortcut).then(emoji => {
          this.setState({
            emoji,
          });
        });
      });
    }
  }

  componentWillMount() {
    if (!this.state.emoji) {
      this.refreshEmoji(this.props.emojiProvider, this.props.shortcut);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.emojiProvider !== this.props.emojiProvider || nextProps.shortcut !== this.props.shortcut) {
      this.refreshEmoji(nextProps.emojiProvider, nextProps.shortcut);
    }
  }

  render() {
    const { emoji } = this.state;
    if (emoji) {
      return (<Emoji emoji={emoji} />);
    }

    const title = this.props.shortcut;
    return <EmojiPlaceholder title={title} />;
  }
}
