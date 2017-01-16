import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import styles from 'style!../less/ContainerNavigation.less';
import {
  containerOpenWidth,
  containerClosedWidth,
} from '../../shared-variables';
import Spacer from './Spacer';

export default class ContainerNavigation extends PureComponent {
  static propTypes = {
    appearance: PropTypes.string,
    children: PropTypes.node,
    header: PropTypes.node,
    shouldAnimate: PropTypes.bool,
    width: PropTypes.number,
  }

  static defaultProps = {
    appearance: 'default',
    shouldAnimate: false,
    width: containerOpenWidth,
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
        data-__ak-navigation-container-closed={this.props.width <= containerClosedWidth}
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
            className={classNames(styles.containerNavigationInner, {
              [styles.hasContainerHeader]: this.props.header !== null,
              [styles.hasGlobalAppearance]: this.props.appearance === 'global',
            })}
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
