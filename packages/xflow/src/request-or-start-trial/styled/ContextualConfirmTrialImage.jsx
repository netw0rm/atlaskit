import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const ContextualConfirmTrialImage = styled.img`
  @media all and (max-height: 560px) {
    display: none;
  }
  
  display: block;
  margin: auto;
  height: ${math.multiply(gridSize, 18)}px;
  padding-bottom: ${math.multiply(gridSize, 2)}px;
`;

ContextualConfirmTrialImage.displayName = 'ContextualConfirmTrialImage';
export default ContextualConfirmTrialImage;
