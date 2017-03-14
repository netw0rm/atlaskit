import classNames from 'classnames';
import React, { PureComponent, PropTypes } from 'react';
import Blanket from '@atlaskit/blanket';
import styles from 'style!../less/Drawer.less';
import DrawerTrigger from './DrawerTrigger';
import DrawerBackIcon from './DrawerBackIcon';
import ContainerHeader from './ContainerHeader';

export default class Drawer extends PureComponent {
  static propTypes = {
    backIcon: PropTypes.node,
    backIconOffset: PropTypes.number,
    children: PropTypes.node,
    header: PropTypes.node,
    isOpen: PropTypes.bool,
    isWide: PropTypes.bool,
    onBackButton: PropTypes.func,
    primaryIcon: PropTypes.node,
  }
  static defaultProps = {
    backIconOffset: 0,
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
      top: `${backIconOffset}px`,
    };

    return (
      <div>
        <div style={{ zIndex: 0, position: 'relative' }}>
          <Blanket
            isTinted={isOpen}
            canClickThrough={!isOpen}
            onBlanketClicked={onBackButton}
          />
        </div>
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
            <div className={classNames(styles.fixed, styles.header)}>
              <ContainerHeader>{header}</ContainerHeader>
            </div>
            <div className={classNames(styles.content)}>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

