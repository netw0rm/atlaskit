import styled from 'styled-components';

import { colors, gridSize, math } from '@atlaskit/theme';

const ContextualConfirmTrialHeader = styled.div`
  @media all and (max-height: 560px) {
      min-height: ${math.multiply(gridSize, 6)}px;
      margin-bottom: 0px;
      background: none;
  }
  
  background: ${colors.B400};
  border-radius: 4px 4px 0px 0px;
  margin: -${math.multiply(gridSize, 2)}px -${math.multiply(gridSize, 2)}px -${math.multiply(gridSize, 15)}px -${math.multiply(gridSize, 2)}px;
  min-height: ${math.multiply(gridSize, 23)}px;
`;

ContextualConfirmTrialHeader.displayName = 'ContextualConfirmTrialHeader';
export default ContextualConfirmTrialHeader;
