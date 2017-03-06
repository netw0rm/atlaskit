import React, { PureComponent, PropTypes } from 'react';
import Drawer from '../Drawer';
import { createIconOffset } from '../../../shared-variables';

export default class CreateDrawer extends PureComponent {
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
      children,
      backIcon,
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
        backIconOffset={createIconOffset}
      >
        {children}
      </Drawer>
    );
  }
}

