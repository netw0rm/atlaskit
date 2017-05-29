import styled from 'styled-components';
import { akColorN500, akGridSize, akGridSizeUnitless } from '@atlaskit/util-shared-styles';

export default styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: ${akGridSize};
`;
export const Action = styled.div`
  &::before {
    color: ${akColorN500};
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    width: ${akGridSizeUnitless * 2}px;

    ${({ hasDivider }) => (hasDivider ? 'content: "\u00B7";' : null)} /* middot */
  }
`;
