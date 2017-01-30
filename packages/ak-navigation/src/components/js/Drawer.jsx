import classNames from 'classnames';
import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!../less/Drawer.less';
import DrawerTrigger from './DrawerTrigger';
import DrawerBackIcon from './DrawerBackIcon';

export default class Drawer extends PureComponent {
  static propTypes = {
    backIcon: PropTypes.node,
    backIconOffset: PropTypes.number,
    children: PropTypes.element,
    header: PropTypes.node,
    isOpen: PropTypes.bool,
    isWide: PropTypes.bool,
    onBackButton: PropTypes.func,
    primaryIcon: PropTypes.node,
  }
  static defaultProps = {
    onBackButton: () => {},
    primaryIcon: null,
    isWide: false,
    isOpen: false,
  }

  render() {
    const {
      backIcon,
      backIconOffset,
      header,
      isOpen,
      isWide,
      onBackButton,
      primaryIcon,
    } = this.props;

    const backIconOuterStyle = {
      position: 'absolute',
      top: `${backIconOffset}px`,
    };

    return (
      <div
        className={classNames(styles.drawer, {
          [styles.open]: isOpen,
          [styles.wide]: isWide,
        })}
      >
        <div className={classNames(styles.fixed, styles.side)}>
          <div className={classNames(styles.icon)}>
            {primaryIcon}
          </div>
          <div
            className={classNames(styles.backIconOuter)} style={backIconOuterStyle}
          >
            <div className={classNames(styles.backIcon)}>
              <DrawerTrigger onActivate={onBackButton}>
                <DrawerBackIcon
                  isVisible={isOpen}
                >
                  {backIcon}
                </DrawerBackIcon>
              </DrawerTrigger>
            </div>
          </div>
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

