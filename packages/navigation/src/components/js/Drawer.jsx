import React, { PureComponent, PropTypes } from 'react';
import { ThemeProvider } from 'styled-components';
import Blanket from '@atlaskit/blanket';
import DrawerTrigger from './DrawerTrigger';
import DrawerBackIcon from './DrawerBackIcon';
import ContainerHeader from './ContainerHeader';
import drawerFixedMixin from '../../utils/drawer-fixed-mixin';
import DrawerSide from '../styled/DrawerSide';
import DrawerInner from '../styled/DrawerInner';
import DrawerHeader from '../styled/DrawerHeader';
import DrawerPrimaryIcon from '../styled/DrawerPrimaryIcon';
import DrawerMain from '../styled/DrawerMain';
import DrawerContent from '../styled/DrawerContent';
import DrawerBackIconWrapper from '../styled/DrawerBackIconWrapper';

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

    const backIconWrapperStyle = {
      top: `${backIconOffset}px`,
    };

    const FixedDrawerSide = drawerFixedMixin(isOpen, width)(DrawerSide);
    const FixedDrawerHeader = drawerFixedMixin(isOpen, width)(DrawerHeader);

    return (
      <div>
        <div style={{ zIndex: 0, position: 'relative' }}>
          <Blanket
            isTinted={isOpen}
            canClickThrough={!isOpen}
            onBlanketClicked={onBackButton}
          />
        </div>
        <DrawerInner isOpen={isOpen} width={width}>
          <FixedDrawerSide>
            <DrawerPrimaryIcon>
              {primaryIcon}
            </DrawerPrimaryIcon>
            <DrawerBackIconWrapper style={backIconWrapperStyle}>
              <DrawerTrigger onActivate={onBackButton}>
                <DrawerBackIcon
                  isVisible={isOpen}
                >
                  {backIcon}
                </DrawerBackIcon>
              </DrawerTrigger>
            </DrawerBackIconWrapper>
          </FixedDrawerSide>
          <DrawerMain>
            {(width !== 'full') ?
              <FixedDrawerHeader>
                <ContainerHeader>{header}</ContainerHeader>
              </FixedDrawerHeader>
            : null}
            <DrawerContent>
              <ThemeProvider theme={{ NavigationAppearance: 'container', NavigationItemIsCompact: false }}>
                {this.props.children}
              </ThemeProvider>
            </DrawerContent>
          </DrawerMain>
        </DrawerInner>
      </div>
    );
  }
}

