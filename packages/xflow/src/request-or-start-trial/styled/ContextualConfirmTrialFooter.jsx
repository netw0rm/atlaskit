import styled from 'styled-components';

import { colors, gridSize, math } from '@atlaskit/theme';

const ContextualConfirmTrialFooter = styled.div`
  background: ${colors.N10};
  border-radius: 0px 0px 4px 4px;
  border-top: 1px solid ${colors.N30};
  margin: -${math.multiply(gridSize, 2)}px;
  min-height: ${math.multiply(gridSize, 12)}px;
`;

ContextualConfirmTrialFooter.displayName = 'ContextualConfirmTrialFooter';
export default ContextualConfirmTrialFooter;
