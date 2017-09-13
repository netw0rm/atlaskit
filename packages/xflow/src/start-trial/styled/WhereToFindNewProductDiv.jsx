import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const WhereToFindNewProductDiv = styled.div`
  width: ${math.multiply(gridSize, 25)}px;
  align-self: center;
  margin-left: ${gridSize}px;
`;

WhereToFindNewProductDiv.displayName = 'WhereToFindNewProductDiv';
export default WhereToFindNewProductDiv;
