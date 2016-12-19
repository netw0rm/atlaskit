import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import styles from 'style!../less/GlobalNavigation.less';
import { globalOpenWidth } from '../../shared-variables';
import Spacer from './Spacer';

export default class GlobalNavigation extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    width: PropTypes.number,
    shouldAnimate: PropTypes.bool,
    primaryItem: PropTypes.node,
    helpItem: PropTypes.node,
    accountItem: PropTypes.node,
  };
  static defaultProps = {
    width: globalOpenWidth,
    shouldAnimate: false,
    primaryItem: null,
    helpItem: null,
    accountItem: null,
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
