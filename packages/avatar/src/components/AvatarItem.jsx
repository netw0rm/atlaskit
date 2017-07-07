// @flow
import React, { cloneElement, Component } from 'react';

import { omit } from '../utils';
import { bgActiveColor, bgHoverColor, getStyles, Content, SecondaryText, PrimaryText } from '../styled/AvatarItem';
import { getProps, getStyledComponent } from '../helpers';
import { withPseudoState } from '../hoc';

/* eslint-disable react/no-unused-prop-types */
type Props = {
  avatar: Object,
  /** A custom component to use instead of the default span. */
  component?: Function | string,
  /** Provides a url for avatars being used as a link. */
  href?: string,
  /** Change the style to indicate the item is active. */
  isActive?: boolean,
  /** Change the style to indicate the item is disabled. */
  isDisabled?: boolean,
  /** Change the style to indicate the item is focused. */
  isFocus?: boolean,
  /** Change the style to indicate the item is hovered. */
  isHover?: boolean,
  /** Change the style to indicate the item is selected. */
  isSelected?: boolean,
  /** Handler to be called on click. */
  onClick?: ({ event: Object, info: Object }) => void,
  /** PrimaryText text */
  primaryText?: string,
  /** SecondaryText text */
  secondaryText?: string,
  /** Pass target down to the anchor, if href is provided. */
  target?: '_blank' | '_self',
  /** Whether or not overflowing primary and secondary text is truncated */
  enableTextTruncate?: boolean,
};

class AvatarItem extends Component {
  props: Props; // eslint-disable-line react/sort-comp
  cache = {}

  static defaultProps = { enableTextTruncate: true }

  getCachedComponent(type) {
    if (!this.cache[type]) {
      this.cache[type] = getStyledComponent[type](getStyles);
    }
    return this.cache[type];
  }
  getStyledComponent() {
    const { component, href, onClick } = this.props;
    let node = 'span';

    if (component) node = 'custom';
    else if (href) node = 'link';
    else if (onClick) node = 'button';

    return this.getCachedComponent(node);
  }
  getBorderColor = () => {
    const { href, isActive, isHover, isSelected, onClick } = this.props;
    const isInteractive = href || onClick;
    let borderColor;

    if (isInteractive && (isHover || isSelected)) borderColor = bgHoverColor;
    if (isInteractive && isActive) borderColor = bgActiveColor;

    return borderColor;
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

  render() {
    const { avatar, enableTextTruncate, onClick, primaryText, secondaryText } = this.props;

    // maintain the illusion of a mask around presence/status
    const borderColor = this.getBorderColor();

    // distill props from context, props, and state
    const props = getProps(this);

    // provide element type based on props
    const Item = this.getStyledComponent();

    // augment the onClick handler
    props.onClick = onClick && this.guardedClick;

    return (
      <Item innerRef={r => (this.node = r)} {...props}>
        {cloneElement(avatar, { borderColor })}
        <Content truncate={enableTextTruncate}>
          <PrimaryText truncate={enableTextTruncate}>{primaryText}</PrimaryText>
          <SecondaryText truncate={enableTextTruncate}>{secondaryText}</SecondaryText>
        </Content>
      </Item>
    );
  }
}

export default withPseudoState(AvatarItem);
