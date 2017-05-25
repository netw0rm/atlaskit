import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
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

export const APPEARANCE_TYPE = {
  values: ['circle', 'square'],
  defaultValue: 'circle',
};

export const PRESENCE_TYPE = {
  values: ['none', 'online', 'busy', 'offline'],
  defaultValue: 'none',
};

export default class Avatar extends PureComponent {
  static propTypes = {
    /** Indicates the shape of the avatar. Most avatars are circular, but square avatars
    can be used for 'container' objects. */
    appearance: PropTypes.oneOf(APPEARANCE_TYPE.values),
    /** Content to use as a custom presence indicator. Accepts any React element.
    For best results, it is recommended to use square content with height and
    width of 100%. */
    icon: PropTypes.element,
    /** Defines the label for the Avatar used by screen readers as fallback
    content if the image fails to load. */
    label: PropTypes.string,
    /** Used to override the default border color of the presence indicator.
    Accepts any color argument that the border-color CSS property accepts. */
    presenceBorderColor: PropTypes.string,
    /** Indicates a user's online status by showing a small icon on the avatar.
    Refer to presence values on the Presence component. */
    presence: PropTypes.oneOf(PRESENCE_TYPE.values),
    /** Defines the size of the avatar */
    size: PropTypes.oneOf(SIZE.values),
    /** A url to load an image from (this can also be a base64 encoded image). */
    src: PropTypes.string,
  }

  static defaultProps = {
    appearance: APPEARANCE_TYPE.defaultValue,
    presenceBorderColor: akColorPrimary3, // white
    presence: PRESENCE_TYPE.defaultValue,
    size: SIZE.defaultValue,
  }

  // We set isLoading conditionally here in the event that the src prop is applied at mount.
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      isLoading: !!props.src,
    };
  }

  // We set isLoading conditionally here in the event that the src prop is updated after mount.
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
    const { appearance, icon, label, presence, presenceBorderColor, size, src } = this.props;
    const { hasError, isLoading } = this.state;
    const showPresence = presence !== 'none' || icon;

    return (
      <Container size={size}>
        <ImageWrapper appearance={appearance} size={size} isLoading={isLoading} aria-label={label}>
          <Image
            alt={label}
            isLoading={isLoading}
            src={src}
            onLoad={this.imageLoadedHandler}
            onError={this.imageErrorHandler}
            hasError={hasError}
          />
        </ImageWrapper>

        {showPresence ? (
          <PresenceWrapper appearance={appearance} size={size}>
            <Presence presence={presence} borderColor={presenceBorderColor} size={size}>
              {icon}
            </Presence>
          </PresenceWrapper>
        ) : null}
      </Container>
    );
  }
}
