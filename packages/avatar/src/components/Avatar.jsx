// @flow
import React, { Component, PropTypes } from 'react';

import Container, { PresenceWrapper, StatusWrapper } from '../styled/Avatar';
import Presence from './Presence';
import Image from './Image';
import Status from './Status';
import Tooltip from '../styled/Tooltip';
import { getProps, getStyledComponent } from '../helpers';
import { withPseudoState } from '../hoc';
import { DEFAULT_BORDER_COLOR } from '../styled/constants';
import type { AvatarProps } from '../types';

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

class Avatar extends Component {
  props: AvatarProps; // eslint-disable-line react/sort-comp

  static defaultProps = {
    appearance: APPEARANCE_TYPE.defaultValue,
    borderColor: DEFAULT_BORDER_COLOR,
    displayTooltipOnHover: true,
    size: SIZE.defaultValue,
  }

  static contextTypes = {
    borderColor: PropTypes.string,
    groupAppearance: PropTypes.oneOf(['grid', 'stack']),
  }

  styledComponents = {}

  // We set isLoading conditionally here in the event that the src prop is updated after mount.
  componentWillReceiveProps(nextProps: AvatarProps) {
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

  // disallow click on disabled avatars
  guardedClick = (event) => {
    const { href, isDisabled, onClick, name, presence, size, src, status, stackIndex } = this.props;

    if (isDisabled) return;

    const item = { href, name, presence, size, src, status, stackIndex };

    onClick({ item, event });
  }

  // enforce status / presence rules
  renderIndicator = () => {
    const { appearance, icon, presence, size, status } = this.props;
    const showPresence = !!(presence || icon);
    const showStatus = !!status;
    const invalidIndicatorSizes = ['xsmall', 'xxlarge'];
    const borderColor = this.context.borderColor || this.props.borderColor;

    // add warnings for various invalid states
    if (invalidIndicatorSizes.includes(size) && (showPresence || showStatus)) {
      console.warn(`Avatar size "${size}" does NOT support ${showPresence ? 'presence' : 'status'}`); // eslint-disable-line no-console
      return null;
    }
    if (showPresence && showStatus) {
      console.warn('Avatar does NOT support `status` AND `presence` on the same instance.'); // eslint-disable-line no-console
      return null;
    }
    if (icon && presence) {
      console.warn('Avatar does NOT support `icon` AND `presence` on the same instance.'); // eslint-disable-line no-console
      return null;
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
    const {
      appearance,
      displayTooltipOnHover,
      isActive,
      isFocus,
      isHover,
      onClick,
      name,
      size,
      src,
      stackIndex,
    } = this.props;

    const props = getProps(this);
    props.onClick = onClick && this.guardedClick;
    const StyledComponent = this.getStyledComponent();

    return (
      <Container size={size} stackIndex={stackIndex}>
        <StyledComponent innerRef={r => (this.node = r)} {...props}>
          <Image
            alt={name}
            appearance={appearance}
            isActive={isActive}
            isFocus={isFocus}
            size={size}
            src={src}
          />
        </StyledComponent>
        {(isHover && name && displayTooltipOnHover) && <Tooltip>{name}</Tooltip>}
        {this.renderIndicator()}
      </Container>
    );
  }
}

export default withPseudoState(Avatar);
