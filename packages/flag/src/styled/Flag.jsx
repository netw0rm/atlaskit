import styled from 'styled-components';
import {
  akBorderRadius,
  akColorN0,
  akColorN500,
  akColorN900,
  akGridSize,
  akGridSizeUnitless,
  akElevationMixins,
} from '@atlaskit/util-shared-styles';
import { flagWidthUnitless, focusRingMixin } from './constants';

export default styled.div`
  background-color: ${akColorN0};
  border-radius: ${akBorderRadius};
  box-sizing: border-box;
  display: flex;
  padding: ${akGridSizeUnitless * 2}px;
  width: 100%;

  ${akElevationMixins.e600}
  ${focusRingMixin}
`;

// Header
export const Header = styled.div`
  display: flex;
`;
export const Title = styled.span`
  font-weight: 600;
  flex: 1 0 auto;
  max-width: ${flagWidthUnitless - (akGridSizeUnitless * 12)}px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const DismissButton = styled.button`
  appearance: none;
  background: none;
  border: none;
  color: ${akColorN500};
  cursor: pointer;
  display: flex;
  flex: 0 1 auto;
  justify-content: flex-end;
  margin: 0;
  padding: 0;
  width: ${akGridSizeUnitless * 4}px;

  &:hover {
    color: ${akColorN900};
  }

  ${focusRingMixin}
`;

// Content
export const Content = styled.div`
  flex: 1 1 auto;
`;
export const Description = styled.div`
  color: ${akColorN500};
  margin-top: ${akGridSize};
`;
export const Icon = styled.div`
  flex: 0 0 auto;
  width: ${akGridSizeUnitless * 4}px;
`;
