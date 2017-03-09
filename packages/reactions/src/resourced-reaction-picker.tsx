import * as React from 'react';
import { PureComponent } from 'react';
import { EmojiProvider } from '@atlaskit/emoji';

import { ReactionsProvider } from './reactions-resource';
import ReactionPicker from './reaction-picker';

export interface Props {
  ari: string;
  reactionsProvider: Promise<ReactionsProvider>;
  emojiProvider: Promise<EmojiProvider>;
  miniMode?: boolean;
  boundariesElement?: string;
}

export interface State {
  reactionsProvider: ReactionsProvider | null;
}

export default class ResourcedReactionPicker extends PureComponent<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      reactionsProvider: null
    };
  }

  private refreshReactions(reactionsProviderPromise: Promise<ReactionsProvider>) {
    if (reactionsProviderPromise) {
      reactionsProviderPromise.then(reactionsProvider => {
        this.setState({
          reactionsProvider
        });
      });
    }
  }

  componentWillMount() {
    if (!this.state.reactionsProvider) {
      this.refreshReactions(this.props.reactionsProvider);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.reactionsProvider !== this.props.reactionsProvider) {
      this.refreshReactions(nextProps.reactionsProvider);
    }
  }

  render() {
    const { reactionsProvider } = this.state;

    if (!reactionsProvider) {
      return null;
    }

    const { ari, boundariesElement, emojiProvider, miniMode } = this.props;

    return (
      <ReactionPicker
        emojiProvider={emojiProvider}
        onSelection={(emojiId) => reactionsProvider.toggleReaction(ari, emojiId)}
        miniMode={miniMode}
        boundariesElement={boundariesElement}
      />
    );
  }
}
