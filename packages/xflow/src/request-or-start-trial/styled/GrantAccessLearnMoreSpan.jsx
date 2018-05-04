import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const GrantAccessLearnMoreSpan = styled.span`
  display: inline-block;
  margin-top: -${math.multiply(gridSize, 0.25)}px;
  vertical-align: middle;
`;

GrantAccessLearnMoreSpan.displayName = 'GrantAccessLearnMoreSpan';
export default GrantAccessLearnMoreSpan;
