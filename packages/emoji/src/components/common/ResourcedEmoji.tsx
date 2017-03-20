import * as React from 'react';
import { PureComponent } from 'react';

import Emoji from './Emoji';
import { isEmojiId, EmojiId, EmojiShortcut, OptionalEmojiDescription } from '../../types';
import EmojiProvider from '../../api/EmojiResource';
import { missingEmoji } from './styles';

export interface Props {
  emojiId: EmojiId | EmojiShortcut;
  emojiProvider: Promise<EmojiProvider>;
}

export interface State {
  emoji: OptionalEmojiDescription;
}

export interface PlaceholderProps {
  title: string;
}

export class EmojiPlaceholder extends PureComponent<PlaceholderProps, undefined> {
  render() {
    return (
      <svg className={missingEmoji} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" >
        <circle cx="16" cy="16" r="12">
          <title>{`Unknown Emoji (${this.props.title})`}</title>
        </circle>
      </svg>
    );
  }
}

export default class ResourcedEmoji extends PureComponent<Props, State> {

  constructor(props) {
    super(props);

    this.state = {
      emoji: undefined,
    };
  }

  private refreshEmoji(emojiProviderPromise: Promise<EmojiProvider>, emojiId: EmojiId | EmojiShortcut) {
    if (emojiProviderPromise) {
      emojiProviderPromise.then(emojiProvider => {
        if (isEmojiId(emojiId)) {
          const id = emojiId as EmojiId;
          emojiProvider.findById(id).then(emoji => {
            this.setState({
              emoji,
            });
          });
        } else {
          const emojiShortcut = emojiId as EmojiShortcut;
          emojiProvider.findByShortcut(emojiShortcut.shortcut).then(emoji => {
            this.setState({
              emoji,
            });
          });
        }
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

    const { emojiId } = this.props;
    let title;
    if (isEmojiId(emojiId)) {
      const id = emojiId as EmojiId;
      title = id.id;
    } else {
      const shortcut = emojiId as EmojiShortcut;
      title = shortcut.shortcut;
    }

    return <EmojiPlaceholder title={title} />;
  }
}
