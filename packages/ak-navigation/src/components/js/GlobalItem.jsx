import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!../less/GlobalItem.less';
import classNames from 'classnames';
import DefaultLinkComponent from './DefaultLinkComponent';

export default class GlobalItem extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    href: PropTypes.string,
    isSelected: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    linkComponent: PropTypes.func,
  };
  static defaultProps = {
    size: 'small',
    linkComponent: DefaultLinkComponent,
  };

  render() {
    const Link = this.props.linkComponent;
    const {
      href,
    } = this.props;
    return (
      <Link href={href}>
        <div
          className={classNames(styles.globalItem, {
            [styles.smallGlobalItem]: this.props.size === 'small',
            [styles.mediumGlobalItem]: this.props.size === 'medium',
            [styles.largeGlobalItem]: this.props.size === 'large',
            [styles.isSelected]: this.props.isSelected,
          })}
        >
          {this.props.children}
        </div>
      </Link>
    );
  }
}
