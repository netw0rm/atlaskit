import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const SpinnerDiv = styled.div`
  display: inline-block;
  margin-right: ${math.multiply(gridSize, 1.25)}px;
  position: relative;
  top: ${props => math.multiply(gridSize, props.topMultiplier || 0.75)}px;
`;

SpinnerDiv.displayName = 'SpinnerDiv';
export default SpinnerDiv;
