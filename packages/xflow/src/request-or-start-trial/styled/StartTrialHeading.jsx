import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const StartTrialHeading = styled.h3`
  letter-spacing: 1px;
  margin-bottom: ${math.multiply(gridSize, 1.5)}px;
  margin-top: ${math.multiply(gridSize, 0.25)}px;
`;

StartTrialHeading.displayName = 'StartTrialHeading';
export default StartTrialHeading;
