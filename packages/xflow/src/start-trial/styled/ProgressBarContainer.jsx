import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const ProgressBarContainer = styled.div`
  display: grid;
  grid-template-columns: ${({ showIcon }) => (showIcon ? '1fr 4px 24px' : '1fr')};
  height: ${math.multiply(gridSize, 3)}px;
`;

ProgressBarContainer.displayName = 'ProgressBarContainer';
export default ProgressBarContainer;
