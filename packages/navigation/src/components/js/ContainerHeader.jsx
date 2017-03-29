import React, { PureComponent, PropTypes } from 'react';
import styled from 'styled-components';
import { akGridSize } from '@atlaskit/util-shared-styles';

const intGridSize = parseInt(akGridSize, 10);
const paddingOpen = `0 ${intGridSize * 1.75}px 0 ${intGridSize * 1.5}px`;
const paddingClosed = `0 ${intGridSize * 2.5}px 0 ${intGridSize * 0.5}px`;

const ContainerHeaderWrapper = styled.div`
  transition: padding 200ms;
  padding: ${paddingOpen};
  margin-bottom: ${intGridSize * 1.5}px;

  [data-__ak-navigation-container-closed="true"] & {
    padding: ${paddingClosed};
  }
`;

export default class ContainerHeader extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <ContainerHeaderWrapper>
        {this.props.children}
      </ContainerHeaderWrapper>
    );
  }
}
