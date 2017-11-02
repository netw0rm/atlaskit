import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const ContextualConfirmTrialImage = styled.img`
  display: block;
  margin: auto;
  width: ${math.multiply(gridSize, 36)}px;
`;

ContextualConfirmTrialImage.displayName = 'ContextualConfirmTrialImage';
export default ContextualConfirmTrialImage;
