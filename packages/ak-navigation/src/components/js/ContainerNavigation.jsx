import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from 'isomorphic-style-loader!../less/ContainerNavigation.less';
import {
  containerOpenWidth,
} from '../../shared-variables';
import Spacer from './Spacer';

class ContainerNavigation extends Component {
  static get propTypes() {
    return {
      children: PropTypes.node,
      header: PropTypes.node,
      width: PropTypes.number,
      shouldAnimate: PropTypes.bool,
    };
  }

  static get defaultProps() {
    return {
      width: containerOpenWidth,
      shouldAnimate: false,
    };
  }

  getOuterStyles() {
    return {
      width: this.props.width,
    };
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
          style={this.getOuterStyles()}
          className={styles.containerNavigationOuter}
        >
          <div
            className={styles.containerNavigationInner}
          >
            <div>
              {this.props.header}
            </div>
            <div>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ContainerNavigation);
