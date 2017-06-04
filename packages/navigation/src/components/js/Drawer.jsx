// @flow

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
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
import { WithRootTheme } from '../../theme/util';
import { container } from '../../theme/presets';

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
        {(width !== 'full' && header) ?
          <ContainerHeader>{header}</ContainerHeader>
        : null}
        <DrawerContent>
          {this.props.children}
        </DrawerContent>
      </DrawerMain>
    ) : null;

    // Note: even though we are using WithRootTheme here, the Drawer appearance is not able
    // to be customised via a preset or custom theme.
    return (
      <WithRootTheme provided={container}>
        <div>
          <Blanket
            isTinted={isOpen}
            canClickThrough={!isOpen}
            onBlanketClicked={onBackButton}
          />
          <DrawerInner isOpen={isOpen} width={width}>
            {sidebar}
            {content}
          </DrawerInner>
        </div>
      </WithRootTheme>
    );
  }
}
