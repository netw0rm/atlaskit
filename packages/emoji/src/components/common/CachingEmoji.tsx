import * as React from 'react';
import { PureComponent } from 'react';

import { EmojiDescription } from '../../types';
import { isMediaEmoji, isPromise } from '../../type-helpers';
import debug from '../../util/logger';
import { EmojiContext } from './internal-types';
import Emoji, { Props as EmojiProps } from './Emoji';
import EmojiPlaceholder from './EmojiPlaceholder';

export interface State {
  cachedEmoji?: EmojiDescription;
  invalidImage?: boolean;
}

/**
 * Renders an emoji from a cached image, if required.
 */
export const CachingEmoji = (props: EmojiProps) => { // tslint:disable-line:variable-name
  // Optimisation to only render the class based CachingMediaEmoji if necessary
  // slight performance hit, which accumulates for a large number of emoji.
  if (isMediaEmoji(props.emoji)) {
    return (<CachingMediaEmoji {...props} />);
  }
  return (<Emoji {...props} />);
};

/**
 * Rendering a media emoji image from a cache for media emoji, with different
 * rendering paths depending on caching strategy.
 */
export class CachingMediaEmoji extends PureComponent<EmojiProps,State> {
  static contextTypes = {
    emoji: React.PropTypes.object
  };

  private mounted: boolean;

  context: EmojiContext;

  constructor(props: EmojiProps, context: EmojiContext) {
    super(props, context);

    this.state = {
      cachedEmoji: this.loadEmoji(props.emoji, context, false)
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentWillReceiveProps(nextProps: EmojiProps, nextContext: EmojiContext) {
    if (nextProps.emoji !== this.props.emoji) {
      if (this.mounted) {
        this.setState({
          cachedEmoji: this.loadEmoji(nextProps.emoji, nextContext, false)
        });
      }
    }
  }

  private loadEmoji(emoji: EmojiDescription, context: EmojiContext, forceLoad: boolean): EmojiDescription | undefined {
    if (!context.emoji) {
      return undefined;
    }
    const { emojiProvider } = context.emoji;
    if (!emojiProvider) {
      return undefined;
    }

    const optimisticRendering = emojiProvider.optimisticMediaRendering(emoji);

    if (optimisticRendering && !forceLoad) {
      debug('Optimistic rendering', emoji.shortName);
      return emoji;
    }
    debug('Loading image via media cache', emoji.shortName);

    const loadedEmoji = emojiProvider.loadMediaEmoji(emoji);

    if (isPromise(loadedEmoji)) {
      loadedEmoji.then(cachedEmoji => {
        if (this.mounted) {
          this.setState({
            cachedEmoji
          });
        }
      }).catch(err => {
        if (this.mounted) {
          this.setState({
            cachedEmoji: undefined,
            invalidImage: true,
          });
        }
      });
      return undefined;
    }
    return loadedEmoji;
  }

  private handleLoadError = () => {
    const { invalidImage } = this.state;
    const { emoji } = this.props;

    if (invalidImage) {
      // do nothing, bad image
      return;
    }

    this.setState({
      cachedEmoji: this.loadEmoji(emoji, this.context, true)
    });
  }

  render() {
    const { cachedEmoji } = this.state;
    const { children, ...otherProps } = this.props;

    let emojiComponent;
    if (cachedEmoji) {
      emojiComponent = (
        <Emoji
          {...otherProps}
          emoji={cachedEmoji}
          onLoadError={this.handleLoadError}
        />
      );
    } else {
      const { emoji, showTooltip } = this.props;
      const { shortName } = emoji;
      emojiComponent = (
        <EmojiPlaceholder
          shortName={shortName}
          showTooltip={showTooltip}
        />
      );
    }

    return emojiComponent;
  }
}

export default CachingEmoji;
