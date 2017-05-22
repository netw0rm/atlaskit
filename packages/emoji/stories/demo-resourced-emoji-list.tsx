import * as React from 'react';
import { PureComponent } from 'react';

import { EmojiDescription } from '../src/types';
import { toEmojiId } from '../src/type-helpers';
import { EmojiSearchResult } from '../src/api/EmojiRepository';
import { EmojiProvider, OnEmojiProviderChange } from '../src/api/EmojiResource';
import ResourcedEmoji from '../src/components/common/ResourcedEmoji';

export interface EmojiFilter {
  (emoji: EmojiDescription): boolean;
}

export interface Props {
  emojiProvider: Promise<EmojiProvider>;
  filter: EmojiFilter;
}

export interface State {
  unfilteredEmojis: EmojiDescription[];
  emojis: EmojiDescription[];
}

export default class ResourcedEmojiList extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      unfilteredEmojis: [],
      emojis: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.emojiProvider !== nextProps.emojiProvider) {
      if (this.props.emojiProvider) {
        this.props.emojiProvider.then(provider => {
          provider.unsubscribe(this.onProviderChange);
        });
      }
      if (nextProps.emojiProvider) {
        nextProps.emojiProvider.then(provider => {
          provider.subscribe(this.onProviderChange);
          provider.filter('');
        });
      }
    }
    if (this.props.filter !== nextProps.filter) {
      this.setState({
        emojis: this.state.unfilteredEmojis.filter(nextProps.filter),
      });
    }
  }

  componentWillMount() {
    if (this.props.emojiProvider) {
      this.props.emojiProvider.then(provider => {
        provider.subscribe(this.onProviderChange);
        provider.filter('');
      });
    }
  }

  componentWillUnmount() {
    if (this.props.emojiProvider) {
      this.props.emojiProvider.then(provider => {
        provider.unsubscribe(this.onProviderChange);
      });
    }
  }

  private onSearchResult = (result: EmojiSearchResult) => {
    this.setState({
      unfilteredEmojis: result.emojis,
      emojis: result.emojis.filter(this.props.filter),
    });
  }

  private onProviderChange: OnEmojiProviderChange = {
    result: this.onSearchResult,
  };

  render() {
    const { emojis } = this.state;
    const { emojiProvider } = this.props;

    return (
      <p style={{ padding: '10px', lineHeight: '24px' }} >
        {emojis.map(emoji => (
          <ResourcedEmoji
            key={emoji.id || `${emoji.shortName}-${emoji.category}`}
            emojiProvider={emojiProvider}
            emojiId={toEmojiId(emoji)}
          />
        ))}
      </p>
    );
  }
}
