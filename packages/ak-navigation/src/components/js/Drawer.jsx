import classNames from 'classnames';
import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!../less/Drawer.less';
import DrawerTrigger from './DrawerTrigger';
import GlobalItem from './GlobalItem';

export default class Drawer extends PureComponent {
  static propTypes = {
    children: PropTypes.element,
    isOpen: PropTypes.bool,
    isWide: PropTypes.bool,
    primaryIcon: PropTypes.node,
    header: PropTypes.node,
  }
  static defaultProps = {
    isOpen: false,
    isWide: false,
    primaryItem: PropTypes.null,
  }

  render() {
    const {
      header,
      isOpen,
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
          <DrawerTrigger>
            <GlobalItem isSelected={isOpen} size="medium">
              B
            </GlobalItem>
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

