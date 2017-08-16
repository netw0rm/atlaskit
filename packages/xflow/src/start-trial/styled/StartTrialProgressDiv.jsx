import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const StartTrialProgressDiv = styled.div`
  margin-top: ${math.multiply(gridSize, 1.5)}px;
`;

StartTrialProgressDiv.displayName = 'StartTrialProgressDiv';
export default StartTrialProgressDiv;
