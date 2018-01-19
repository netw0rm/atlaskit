import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const CustomLabel = styled.div`
  display: inline-block;
  vertical-align: top;
  margin-bottom: ${math.multiply(gridSize, 1.5)}px;
`;

CustomLabel.displayName = 'CustomLabel';
export default CustomLabel;
