import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const ChangeButtonDiv = styled.div`
  grid-column-start: 5;
  margin-top: -${math.multiply(gridSize, 0.625)}px;
`;

ChangeButtonDiv.displayName = 'ChangeButtonDiv';
export default ChangeButtonDiv;
