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
import { focusRingMixin } from './constants';

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
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const DismissButton = styled.button`
  appearance: none;
  background: none;
  border: none;
  border-radius: ${akBorderRadius};
  color: ${akColorN500};
  cursor: pointer;
  display: flex;
  margin-left: ${akGridSize};
  padding: 0;
  white-space: nowrap;

  &:hover {
    color: ${akColorN900};
  }

  ${focusRingMixin}
`;

// Content
export const Content = styled.div`
  flex: 1 1 auto;
  min-width: 0;
`;
export const Description = styled.div`
  color: ${akColorN500};
  margin-top: ${akGridSize};
`;
export const Icon = styled.div`
  flex: 0 0 auto;
  width: ${akGridSizeUnitless * 4}px;
`;
