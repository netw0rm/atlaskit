import * as React from 'react';
import { PureComponent } from 'react';
import { EmojiProvider } from '@atlaskit/emoji';

import { ReactionsProvider } from './reactions-resource';
import Reactions from './reactions';

export interface Props {
  containerAri: string;
  ari: string;
  reactionsProvider: Promise<ReactionsProvider>;
  emojiProvider: Promise<EmojiProvider>;
  boundariesElement?: string;
};

export interface State {
  reactionsProvider: ReactionsProvider | null;
}

export default class ResourcedReactions extends PureComponent<Props, State> {

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

    const { containerAri, ari, boundariesElement, emojiProvider } = this.props;

    return (
      <Reactions
        ari={ari}
        emojiProvider={emojiProvider}
        reactionsProvider={reactionsProvider}
        onReactionClick={(emojiId) => reactionsProvider.toggleReaction(containerAri, ari, emojiId)}
        boundariesElement={boundariesElement}
      />
    );
  }

}
