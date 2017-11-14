import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const ContextualConfirmTrialHeading = styled.h2`
  max-width: ${math.multiply(gridSize, 40)}px;
  margin: 0 auto;
  letter-spacing: 0.3px;
`;

ContextualConfirmTrialHeading.displayName = 'ContextualConfirmTrialHeading';
export default ContextualConfirmTrialHeading;
