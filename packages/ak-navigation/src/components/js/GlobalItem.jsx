import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!../less/GlobalItem.less';
import classNames from 'classnames';

export default class GlobalItem extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    isSelected: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
  };
  static defaultProps = {
    size: 'small',
  };

  render() {
    if (this.props.children === null) return null;
    return (
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
    );
  }
}
