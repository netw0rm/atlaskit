import React, { PureComponent, PropTypes } from 'react';
import {
  action,
  after,
  navigationItemInner,
  navigationItemOuter,
  icon,
  isSelected,
  isCompact,
  link,
  text,
  textAfter,
} from 'style!../less/NavigationItem.less';
import className from 'classnames';
import DefaultLinkComponent from './DefaultLinkComponent';

export default class NavigationItem extends PureComponent {
  static propTypes = {
    icon: PropTypes.node,
    isCompact: PropTypes.bool,
    isSelected: PropTypes.bool,
    text: PropTypes.node,
    textAfter: PropTypes.node,
    action: PropTypes.node,
    href: PropTypes.string,
    linkComponent: PropTypes.func,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    isCompact: false,
    isSelected: false,
    linkComponent: DefaultLinkComponent,
  }

  onMouseDown = (e) => {
    e.preventDefault();
  }

  render() {
    const Link = this.props.linkComponent;
    const Icon = () => (this.props.icon ? <div className={icon}>{this.props.icon}</div> : null);

    const TextAfter = () => (this.props.textAfter ?
      <div className={textAfter}>
        {this.props.textAfter}
      </div>
    : null);

    const Action = () => (this.props.action ?
      <div className={action}>
        {this.props.action}
      </div>
    : null);

    const After = ({ children }) => (TextAfter || Action ?
      <div className={after}>
        {children}
      </div>
    : null);

    return (
      <div
        className={className(navigationItemOuter, {
          [isSelected]: this.props.isSelected,
          [isCompact]: this.props.isCompact,
        })}
      >
        <Link
          className={link}
          href={this.props.href}
          onMouseDown={this.onMouseDown}
          onClick={this.props.onClick}
        >
          <div
            className={navigationItemInner}
          >
            <Icon />
            <div className={text}>
              {this.props.text}
            </div>
            <After>
              <TextAfter />
            </After>
          </div>
        </Link>
        <Action />
      </div>
    );
  }
}
