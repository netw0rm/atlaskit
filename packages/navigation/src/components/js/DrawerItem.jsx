import React, { PureComponent, PropTypes } from 'react';
import {
  drawerItem,
} from 'style!../less/DrawerItem.less';
import className from 'classnames';
import DefaultLinkComponent from './DefaultLinkComponent';
import NavigationItem from './NavigationItem';

export default class DrawerItem extends PureComponent {
  static propTypes = {
    action: PropTypes.node,
    href: PropTypes.string,
    icon: PropTypes.node,
    isCompact: PropTypes.bool,
    linkComponent: PropTypes.func,
    onClick: PropTypes.func,
    subText: PropTypes.string,
    text: PropTypes.node,
    textAfter: PropTypes.node,
  }

  static defaultProps = {
    isCompact: false,
    isSelected: false,
    linkComponent: DefaultLinkComponent,
  }

  render() {
    return (
      <div
        className={className(drawerItem)}
      >
        <NavigationItem
          action={this.props.action}
          href={this.props.href}
          icon={this.props.icon}
          isCompact={this.props.isCompact}
          linkComponent={this.props.linkComponent}
          onClick={this.props.onClick}
          subText={this.props.subText}
          text={this.props.text}
          textAfter={this.props.textAfter}
        />
      </div>
    );
  }
}
