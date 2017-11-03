import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const ContextualConfirmTrialContent = styled.div`
  text-align: center;
  margin: auto;
  max-width: ${math.multiply(gridSize, 40)}px;
  
  button {
    margin-top: ${math.multiply(gridSize, 3)}px;
  }
`;

ContextualConfirmTrialContent.displayName = 'ContextualConfirmTrialContent';
export default ContextualConfirmTrialContent;
