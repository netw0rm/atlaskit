// @flow
import React, { PureComponent } from 'react';
// NavigationItem is an extension of DropdownItem because of the 'collapsed overflow' behaviour,
// which places NavigationItems into a dropdown menu when there are too many to fit. Ideally we
// would have the 'collapsed overflow' feature wrap the children in a HOC provided by dropdown,
// but this is not possible because the children could be either a NavigationItem or a
// NavigationItemGroup so we cannot reliably map over the children to wrap them.
import { DropdownItem as Item } from '@atlaskit/dropdown-menu';
import NavigationItemAction from '../styled/NavigationItemAction';
import NavigationItemAfter from '../styled/NavigationItemAfter';
import NavigationItemCaption from '../styled/NavigationItemCaption';
import NavigationItemIcon from '../styled/NavigationItemIcon';
import NavigationItemTextAfter from '../styled/NavigationItemTextAfter';
import NavigationItemAfterWrapper from '../styled/NavigationItemAfterWrapper';
import type { ReactElement, ReactClass, DragProvided } from '../../types';

type Props = {|
  action?: ReactElement,
  /** Text to appear to the right of the text. It has a lower font-weight. */
  caption?: string,
  dnd?: DragProvided,
  /** Location to link out to on click. This is passed down to the custom link
  component if one is provided. */
  href?: string,
  /** React element to appear to the left of the text. This should be an
  @atlaskit/icon component. */
  icon?: ReactElement,
  /** Element displayed to the right of the item. The dropIcon should generally be
  an appropriate @atlaskit icon, such as the ExpandIcon. */
  dropIcon?: ReactElement,
  /** Makes the navigation item appear with reduced padding and font size. */
  isCompact?: boolean,
  /** Used to apply correct dragging styles when also using react-beautiful-dnd. */
  isDragging?: boolean,
  /** Set whether the icon should be highlighted as selected. Selected items have
  a different background color. */
  isSelected?: boolean,
  /** Set whether the item should be used to trigger a dropdown. If this is true,
  The href property will be disabled. */
  isDropdownTrigger?: boolean,
  /** Component to be used as link, if default link component does not suit, such
  as if you are using a different router. Component is passed a href prop, and the content
  of the title as children. Any custom link component must accept a className prop so that
  it can be styled. */
  linkComponent?: ReactClass,
  /** Function to be called on click. This is passed down to a custom link component,
  if one is provided.  */
  onClick ?: (e: MouseEvent) => void,
  /** Function to be called on click. This is passed down to a custom link component,
  if one is provided.  */
  onKeyDown?: (e: KeyboardEvent) => void,
  /** Standard onmouseenter event */
  onMouseEnter?: (e: MouseEvent) => void,
  /** Standard onmouseleave event */
  onMouseLeave?: (e: MouseEvent) => void,
  /** Text to be shown alongside the main `text`. */
  subText?: string,
  /** Main text to be displayed as the item. Accepts a react component but in most
  cases this should just be a string. */
  text?: ReactElement,
  /** React component to be placed to the right of the main text. */
  textAfter ?: ReactElement,
  /** Whether the Item should attempt to gain browser focus when mounted */
  autoFocus?: boolean
|}

export default class NavigationItem extends PureComponent {
  static defaultProps = {
    isSelected: false,
    isDropdownTrigger: false,
    autoFocus: false,
  }

  props: Props

  render() {
    const icon = this.props.icon
      ? <NavigationItemIcon>{this.props.icon}</NavigationItemIcon>
      : null;

    const dropIcon = this.props.dropIcon && this.props.isDropdownTrigger ? (
      <NavigationItemIcon isDropdownTrigger>
        {this.props.dropIcon}
      </NavigationItemIcon>
    ) : null;

    const textAfter = this.props.textAfter
      ? <NavigationItemTextAfter>{this.props.textAfter}</NavigationItemTextAfter>
      : null;

    const action = this.props.action
      ? <NavigationItemAction>{this.props.action}</NavigationItemAction>
      : null;

    const after = this.props.textAfter ? (
      <NavigationItemAfter
        shouldTakeSpace={this.props.action || this.props.textAfter}
        isDropdownTrigger={this.props.isDropdownTrigger}
      >
        {textAfter}
      </NavigationItemAfter>
    ) : null;

    // There are various 'after' elements which are all optional. If any of them are present we
    // render those inside a shared wrapper.
    const allAfter = (after || dropIcon || action) ? (
      <NavigationItemAfterWrapper>
        {after}
        {dropIcon}
        {action}
      </NavigationItemAfterWrapper>
    ) : null;

    const wrappedCaption = this.props.caption
      ? <NavigationItemCaption>{this.props.caption}</NavigationItemCaption>
      : null;

    const interactiveWrapperProps = {
      onClick: this.props.onClick,
      onKeyDown: this.props.onKeyDown,
      onMouseEnter: this.props.onMouseEnter,
      onMouseLeave: this.props.onMouseLeave,
      href: this.props.href,
      linkComponent: this.props.linkComponent,
    };

    return (
      <Item
        elemBefore={icon}
        elemAfter={allAfter}
        description={this.props.subText}
        isSelected={this.props.isSelected}
        isDragging={this.props.isDragging}
        isDropdown={this.props.isDropdownTrigger}
        isCompact={this.props.isCompact}
        dnd={this.props.dnd}
        autoFocus={this.props.autoFocus}
        {...interactiveWrapperProps}
      >
        {this.props.text}
        {wrappedCaption}
      </Item>
    );
  }
}
