import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import styles from '../less/DrawerBackIcon.less';

export default class DrawerBackIcon extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    isVisible: PropTypes.bool,
  };

  static defaultProps = {
    isVisible: false,
  }

  render() {
    const {
      children,
      isVisible,
    } = this.props;
    return (
      <div
        className={classNames(styles.backIcon, {
          [styles.isVisible]: isVisible,
        })}
      >
        <div className={classNames(styles.icon)}>{children}</div>
      </div>
    );
  }
}
