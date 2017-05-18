import React, { PureComponent, PropTypes } from 'react';
import styled from 'styled-components';
import Drawer from '../Drawer';
import { searchIconOffset } from '../../../shared-variables';

const ContentArea = styled.div`
  bottom: 0; /* Required for children elements be able to have bottom of a screen */
  position: absolute;
  transition: top 220ms;
  top: ${props => (props.isFullWidth ? 0 : searchIconOffset)}px;
  width: calc(100% - 16px);
`;

export default class CustomDrawer extends PureComponent {
  static propTypes = {
    backIcon: PropTypes.node,
    children: PropTypes.node,
    header: PropTypes.node,
    isOpen: PropTypes.bool,
    onBackButton: PropTypes.func,
    primaryIcon: PropTypes.node,
    width: PropTypes.oneOf(['narrow', 'wide', 'full']),
  }

  static defaultProps = {
    width: 'wide',
  }

  render() {
    const {
      backIcon,
      children,
      header,
      isOpen,
      onBackButton,
      primaryIcon,
      width,
    } = this.props;

    return (
      <Drawer
        backIcon={backIcon}
        backIconOffset={searchIconOffset}
        header={header}
        isOpen={isOpen}
        onBackButton={onBackButton}
        primaryIcon={primaryIcon}
        width={width}
      >
        <ContentArea isFullWidth={width === 'full'}>
          {children}
        </ContentArea>
      </Drawer>
    );
  }
}

