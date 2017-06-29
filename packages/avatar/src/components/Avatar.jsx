// @flow
import React, { Component, PropTypes } from 'react';

import Container, { PresenceWrapper, StatusWrapper } from '../styled/Avatar';
import Presence from './Presence';
import Image from './Image';
import Status from './Status';
import Tooltip from '../styled/Tooltip';
import { getStyledComponent } from '../helpers';
import { withPseudoState } from '../hoc';
import { DEFAULT_BORDER_COLOR } from '../styled/constants';
import type { PresenceType, StatusType, Size } from '../types';

type Element = Object;

// =============================================================
// NOTE: Duplicated in Presence unitl docgen can follow imports.
// -------------------------------------------------------------
// DO NOT update values here without updating the other.
// =============================================================

export const SIZE = {
  values: ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'],
  defaultValue: 'medium',
};

export const APPEARANCE_TYPE = {
  values: ['circle', 'square'],
  defaultValue: 'circle',
};

export const PRESENCE_TYPE = {
  values: ['busy', 'offline', 'online'],
};

export const STATUS_TYPE = {
  values: ['approved', 'declined', 'locked'],
};

/* eslint-disable react/no-unused-prop-types */
type Props = {
  /** Indicates the shape of the avatar. Most avatars are circular, but square avatars
  can be used for 'container' objects. */
  appearance?: 'circle' | 'square',
  /** Used to override the default border color of the presence indicator.
  Accepts any color argument that the border-color CSS property accepts. */
  borderColor?: string,
  /** A custom component to use instead of the default span. */
  component?: Function | string,
  /** Provides a url for avatars being used as a link. */
  href?: string,
  /** Content to use as a custom presence indicator. Accepts any React element.
  For best results, it is recommended to use square content with height and
  width of 100%. */
  icon?: Element,
  /** Set if the avatar is disabled. */
  isDisabled?: boolean,
  /** Change the style to indicate the avatar is selected. */
  isSelected?: boolean,
  /** Change the style to indicate the avatar is pressed. */
  isActive?: boolean,
  /** Change the style to indicate the avatar is focused. */
  isFocus?: boolean,
  /** Change the style to indicate the avatar is hovered. */
  isHover?: boolean,
  /** Name will be displayed in a tooltip, also used by screen readers as fallback
  content if the image fails to load. */
  name?: string,
  /** Handler to be called on click. */
  onClick?: () => mixed,
  /** Indicates a user's online status by showing a small icon on the avatar.
  Refer to presence values on the Presence component. */
  presence?: PresenceType,
  /** Defines the size of the avatar */
  size?: Size,
  /** A url to load an image from (this can also be a base64 encoded image). */
  src?: string,
  /** Indicates contextual information by showing a small icon on the avatar.
  Refer to status values on the Status component. */
  status?: StatusType,
  /** The index of where this avatar is in the group `stack`. */
  stackIndex?: number,
  /** Assign specific tabIndex order to the underlying node. */
  tabIndex?: number,
  /** Pass target down to a link within the avatar component, if an href is provided. */
  target?: '_blank' | '_self',
};
/* eslint-enable react/no-unused-prop-types */

class Avatar extends Component {
  props: Props; // eslint-disable-line react/sort-comp

  static defaultProps = {
    appearance: APPEARANCE_TYPE.defaultValue,
    borderColor: DEFAULT_BORDER_COLOR,
    size: SIZE.defaultValue,
  }

  static contextTypes = {
    borderColor: PropTypes.string,
    groupAppearance: PropTypes.oneOf(['grid', 'stack']),
  }

  // We set isLoading conditionally here in the event that the src prop is applied at mount.
  state = {
    hasError: false,
    isLoading: !!this.props.src,
  }
  styledComponents = {}

  // We set isLoading conditionally here in the event that the src prop is updated after mount.
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.src && this.props.src !== nextProps.src) {
      this.setState({ isLoading: true });
    }
  }
  getCachedStyledComponent(type) {
    if (!this.styledComponents[type]) {
      this.styledComponents[type] = getStyledComponent[type]();
    }
    return this.styledComponents[type];
  }
  getStyledComponent() {
    const { component, href, onClick } = this.props;
    let node = 'span';

    if (component) node = 'custom';
    else if (href) node = 'link';
    else if (onClick) node = 'button';

    return this.getCachedStyledComponent(node);
  }

  // Expose blur/focus to consumers via inner ref
  blur = () => this.node.blur()
  focus = () => this.node.focus()
  handleImageLoad = () => this.setState({ hasError: false, isLoading: false })
  handleImageError = () => this.setState({ hasError: true, isLoading: false })

  renderIndicator = () => {
    const { appearance, icon, presence, size, status } = this.props;
    const showPresence = !!(presence || icon);
    const showStatus = !!status;

    const borderColor = this.context.borderColor || this.props.borderColor;

    if (showPresence && showStatus) {
      console.warn('Status CANNOT be used in conjuction with Presence on a single Avatar.'); // eslint-disable-line no-console
    }

    let indicator;

    if (showPresence) {
      indicator = (
        <PresenceWrapper appearance={appearance} size={size}>
          <Presence presence={presence} borderColor={borderColor} size={size}>
            {icon}
          </Presence>
        </PresenceWrapper>
      );
    } else if (showStatus) {
      indicator = (
        <StatusWrapper appearance={appearance} size={size}>
          <Status
            status={status}
            borderColor={borderColor}
            size={size}
          />
        </StatusWrapper>
      );
    }

    return indicator;
  }
  render() {
    const { isHover, name, size, src, stackIndex } = this.props;
    const { hasError, isLoading } = this.state;

    // const props = getProps(this);
    const StyledComponent = this.getStyledComponent();

    return (
      <Container size={size} stackIndex={stackIndex}>
        <StyledComponent
          innerRef={r => (this.node = r)}
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
          {...this.props}
        >
          <Image
            alt={name}
            hasError={hasError}
            isLoading={isLoading}
            onError={this.handleImageError}
            onLoad={this.handleImageLoad}
            src={src}
          />
        </StyledComponent>
        {isHover && <Tooltip>{name}</Tooltip>}
        {this.renderIndicator()}
      </Container>
    );
  }
}

export default withPseudoState(Avatar);
