import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const GrantAccessDefaultAccessDiv = styled.div`
  height: ${math.multiply(gridSize, 5)}px;
  display: grid;
`;

GrantAccessDefaultAccessDiv.displayName = 'GrantAccessDefaultAccessDiv';
export default GrantAccessDefaultAccessDiv;
