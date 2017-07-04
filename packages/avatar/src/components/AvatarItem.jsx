// @flow
import React, { Component } from 'react';

import { omit } from '../utils';
import { getStyles, Content, Subtitle, Title } from '../styled/AvatarItem';
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
  /** Subtitle text */
  subtitle?: string,
  /** Pass target down to the anchor, if href is provided. */
  target?: '_blank' | '_self',
  /** Title text */
  title?: string,
};

class AvatarItem extends Component {
  props: Props; // eslint-disable-line react/sort-comp
  styledComponents = {}
  getCachedStyledComponent(type) {
    if (!this.styledComponents[type]) {
      this.styledComponents[type] = getStyledComponent[type](getStyles);
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

  render() {
    const { avatar, onClick, subtitle, title } = this.props;

    // distill props from context, props, and state
    const props = getProps(this);

    // provide element type based on props
    const Item = this.getStyledComponent();

    // augment the onClick handler
    props.onClick = onClick && this.guardedClick;

    return (
      <Item innerRef={r => (this.node = r)} {...props}>
        {avatar}
        <Content>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </Content>
      </Item>
    );
  }
}

export default withPseudoState(AvatarItem);
