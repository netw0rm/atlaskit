import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from 'style!../less/ContainerNavigation.less';
import {
  containerOpenWidth,
  containerBodyOpenPadding,
  containerBodyClosedPadding,
  containerHeaderOpenPadding,
  containerHeaderClosedPadding,
} from '../../shared-variables';
import Spacer from './Spacer';
import { getContainerPadding } from '../../utils/collapse';

export default class ContainerNavigation extends Component {
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

  getHeaderStyles() {
    const padding = getContainerPadding(
      this.props.width,
      containerHeaderOpenPadding,
      containerHeaderClosedPadding,
    );
    return {
      paddingLeft: padding,
      paddingRight: padding,
    };
  }

  getBodyStyles() {
    const padding = getContainerPadding(
      this.props.width,
      containerBodyOpenPadding,
      containerBodyClosedPadding,
    );
    return {
      paddingLeft: padding,
      paddingRight: padding,
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
            <div style={this.getHeaderStyles()}>
              {this.props.header}
            </div>
            <div style={this.getBodyStyles()}>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
