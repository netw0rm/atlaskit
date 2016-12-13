import classNames from 'classnames';
import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!../less/Drawer.less';

export default class Drawer extends PureComponent {
  static propTypes = {
    open: PropTypes.bool,
    wide: PropTypes.bool,
    children: PropTypes.element,
  }
  static defaultProps = {
    wide: false,
    open: false,
  }

  render() {
    return (
      <div
        className={classNames(styles.drawer, {
          [styles.open]: this.props.open,
          [styles.wide]: this.props.wide,
        })}
      >
        {this.props.children}
      </div>
    );
  }
}

