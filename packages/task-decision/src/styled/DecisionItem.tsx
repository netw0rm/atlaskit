import styled from 'styled-components';
import {
  akBorderRadius,
  akGridSizeUnitless,
  akColorN20,
  akColorN80,
} from '@atlaskit/util-shared-styles';

// tslint:disable-next-line:variable-name
export const Wrapper = styled.div`
  background-color: ${akColorN20};
  border-radius: ${akBorderRadius};
  margin: ${akGridSizeUnitless / 2}px 0;
  padding: ${akGridSizeUnitless}px;
  position: relative;
  min-height: 38px;
  box-sizing: border-box;
`;

// tslint:disable-next-line:variable-name
export const ContentWrapper = styled.div`
  margin: 1px 0 1px ${akGridSizeUnitless * 4}px;
`;

// tslint:disable-next-line:variable-name
export const IconWrapper = styled.span`
  height: 24px;
  width: 24px;
  position: absolute;
`;

// tslint:disable-next-line:variable-name
export const Placeholder = styled.span`
  margin: 1px 0 1px ${akGridSizeUnitless * 4}px;
  position: absolute;
  color: ${akColorN80};
  pointer-events: none;
`;
