import React, { PureComponent, PropTypes } from 'react';
import styled from 'styled-components';
import Drawer from '../Drawer';
import { createIconOffset } from '../../../shared-variables';

const ContentArea = styled.div`
  position: absolute;
  top: ${createIconOffset}px;
  width: calc(100% - 16px);
`;

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
        <ContentArea>
          {children}
        </ContentArea>
      </Drawer>
    );
  }
}

