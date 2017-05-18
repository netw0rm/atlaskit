import { akGridSize } from '@atlaskit/util-shared-styles';
import { css } from 'styled-components';

export const foundationLargeWidth = '64em';
export const gridSize = parseInt(akGridSize, 10);

export const setAnchorStates = (...args) => css`
  a, a:hover, a:visited {
    ${css(...args)}
  }
`;
