import React, { PureComponent, PropTypes } from 'react';
import Blanket from '@atlaskit/blanket';
import DrawerTrigger from './DrawerTrigger';
import DrawerBackIcon from './DrawerBackIcon';
import ContainerHeader from './ContainerHeader';
import DrawerSide from '../styled/DrawerSide';
import DrawerInner from '../styled/DrawerInner';
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
    onBackButton: () => { },
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

    const sidebar = isOpen ? (
      <DrawerSide>
        <DrawerPrimaryIcon>
          {primaryIcon}
        </DrawerPrimaryIcon>
        <DrawerBackIconWrapper style={backIconWrapperStyle}>
          <DrawerTrigger onActivate={onBackButton}>
            <DrawerBackIcon isVisible={isOpen}>
              {backIcon}
            </DrawerBackIcon>
          </DrawerTrigger>
        </DrawerBackIconWrapper>
      </DrawerSide>
    ) : null;

    const content = isOpen ? (
      <DrawerMain>
        {((width !== 'full') && header) ?
          <ContainerHeader>{header}</ContainerHeader>
        : null}
        <DrawerContent>
          {this.props.children}
        </DrawerContent>
      </DrawerMain>
    ) : null;

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
          {sidebar}
          {content}
        </DrawerInner>
      </div>
    );
  }
}

