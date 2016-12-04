import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from 'isomorphic-style-loader!../less/GlobalNavigation.less';
import { globalOpenWidth } from '../../shared-variables';
import Spacer from './Spacer';
import withStyles from '../../utils/withStyles';

class GlobalNavigation extends Component {
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
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(GlobalNavigation);
