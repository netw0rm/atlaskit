import React, { PureComponent, PropTypes } from 'react';
import Drawer from '../Drawer';
import { searchIconOffset } from '../../../shared-variables';

export default class CustomDrawer extends PureComponent {
  static propTypes = {
    backIcon: PropTypes.node,
    children: PropTypes.node,
    header: PropTypes.node,
    isOpen: PropTypes.bool,
    isWide: PropTypes.bool,
    onBackButton: PropTypes.func,
    primaryIcon: PropTypes.node,
  }

  render() {
    const {
      backIcon,
      children,
      header,
      isOpen,
      isWide,
      onBackButton,
      primaryIcon,
    } = this.props;

    return (
      <Drawer
        backIcon={backIcon}
        header={header}
        isOpen={isOpen}
        isWide={isWide}
        onBackButton={onBackButton}
        primaryIcon={primaryIcon}
        backIconOffset={searchIconOffset}
      >
        {children}
      </Drawer>
    );
  }
}

