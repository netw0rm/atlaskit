/* tslint:disable: variable-name */
import styled from 'styled-components';
import {akGridSizeUnitless, akFontFamily, akColorN0} from '@atlaskit/util-shared-styles';

export const Wrapper = styled.div`
  padding: ${2 * akGridSizeUnitless}px;
`;

export const Grid = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Col = styled.div`
`;

export const Time = styled.span`
  font: ${akFontFamily};
  color: ${akColorN0};
`;

export const Duration = styled.span`
  font: ${akFontFamily};
  color: #67758f;
`;


  // width: 82px;
  // height: 20px;
  // font-family: SFUIText;
  // font-size: 12;px;
  // font-weight: 500;
  // line-height: 1.67;
  // text-align: center;
  //
