import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!../less/GlobalItem.less';
import classNames from 'classnames';
import DefaultLinkComponent from './DefaultLinkComponent';

export default class GlobalItem extends PureComponent {
  static propTypes = {
    appearance: PropTypes.oneOf(['container', 'global', 'project-settings']),
    children: PropTypes.node,
    href: PropTypes.string,
    isSelected: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    linkComponent: PropTypes.func,
  };
  static defaultProps = {
    appearance: 'global',
    size: 'small',
    linkComponent: DefaultLinkComponent,
  };

  render() {
    const {
      href,
      linkComponent: Link,
    } = this.props;
    return (
      <Link href={href}>
        <div
          className={classNames(styles.globalItem, {
            [styles.smallGlobalItem]: this.props.size === 'small',
            [styles.mediumGlobalItem]: this.props.size === 'medium',
            [styles.largeGlobalItem]: this.props.size === 'large',
            [styles.isSelected]: this.props.isSelected,
            [styles.hasContainerAppearance]: this.props.appearance === 'container',
            [styles.hasProjectSettingsAppearance]: this.props.appearance === 'project-settings',
          })}
        >
          {this.props.children}
        </div>
      </Link>
    );
  }
}
