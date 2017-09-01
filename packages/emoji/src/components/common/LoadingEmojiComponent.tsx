import { PureComponent } from 'react';

import { EmojiProvider } from '../../api/EmojiResource';

export interface Props {
  emojiProvider: Promise<EmojiProvider>;
}

export interface State {
  loadedEmojiProvider?: EmojiProvider;
}

/**
 * A base class for components that don't want to start rendering
 * until the EmojiProvider is resolved.
 */
export default abstract class LoadingEmojiComponent<P extends Props,S extends State> extends PureComponent<P,S> {

  constructor(props: P, state: S) {
    super(props);
    this.state = state;
    this.loadEmojiProvider(this.props.emojiProvider);
  }

  componentWillReceiveProps(nextProps: Readonly<P>) {
    this.loadEmojiProvider(nextProps.emojiProvider);
  }

  private loadEmojiProvider(futureEmojiProvider: Promise<EmojiProvider>) {
    futureEmojiProvider.then(loadedEmojiProvider => {
      this.setState({
        loadedEmojiProvider
      });
    }).catch(err => {
      this.setState({
        loadedEmojiProvider: undefined
      });
    });
  }

  renderLoading(): JSX.Element | null {
    return null;
  }

  abstract renderLoaded(loadedEmojiProvider: EmojiProvider): JSX.Element | null;

  render() {
    const { loadedEmojiProvider } = this.state;

    if (loadedEmojiProvider) {
      return this.renderLoaded(loadedEmojiProvider as EmojiProvider);
    }

    return this.renderLoading();
  }
}
