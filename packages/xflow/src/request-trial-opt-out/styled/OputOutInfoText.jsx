import styled from 'styled-components';

import { colors, gridSize, math } from '@atlaskit/theme';

const OptOutInfoText = styled.p`
  color: ${colors.N200};
  font-size: 12px;
  margin-bottom: ${math.multiply(gridSize, 1.5)}px;
  margin-left: ${math.multiply(gridSize, 3.75)}px;
`;

OptOutInfoText.displayName = 'OptOutInfoText';
export default OptOutInfoText;
