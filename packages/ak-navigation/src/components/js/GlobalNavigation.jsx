import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from 'style!../less/GlobalNavigation.less';
import { globalOpenWidth } from '../../shared-variables';
import Spacer from './Spacer';

export default class GlobalNavigation extends Component {
  static propTypes = {
    children: PropTypes.node,
    primaryIcon: PropTypes.node,
    width: PropTypes.number,
    shouldAnimate: PropTypes.bool,
    helpIcon: PropTypes.node,
    accountIcon: PropTypes.node,
  };
  static defaultProps = {
    width: globalOpenWidth,
    shouldAnimate: false,
    primaryIcon: null,
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
            {this.props.primaryIcon}
          </div>
          <div className={styles.primaryContainer}>
            {this.props.children}
          </div>
          <div className={styles.secondaryContainer}>
            {this.props.helpIcon}
            {this.props.accountIcon}
          </div>
        </div>
      </div>
    );
  }
}
