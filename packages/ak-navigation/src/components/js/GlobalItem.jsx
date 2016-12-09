import React, { Component, PropTypes } from 'react';
import styles from 'style!../less/GlobalItem.less';
import classNames from 'classnames';

export default class GlobalItem extends Component {
  static propTypes = {
    children: PropTypes.node,
    onActivate: PropTypes.func,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
  };
  static defaultProps = {
    onActivate: () => {},
    size: 'medium',
  };

  render() {
    if (this.props.children === null) return null;
    return (
      <button
        onClick={() => this.props.onActivate()}
        onMouseDown={e => e.preventDefault()}
        tabIndex="0"
        className={classNames(styles.globalItem, {
          [styles.smallGlobalItem]: this.props.size === 'small',
          [styles.mediumGlobalItem]: this.props.size === 'medium',
          [styles.largeGlobalItem]: this.props.size === 'large',
        })}
      >
        {this.props.children}
      </button>
    );
  }
}
