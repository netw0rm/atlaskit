import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const ContextualConfirmTrialContent = styled.div`
  text-align: center;
  margin-top: ${math.multiply(gridSize, 3)}px;
  
  button {
    margin-top: ${math.multiply(gridSize, 2)}px;
  }
  
  Spinner {
    top: ${math.multiply(gridSize, 1.5)}px;
  }
`;

ContextualConfirmTrialContent.displayName = 'ContextualConfirmTrialContent';
export default ContextualConfirmTrialContent;
