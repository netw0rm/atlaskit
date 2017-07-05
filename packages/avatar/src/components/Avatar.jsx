// @flow
import React, { Component } from 'react';

import { omit } from '../utils';
import Outer, { PresenceWrapper, StatusWrapper } from '../styled/Avatar';
import Presence from './Presence';
import Image from './AvatarImage';
import Status from './Status';
import Tooltip from '../styled/Tooltip';
import { getProps, getStyledComponent } from '../helpers';
import { withPseudoState } from '../hoc';
import { DEFAULT_BORDER_COLOR } from '../styled/constants';
import type { AvatarProps } from '../types';
import { getInnerStyles } from '../styled/utils';

// =============================================================
// NOTE: Duplicated in Presence until docgen can follow imports.
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

export const ICON_TYPE = {
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
    displayTooltip: true,
    size: SIZE.defaultValue,
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
      this.styledComponents[type] = getStyledComponent[type](getInnerStyles);
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

  // expose blur/focus to consumers via inner ref
  blur = () => this.node.blur()
  focus = () => this.node.focus()

  // disallow click on disabled avatars
  guardedClick = (event) => {
    const { isDisabled, onClick } = this.props;

    if (isDisabled) return;

    const item = omit(this.props,
      'onBlur',
      'onClick',
      'onFocus',
      'onKeyDown',
      'onKeyUp',
      'onMouseDown',
      'onMouseEnter',
      'onMouseLeave',
      'onMouseUp',
    );

    onClick({ item, event });
  }

  // enforce status / presence rules
  /* eslint-disable no-console */
  renderIndicator = () => {
    const { appearance, borderColor, icon, presence, size, status } = this.props;
    const showPresence = !!(presence || icon);
    const showStatus = !!status;
    const invalidIndicatorSizes = ['xsmall', 'xxlarge'];

    // add warnings for various invalid states
    if (invalidIndicatorSizes.includes(size) && (showPresence || showStatus)) {
      console.warn(`Avatar size "${size}" does NOT support ${showPresence ? 'presence' : 'status'}`);
      return null;
    }
    if (showPresence && showStatus) {
      console.warn('Avatar does NOT support `status` AND `presence` on the same instance.');
      return null;
    }
    if (icon && presence) {
      console.warn('Avatar does NOT support `icon` AND `presence` on the same instance.');
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
  /* eslint-enable no-console */

  render() {
    const {
      appearance, displayTooltip, isActive, isFocus, isHover, onClick,
      name, size, src, stackIndex,
    } = this.props;

    // distill props from context, props, and state
    const props = getProps(this);

    // provide element type based on props
    const Inner = this.getStyledComponent();

    // augment the onClick handler
    props.onClick = onClick && this.guardedClick;

    return (
      <Outer size={size} stackIndex={stackIndex}>
        <Inner innerRef={r => (this.node = r)} {...props}>
          <Image
            alt={name}
            appearance={appearance}
            isActive={isActive}
            isFocus={isFocus}
            size={size}
            src={src}
          />
        </Inner>
        {(displayTooltip && isHover && name) ? (
          <Tooltip>{name}</Tooltip>
        ) : null}
        {this.renderIndicator()}
      </Outer>
    );
  }
}

export default withPseudoState(Avatar);
