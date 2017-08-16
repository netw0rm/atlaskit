import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const LoadingTimeTextDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  height: ${math.multiply(gridSize, 16)}px;
  overflow: hidden;
`;

LoadingTimeTextDiv.displayName = 'LoadingTimeTextDiv';
export default LoadingTimeTextDiv;
