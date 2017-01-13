import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import styles from 'style!../less/DrawerBackIcon.less';

export default class DrawerBack extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    isVisible: PropTypes.bool,
  };

  static defaultProps = {
    children: null,
    isVisible: false,
  }

  render() {
    const {
      children,
      isVisible,
    } = this.props;
    if (this.props.children === null) return null;
    return (
      <div
        className={classNames(styles.backIcon, {
          [styles.isVisible]: isVisible,
        })}
      >
        {children}
      </div>
    );
  }
}
