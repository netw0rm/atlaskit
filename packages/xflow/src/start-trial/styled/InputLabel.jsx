import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const InputLabel = styled.label`
  margin-left: ${math.divide(gridSize, 2)}px;
`;

InputLabel.displayName = 'InputLabel';
export default InputLabel;
