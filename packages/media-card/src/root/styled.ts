/* tslint:disable:variable-name */
import styled from 'styled-components';
import { CardDimensions } from '../';

export interface WrapperProps {
  dimensions?: CardDimensions;
}

export const Wrapper = styled.div`
  display: inline-block;
  ${({dimensions}: WrapperProps) => {
    if (dimensions && dimensions.width) {
      return `
        width: ${dimensions.width};
      `;
    } else {
      return `
        width: 'inherit';
      `;
    }
  }}
`;
