// @flow

import styled from 'styled-components';
import { akTypographyMixins, akGridSizeUnitless } from '@atlaskit/util-shared-styles';

export const Outer = styled.div`
  margin: ${akGridSizeUnitless * 3}px 0 0;
`;
export const Title = styled.h1`
  ${akTypographyMixins.h700};
  margin-top: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: ${akGridSizeUnitless * 4}px;
  line-height: ${akGridSizeUnitless * 4}px;
`;

export const BreadcrumbsContainer = styled.div`
  margin-left: -${akGridSizeUnitless / 2}px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${akGridSizeUnitless * 3}px;
`;
export const ActionsWrapper = styled.div`
  white-space: nowrap;
`;

export const BottomBarWrapper = styled.div`
  margin-bottom: ${akGridSizeUnitless * 2}px;
`;
