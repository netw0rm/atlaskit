// @flow
import React, { PureComponent } from 'react';
import { borderRadius, colors, gridSize } from '@atlaskit/theme';
import AkMarketplaceIcon from '@atlaskit/icon/glyph/marketplace';
import styled from 'styled-components';

const MarketplaceIconContainer = styled.span`
  border-radius: ${borderRadius()}px;
  background-color: ${colors.N200};
  display: flex;
  height: ${gridSize() * 4}px;
  width: ${gridSize() * 4}px;
`;

const MarketplaceIconContainerInner = styled.span`
  margin: auto;
  padding-top: 2px;
`;

export default class MarketplaceIcon extends PureComponent {
  render() {
    return (
      <MarketplaceIconContainer>
        <MarketplaceIconContainerInner>
          <AkMarketplaceIcon label="" primaryColor={colors.N0} size="medium" />
        </MarketplaceIconContainerInner>
      </MarketplaceIconContainer>
    );
  }
}
