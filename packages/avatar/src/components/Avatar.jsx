import React, { PureComponent, PropTypes } from 'react';
import { akColorPrimary3 } from '@atlaskit/util-shared-styles';

import Container, { ImageWrapper, PresenceWrapper } from '../styled/Avatar';
import Presence from './Presence';
import Image from './Image';

// =============================================================
// NOTE: Duplicated in Presence unitl docgen can follow imports.
// -------------------------------------------------------------
// DO NOT update values here without updating the other.
// =============================================================

export const SIZE = {
  values: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
  defaultValue: 'medium',
};
export const PRESENCE_TYPE = {
  values: ['none', 'online', 'busy', 'offline'],
  defaultValue: 'none',
};

export default class Avatar extends PureComponent {
  static propTypes = {
    /** Content to use as a custom presence indicator. Accepts any React element.
    For best results, it is recommended to use square content with height and
    width of 100% */
    children: PropTypes.element,
    /** Defines the label for the Avatar used by screen readers as fallback
    content if the image fails to load. */
    label: PropTypes.string,
    /** Used to override the default border color of the presence indicator.
    Accepts any color argument that the border-color CSS property accepts. */
    presenceBorderColor: PropTypes.string,
    /** Indicates a user's online status by showing a small icon on the avatar.
    Refer to presence values on the Presence component */
    presence: PropTypes.oneOf(PRESENCE_TYPE.values),
    /** Defines the size of the avatar */
    size: PropTypes.oneOf(SIZE.values),
    /** A url to load an image from (this can also be a base64 encoded image) */
    src: PropTypes.string,
  }

  static defaultProps = {
    presenceBorderColor: akColorPrimary3, // white
    presence: PRESENCE_TYPE.defaultValue,
    size: SIZE.defaultValue,
  }

  state = {
    hasError: false,
    isLoading: false,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      this.setState({ isLoading: true });
    }
  }

  imageLoadedHandler = () => {
    this.setState({
      hasError: false,
      isLoading: false,
    });
  }

  imageErrorHandler = () => {
    this.setState({
      hasError: true,
      isLoading: false,
    });
  }

  render() {
    const { children, label, presence, presenceBorderColor, size, src } = this.props;
    const { hasError, isLoading } = this.state;
    const showPresence = presence !== 'none' || children;

    return (
      <Container size={size}>
        <ImageWrapper isLoading={isLoading} aria-label={label}>
          {isLoading ? null : (
            <Image
              alt={label}
              src={src}
              onLoad={this.imageLoadedHandler}
              onError={this.imageErrorHandler}
              hasError={hasError}
            />
          )}
        </ImageWrapper>

        {showPresence ? (
          <PresenceWrapper size={size}>
            <Presence presence={presence} borderColor={presenceBorderColor} size={size}>
              {children}
            </Presence>
          </PresenceWrapper>
        ) : null}
      </Container>
    );
  }
}
