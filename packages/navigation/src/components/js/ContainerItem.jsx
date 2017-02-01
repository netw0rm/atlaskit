import React, { PureComponent, PropTypes } from 'react';
import {
  containerItem,
  hasGlobalAppearance,
  isSelected,
} from 'style!../less/ContainerItem.less';
import className from 'classnames';
import DefaultLinkComponent from './DefaultLinkComponent';
import NavigationItem from './NavigationItem';

export default class ContainerItem extends PureComponent {
  static propTypes = {
    appearance: PropTypes.string,
    icon: PropTypes.node,
    isCompact: PropTypes.bool,
    isSelected: PropTypes.bool,
    subText: PropTypes.string,
    text: PropTypes.node,
    textAfter: PropTypes.node,
    action: PropTypes.node,
    href: PropTypes.string,
    linkComponent: PropTypes.func,
  }

  static defaultProps = {
    isCompact: false,
    isSelected: false,
    linkComponent: DefaultLinkComponent,
  }

  render() {
    return (
      <div
        className={className(containerItem, {
          [hasGlobalAppearance]: this.props.appearance === 'global',
          [isSelected]: this.props.isSelected,
        })}
      >
        <NavigationItem
          action={this.props.action}
          href={this.props.href}
          icon={this.props.icon}
          isCompact={this.props.isCompact}
          isSelected={this.props.isSelected}
          linkComponent={this.props.linkComponent}
          subText={this.props.subText}
          text={this.props.text}
          textAfter={this.props.textAfter}
        />
      </div>
    );
  }
}
