import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const StartTrialHeader = styled.h3`
  letter-spacing: 1px;
  margin-top: ${math.multiply(gridSize, 0.25)}px;
  margin-bottom: ${math.multiply(gridSize, 2)}px;
`;

StartTrialHeader.displayName = 'StartTrialHeader';
export default StartTrialHeader;
