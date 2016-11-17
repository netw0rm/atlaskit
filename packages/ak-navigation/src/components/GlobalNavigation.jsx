import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './GlobalNavigation.less';
import { globalOpenWidth } from '../utils/style-variables';
import Spacer from './Spacer';

export default class GlobalNavigation extends Component {
  getTranslate() {
    return Math.min(0, this.props.width - globalOpenWidth);
  }
  render() {
    return (
      <div>
        <Spacer width={this.props.width} />
        <div className={classNames(styles.locals.globalNavigation)}>
          <style>{styles.toString()}</style>
          <style>
            {`
              .${styles.locals.globalNavigation} {
                transform: translateX(${this.getTranslate()}px);
              }
            `}
          </style>
          G
        </div>
      </div>
    );
  }
}

GlobalNavigation.propTypes = {
  width: PropTypes.number,
};

GlobalNavigation.defaultProps = {
  width: globalOpenWidth,
};
