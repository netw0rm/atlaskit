import React, { PureComponent, PropTypes } from 'react';
import styled from 'styled-components';
import Drawer from '../Drawer';
import { createIconOffset } from '../../../shared-variables';

const ContentArea = styled.div`
  position: absolute;
  transition: top 220ms;
  top: ${props => (props.isFullWidth ? 0 : createIconOffset)}px;
  width: calc(100% - 16px);
`;

export default class CreateDrawer extends PureComponent {
  static propTypes = {
    backIcon: PropTypes.node,
    children: PropTypes.node,
    header: PropTypes.node,
    isOpen: PropTypes.bool,
    isFullWidth: PropTypes.bool,
    onBackButton: PropTypes.func,
    primaryIcon: PropTypes.node,
  }

  render() {
    const {
      children,
      backIcon,
      header,
      isFullWidth,
      isOpen,
      onBackButton,
      primaryIcon,
    } = this.props;

    return (
      <Drawer
        backIcon={backIcon}
        header={header}
        isOpen={isOpen}
        width={isFullWidth ? 'full' : 'narrow'}
        onBackButton={onBackButton}
        primaryIcon={primaryIcon}
        backIconOffset={createIconOffset}
      >
        <ContentArea isFullWidth={isFullWidth}>
          {children}
        </ContentArea>
      </Drawer>
    );
  }
}

