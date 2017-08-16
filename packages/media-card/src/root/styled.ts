/* tslint:disable:variable-name */
import styled, {css} from 'styled-components';
import { CardDimensions } from '../';
import {getCSSUnitValue} from '../utils/getCSSUnitValue';

export interface WrapperProps {
  dimensions?: CardDimensions;
}

export const Wrapper = styled.div`
  display: inline-block;
  ${({dimensions}: WrapperProps) => {
    if (dimensions && dimensions.width) {
      return css`width: ${getCSSUnitValue(dimensions.width)};`;
    } else {
      return `
        width: 'inherit';
      `;
    }
  }}
`;
