import classNames from 'classnames';
import React, { PureComponent, PropTypes } from 'react';
import { ThemeProvider } from 'styled-components';
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
    onBackButton: PropTypes.func,
    primaryIcon: PropTypes.node,
    width: PropTypes.oneOf(['narrow', 'wide', 'full']),
  }
  static defaultProps = {
    backIconOffset: 0,
    onBackButton: () => {},
    primaryIcon: null,
    width: 'narrow',
    isOpen: false,
  }

  render() {
    const {
      backIcon,
      backIconOffset,
      header,
      isOpen,
      onBackButton,
      primaryIcon,
      width,
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
            [styles.wideWidth]: (width === 'wide'),
            [styles.fullWidth]: (width === 'full'),
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
            {(width !== 'full') ?
              <div className={classNames(styles.fixed, styles.header)}>
                <ContainerHeader>{header}</ContainerHeader>
              </div>
            : null}
            <div className={classNames(styles.content)}>
              <ThemeProvider theme={{ ContainerNavigationAppearance: 'container', NavigationItemIsCompact: false }}>
                {this.props.children}
              </ThemeProvider>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

