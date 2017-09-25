import styled from 'styled-components';

import { colors, gridSize, math } from '@atlaskit/theme';

// NOTE: font-size deliberately smaller than default of 14px as this is info text

const StartTrialInfoText = styled.p`
  color: ${colors.N200};
  font-size: 12px;
  margin-bottom: ${math.multiply(gridSize, 1.5)}px;
`;

StartTrialInfoText.displayName = 'StartTrialInfoText';
export default StartTrialInfoText;
