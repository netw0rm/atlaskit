import React, { vdom, Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './GlobalNavigation.less';

export default class GlobalNavigation extends Component {
  render() {
    return (
      <div className={classNames(styles.locals.globalNavigation)}>
        <style>{styles.toString()}</style>
        G
      </div>
    );
  }
}

GlobalNavigation.propTypes = {
  width: PropTypes.number,
};

GlobalNavigation.defaultProps = {
  width: 64,
};
