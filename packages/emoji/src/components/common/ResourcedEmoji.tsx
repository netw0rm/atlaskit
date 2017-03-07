import * as React from 'react';
import { PureComponent } from 'react';

import Emoji from './Emoji';
import { EmojiId, OptionalEmojiDescription } from '../../types';
import EmojiProvider from '../../api/EmojiResource';
import { missingEmoji } from './styles';

export interface Props {
  id: EmojiId;
  emojiProvider: Promise<EmojiProvider>;
}

export interface State {
  emoji: OptionalEmojiDescription;
}

// tslint:disable-next-line:variable-name
const EmojiPlaceholder = (props) => (
  <svg className={missingEmoji} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" >
    <circle cx="16" cy="16" r="12">
      <title>{`Unknown Emoji (${props.title})`}</title>
    </circle>
  </svg>
);

export default class ResourcedEmoji extends PureComponent<Props, State> {

  constructor(props) {
    super(props);

    this.state = {
      emoji: undefined,
    };
  }

  private refreshEmoji(emojiProviderPromise: Promise<EmojiProvider>) {
    if (emojiProviderPromise) {
      emojiProviderPromise.then(emojiProvider => {
        emojiProvider.findById(this.props.id).then(emoji => {
          this.setState({
            emoji,
          });
        });
      });
    }
  }

  componentWillMount() {
    if (!this.state.emoji) {
      this.refreshEmoji(this.props.emojiProvider);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.emojiProvider !== this.props.emojiProvider || nextProps.id !== this.props.id) {
      this.refreshEmoji(nextProps.emojiProvider);
    }
  }

  render() {
    const { emoji } = this.state;
    if (emoji) {
      return (<Emoji emoji={emoji} />);
    }

    return <EmojiPlaceholder title={this.props.id.id} />;
  }
}
