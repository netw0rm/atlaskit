import * as React from 'react';
import { PureComponent } from 'react';

import { EmojiContext } from './internal-types';
import CachingEmoji from './CachingEmoji';
import EmojiPlaceholder from './EmojiPlaceholder';
import LoadingEmojiCompoent, { Props as LoadingProps } from './LoadingEmojiCompoent';
import { defaultEmojiHeight } from '../../constants';
import { EmojiId, OptionalEmojiDescription } from '../../types';
import { isPromise } from '../../type-helpers';
import EmojiProvider from '../../api/EmojiResource';

export interface BaseResourcedEmojiProps {
  emojiId: EmojiId;
  showTooltip?: boolean;
  fitToHeight?: number;
}

export interface Props extends BaseResourcedEmojiProps, LoadingProps {
  emojiProvider: Promise<EmojiProvider>;
}

interface ComponentProps extends BaseResourcedEmojiProps {
  emojiProvider: EmojiProvider;
}

export interface State {
  emoji: OptionalEmojiDescription;
  loaded: boolean;
}

export default class ResourcedEmoji extends LoadingEmojiCompoent<Props, State> {
  renderLoading() {
    const { shortName } = this.props.emojiId;
    return <EmojiPlaceholder shortName={shortName} showTooltip={this.props.showTooltip}/>;
  }

  renderLoaded(loadedEmojiProvider: EmojiProvider) {
    const { emojiProvider, ...otherProps } = this.props;
    return (
      <ResourcedEmojiComponent
        {...otherProps}
        emojiProvider={loadedEmojiProvider}
      />
    );
  }
}

class ResourcedEmojiComponent extends PureComponent<ComponentProps, State> {
  static childContextTypes = {
      emoji: React.PropTypes.object
  };

  private ready = false;

  constructor(props) {
    super(props);

    this.state = {
      emoji: undefined,
      loaded: false,
    };
  }

  getChildContext(): EmojiContext {
    return {
      emoji: {
        emojiProvider: this.props.emojiProvider
      }
    };
  }

  private refreshEmoji(emojiProvider: EmojiProvider, emojiId: EmojiId) {
    const foundEmoji = emojiProvider.findByEmojiId(emojiId);
    if (isPromise(foundEmoji)) {
      this.setState({
        loaded: false,
      });
      foundEmoji.then(emoji => {
        if (this.ready) {
          // don't update state if component was unmounted
          this.setState({
            emoji,
            loaded: true,
          });
        }
      });
    } else {
      // loaded
      this.setState({
        emoji: foundEmoji,
        loaded: true,
      });
    }
  }

  componentDidMount() {
    this.ready = true;
    if (!this.state.emoji) {
      this.refreshEmoji(this.props.emojiProvider, this.props.emojiId);
    }
  }

  componentWillUnmount() {
    this.ready = false;
  }

  componentWillReceiveProps(nextProps: ComponentProps) {
    if (nextProps.emojiProvider !== this.props.emojiProvider || nextProps.emojiId !== this.props.emojiId) {
      this.refreshEmoji(nextProps.emojiProvider, nextProps.emojiId);
    }
  }

  render() {
    const { emojiId, fitToHeight = defaultEmojiHeight, showTooltip } = this.props;
    const { emoji, loaded } = this.state;
    if (emoji) {
      return (<CachingEmoji emoji={emoji} showTooltip={showTooltip} fitToHeight={fitToHeight} />);
    } else if (loaded) {
      // loaded but not found - render fallback
      const { shortName, fallback } = emojiId;
      return (<span>{fallback || shortName}</span>);
    }

    const { shortName } = this.props.emojiId;
    return <EmojiPlaceholder shortName={shortName} showTooltip={showTooltip}/>;
  }
}
