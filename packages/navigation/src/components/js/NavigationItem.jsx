import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import DefaultLinkComponent from './DefaultLinkComponent';
import InteractiveWrapper from './InteractiveWrapper';

import NavigationItemIcon from '../styled/NavigationItemIcon';
import NavigationItemAfter from '../styled/NavigationItemAfter';
import NavigationItemAction from '../styled/NavigationItemAction';
import NavigationItemCaption from '../styled/NavigationItemCaption';
import NavigationItemText from '../styled/NavigationItemText';
import NavigationItemTextAfter from '../styled/NavigationItemTextAfter';
import NavigationItemInner from '../styled/NavigationItemInner';
import NavigationItemMainText from '../styled/NavigationItemMainText';
import NavigationItemOuter from '../styled/NavigationItemOuter';
import NavigationItemSubText from '../styled/NavigationItemSubText';

export default class NavigationItem extends PureComponent {
  static propTypes = {
    action: PropTypes.node,
    caption: PropTypes.string,
    href: PropTypes.string,
    icon: PropTypes.node,
    dropIcon: PropTypes.node,
    isSelected: PropTypes.bool,
    isDropdownTrigger: PropTypes.bool,
    linkComponent: PropTypes.func,
    onClick: PropTypes.func,
    subText: PropTypes.string,
    text: PropTypes.node,
    textAfter: PropTypes.node,
  }

  static defaultProps = {
    isSelected: false,
    linkComponent: DefaultLinkComponent,
    isDropdownTrigger: false,
  }

  onMouseDown = (e) => {
    e.preventDefault();
  }

  render() {
    const icon = this.props.icon
      ? <NavigationItemIcon>{this.props.icon}</NavigationItemIcon>
      : null;

    const dropIcon = this.props.dropIcon && this.props.isDropdownTrigger ? (
      <NavigationItemIcon
        isDropdownTrigger
        hasNoPadding={this.props.isDropdownTrigger}
      >
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

    const wrappedCaption = this.props.caption
      ? <NavigationItemCaption>{this.props.caption}</NavigationItemCaption>
      : null;

    const interactiveWrapperProps = {
      onMouseDown: this.onMouseDown,
      onClick: this.props.onClick,
    };

    if (!this.props.isDropdownTrigger) {
      interactiveWrapperProps.href = this.props.href;
      interactiveWrapperProps.linkComponent = this.props.linkComponent;
    }

    return (
      <NavigationItemOuter
        isSelected={this.props.isSelected}
        isDropdown={this.props.isDropdownTrigger}
      >
        <InteractiveWrapper
          {...interactiveWrapperProps}
        >
          <NavigationItemInner>
            {icon}
            <NavigationItemText>
              <NavigationItemMainText>
                {this.props.text}
                {wrappedCaption}
              </NavigationItemMainText>
              <NavigationItemSubText>
                {this.props.subText}
              </NavigationItemSubText>
            </NavigationItemText>
            {after}
            {dropIcon}
          </NavigationItemInner>
        </InteractiveWrapper>
        {action}
      </NavigationItemOuter>
    );
  }
}
