import classNames from 'classnames';
import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!../less/Drawer.less';
import DrawerTrigger from './DrawerTrigger';
import DrawerBackIcon from './DrawerBackIcon';

export default class Drawer extends PureComponent {
  static propTypes = {
    children: PropTypes.element,
    header: PropTypes.node,
    isOpen: PropTypes.bool,
    isWide: PropTypes.bool,
    onBackButton: PropTypes.func,
    primaryIcon: PropTypes.node,
  }
  static defaultProps = {
    onBackButton: () => {},
    primaryItem: null,
    isWide: false,
    isOpen: false,
  }

  render() {
    const {
      header,
      onBackButton,
    } = this.props;
    return (
      <div
        className={classNames(styles.drawer, {
          [styles.open]: this.props.isOpen,
          [styles.wide]: this.props.isWide,
        })}
      >
        <div className={classNames(styles.fixed, styles.side)}>
          <div className={classNames(styles.icon)}>
            {this.props.primaryIcon}
          </div>
          <DrawerTrigger onActivate={onBackButton}>
            <DrawerBackIcon>B</DrawerBackIcon>
          </DrawerTrigger>
        </div>
        <div className={classNames(styles.main)}>
          <div className={classNames(styles.fixed)}>
            {header}
          </div>
          <div>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

