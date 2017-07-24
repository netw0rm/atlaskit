// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styledRootElement from '../styled/Item';
import {
  BeforeAfter,
  Content,
  ContentWrapper,
  Description,
} from '../styled/ItemParts';

export default class Item extends Component {
  static propTypes = {
    /** Optional function to be used for rendering links. Receives `href` and possibly `target`
      * as props. */
    linkComponent: PropTypes.func,
    /** Main content to be shown inside the item. */
    children: PropTypes.node,
    /** Secondary text to be shown underneath the main content. */
    description: PropTypes.string,
    /** Content to be shown before to the left of the main content (shown to the right of content
      * in RTL mode). */
    elemAfter: PropTypes.node,
    /** Content to be shown before to the right of the main content (shown to the left of content
      * in RTL mode). */
    elemBefore: PropTypes.node,
    /** Link that the user will be redirected to when the item is clicked. If omitted, a
     *  non-hyperlink component will be rendered. */
    href: PropTypes.string,
    /** Causes the item to be rendered with reduced spacing. */
    isCompact: PropTypes.bool,
    /** Causes the item to appear in a disabled state and click behaviours will not be triggered. */
    isDisabled: PropTypes.bool,
    /** Causes the item to still be rendered, but with `display: none` applied. */
    isHidden: PropTypes.bool,
    /** Causes the item to appear with a persistent selected background state. */
    isSelected: PropTypes.bool,
    /** Function to be called when the item is activated, either via a click or via keyboard
     *  interaction. Receives an object with `item` and `event` keys. */
    onClick: PropTypes.func,
    /** Allows the role attribute of the item to be altered from it's default of
     *  `role="presentation"` */
    role: PropTypes.string,
    /** Allows the `children` content to break onto a new line, rather than truncating the
     *  content. */
    shouldAllowMultiline: PropTypes.bool,
    /** Target frame for item `href` link to be aimed at. */
    target: PropTypes.string,
    /** Standard browser title to be displayed on the item when hovered. */
    title: PropTypes.string,
  }

  static defaultProps = {
    description: '',
    isCompact: false,
    isDisabled: false,
    isHidden: false,
    onClick: () => {},
    role: 'presentation',
    shouldAllowMultiline: false,
  }

  // We want to prevent the item from getting focus when clicked
  handleMouseDown = (e: Event) => {
    e.preventDefault();
  }

  href = () => (this.props.isDisabled ? null : this.props.href);

  render() {
    const {
      linkComponent,
      isCompact,
      isDisabled,
      isHidden,
      isSelected,
      role,
      ...otherProps
    } = this.props;

    const Root = styledRootElement({
      href: this.href(),
      linkComponent,
    });

    return (
      <Root
        {...otherProps}
        aria-disabled={isDisabled}
        href={this.href()}
        isCompact={isCompact}
        isDisabled={isDisabled}
        isHidden={isHidden}
        isSelected={isSelected}
        onClick={isDisabled ? null : this.props.onClick}
        onMouseDown={this.handleMouseDown}
        role={role}
        tabIndex={isDisabled || isHidden ? null : 0}
        target={this.props.target}
        title={this.props.title}
      >
        {!!this.props.elemBefore && <BeforeAfter>{this.props.elemBefore}</BeforeAfter>}
        <ContentWrapper>
          <Content allowMultiline={this.props.shouldAllowMultiline}>
            {this.props.children}
          </Content>
          {!!this.props.description && (
            <Description
              isCompact={this.props.isCompact}
              isDisabled={this.props.isDisabled}
            >{this.props.description}</Description>
          )}
        </ContentWrapper>
        {!!this.props.elemAfter && <BeforeAfter>{this.props.elemAfter}</BeforeAfter>}
      </Root>
    );
  }
}
