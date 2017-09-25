import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const WhereToFindConfluenceDiv = styled.div`
  width: ${math.multiply(gridSize, 25)}px;
  align-self: center;
  margin-left: ${gridSize}px;
`;

WhereToFindConfluenceDiv.displayName = 'WhereToFindConfluenceDiv';
export default WhereToFindConfluenceDiv;
