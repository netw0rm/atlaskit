import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const GrantAccessDefaultAccessDiv = styled.div`
  display: grid;
  height: ${math.multiply(gridSize, 5)}px;
`;

GrantAccessDefaultAccessDiv.displayName = 'GrantAccessDefaultAccessDiv';
export default GrantAccessDefaultAccessDiv;
