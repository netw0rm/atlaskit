import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const ProgressBarContainer = styled.div`
  display: grid;
  height: ${math.multiply(gridSize, 3)}px;
  grid-template-columns: ${({ showIcon }) => (showIcon ? '1fr 32px' : '1fr')};
`;

ProgressBarContainer.displayName = 'ProgressBarContainer';
export default ProgressBarContainer;
