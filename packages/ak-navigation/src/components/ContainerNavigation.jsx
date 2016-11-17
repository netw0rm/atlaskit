import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './ContainerNavigation.less';
import { containerOpenWidth, containerOpenPadding } from '../utils/style-variables';
import Spacer from './Spacer';

export default class ContainerNavigation extends Component {
  getInnerTranslate() {
    return Math.max(containerOpenWidth - this.props.width, 0);
  }

  getOuterTranslate() {
    return -this.getInnerTranslate();
  }

  getOuterWidth() {
    return Math.max(containerOpenWidth, this.props.width);
  }
  render() {
    return (
      <div>
        <Spacer width={this.props.width} />
        <div className={classNames(styles.locals.containerNavigationOuter)}>
          <style>{styles.toString()}</style>
          <style>
            {`
              .${styles.locals.containerNavigationOuter} {
                transform: translateX(${this.getOuterTranslate()}px);
                width: ${this.getOuterWidth()}px;
              }
              .${styles.locals.containerNavigationInner} {
                padding: 0 ${this.props.padding}px;
                transform: translateX(${this.getInnerTranslate()}px);
              }
            `}
          </style>
          <div className={classNames(styles.locals.containerNavigationInner)}>
            C
          </div>
        </div>
      </div>
    );
  }
}

ContainerNavigation.propTypes = {
  width: PropTypes.number,
  padding: PropTypes.number,
};

ContainerNavigation.defaultProps = {
  width: containerOpenWidth,
  padding: containerOpenPadding,
};
