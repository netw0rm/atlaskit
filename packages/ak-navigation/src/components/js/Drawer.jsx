import classNames from 'classnames';
import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!../less/Drawer.less';

export default class Drawer extends PureComponent {
  static propTypes = {
    children: PropTypes.element,
    isOpen: PropTypes.bool,
    isWide: PropTypes.bool,
  }
  static defaultProps = {
    isOpen: false,
    isWide: false,
  }

  render() {
    return (
      <div
        className={classNames(styles.drawer, {
          [styles.open]: this.props.isOpen,
          [styles.wide]: this.props.isWide,
        })}
      >
        {this.props.children}
      </div>
    );
  }
}

