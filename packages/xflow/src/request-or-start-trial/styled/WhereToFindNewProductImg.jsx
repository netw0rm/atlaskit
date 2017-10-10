import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const WhereToFindNewProductImg = styled.img`
  height: ${math.multiply(gridSize, 16)}px;
  width: ${math.multiply(gridSize, 16)}px;
`;

WhereToFindNewProductImg.displayName = 'WhereToFindNewProductImg';
export default WhereToFindNewProductImg;
