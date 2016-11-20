import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from '../less/GlobalNavigation.less';
import { globalOpenWidth } from '../../shared-variables';
import Spacer from './Spacer';

export default class GlobalNavigation extends Component {
  static get propTypes() {
    return {
      children: PropTypes.node,
      width: PropTypes.number,
      shouldAnimate: PropTypes.bool,
    };
  }
  static get defaultProps() {
    return {
      width: globalOpenWidth,
      shouldAnimate: false,
    };
  }
  getTranslate() {
    return Math.min(0, this.props.width - globalOpenWidth);
  }
  render() {
    return (
      <div
        className={classNames({
          [styles.locals.shouldAnimate]: this.props.shouldAnimate,
        })}
      >
        <Spacer
          width={this.props.width}
          shouldAnimate={this.props.shouldAnimate}
        />
        <div className={classNames(styles.locals.globalNavigation)}>
          <style>{styles.toString()}</style>
          <style>
            {`
              .${styles.locals.globalNavigation} {
                transform: translateX(${this.getTranslate()}px);
              }
            `}
          </style>
          {this.props.children}
        </div>
      </div>
    );
  }
}
