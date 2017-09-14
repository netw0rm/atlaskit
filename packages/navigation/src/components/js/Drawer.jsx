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

const escKeyCode = 27;

export default class Drawer extends PureComponent {
  static propTypes = {
    backIcon: PropTypes.node,
    children: PropTypes.node,
    header: PropTypes.node,
    isOpen: PropTypes.bool,
    iconOffset: PropTypes.number,
    onBackButton: PropTypes.func,
    primaryIcon: PropTypes.node,
    width: PropTypes.oneOf(['narrow', 'wide', 'full']),
    onKeyDown: PropTypes.func,
  }
  static defaultProps = {
    iconOffset: 0,
    onBackButton: () => { },
    primaryIcon: null,
    width: 'narrow',
    isOpen: false,
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event: KeyboardEvent) => {
    // The reason we have onKeyDown living together with onBackButton is because
    // some apps living in Focused task need the ability to handle on key down by itself.
    // However, some other apps don't really care about it
    // and leave it to the Focused task to handle.
    // Calling onKeyDown first can either supplement or override onBackButton.
    const { onKeyDown, onBackButton } = this.props;
    if (onKeyDown) {
      onKeyDown(event);
    }
    if (!event.defaultPrevented && event.keyCode === escKeyCode) {
      onBackButton(event);
    }
  }

  render() {
    const {
      backIcon,
      header,
      isOpen,
      onBackButton,
      primaryIcon,
      width,
      iconOffset,
    } = this.props;

    const actualFullWidth = width === 'full';

    const sidebar = isOpen ? (
      <DrawerSide>
        <DrawerPrimaryIcon>
          {primaryIcon}
        </DrawerPrimaryIcon>
        <DrawerBackIconWrapper iconOffset={iconOffset}>
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
        <ContainerHeader isInDrawer iconOffset={iconOffset} isFullWidth={actualFullWidth}>
          {(width !== 'full') ? header : null}
        </ContainerHeader>
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
