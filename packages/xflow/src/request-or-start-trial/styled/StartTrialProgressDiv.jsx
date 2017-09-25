import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const StartTrialProgressDiv = styled.div`
  padding-left: ${math.multiply(gridSize, 1.5)}px;px;
`;

StartTrialProgressDiv.displayName = 'StartTrialProgressDiv';
export default StartTrialProgressDiv;
