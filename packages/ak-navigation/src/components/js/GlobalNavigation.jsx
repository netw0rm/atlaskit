import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import styles from 'style!../less/GlobalNavigation.less';
import { globalOpenWidth } from '../../shared-variables';
import Spacer from './Spacer';

export default class GlobalNavigation extends PureComponent {
  static propTypes = {
    accountItem: PropTypes.node,
    children: PropTypes.node,
    helpItem: PropTypes.node,
    primaryItem: PropTypes.node,
    shouldAnimate: PropTypes.bool,
    width: PropTypes.number,
  };
  static defaultProps = {
    accountItem: null,
    helpItem: null,
    primaryItem: null,
    shouldAnimate: false,
    width: globalOpenWidth,
  };
  getTranslate() {
    return Math.min(0, this.props.width - globalOpenWidth);
  }
  render() {
    return (
      <div
        className={classNames({
          [styles.shouldAnimate]: this.props.shouldAnimate,
        })}
      >
        <Spacer
          width={this.props.width}
          shouldAnimate={this.props.shouldAnimate}
        />
        <div
          className={styles.globalNavigation}
          style={{
            transform: `translateX(${this.getTranslate()}px)`,
          }}
        >
          <div className={styles.primaryIcon}>
            {this.props.primaryItem}
          </div>
          <div className={styles.primaryContainer}>
            {this.props.children}
          </div>
          <div className={styles.secondaryContainer}>
            {this.props.helpItem}
            {this.props.accountItem}
          </div>
        </div>
      </div>
    );
  }
}
