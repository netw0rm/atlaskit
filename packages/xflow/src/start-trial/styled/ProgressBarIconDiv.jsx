import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const ProgressBarIconDiv = styled.div`
  grid-column: 3;
  height: ${math.multiply(gridSize, 3)}px;
`;

ProgressBarIconDiv.displayName = 'ProgressBarIconDiv';
export default ProgressBarIconDiv;
