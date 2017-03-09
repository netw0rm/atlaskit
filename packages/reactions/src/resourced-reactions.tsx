import * as React from 'react';
import { PureComponent } from 'react';
import { ReactionsProvider } from './reactions-resource';
import Reactions from './reactions';

export interface Props {
  ari: string;
  reactionsProvider: Promise<ReactionsProvider>;
  emojiService: any; // EmojiService
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

    const { ari, boundariesElement, emojiService } = this.props;

    return (
      <Reactions
        ari={ari}
        emojiService={emojiService}
        reactionsProvider={reactionsProvider}
        onReactionClick={(emojiId) => reactionsProvider.toggleReaction(ari, emojiId)}
        boundariesElement={boundariesElement}
      />
    );
  }

}
