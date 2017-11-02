import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const ContextualConfirmTrialImage = styled.img`
  display: block;
  margin: auto;
  height: ${math.multiply(gridSize, 18)}px;
`;

ContextualConfirmTrialImage.displayName = 'ContextualConfirmTrialImage';
export default ContextualConfirmTrialImage;
