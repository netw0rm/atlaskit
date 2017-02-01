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
  mainText,
  subText,
  text,
  textAfter,
} from 'style!../less/NavigationItem.less';
import className from 'classnames';
import DefaultLinkComponent from './DefaultLinkComponent';

export default class NavigationItem extends PureComponent {
  static propTypes = {
    action: PropTypes.node,
    href: PropTypes.string,
    icon: PropTypes.node,
    isCompact: PropTypes.bool,
    isSelected: PropTypes.bool,
    linkComponent: PropTypes.func,
    subText: PropTypes.string,
    text: PropTypes.node,
    textAfter: PropTypes.node,
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

    const After = ({ children }) => (this.props.textAfter ?
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
        >
          <div
            className={navigationItemInner}
          >
            <Icon />
            <div className={text}>
              <div className={mainText}>
                {this.props.text}
              </div>
              <div className={subText}>
                {this.props.subText}
              </div>
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
