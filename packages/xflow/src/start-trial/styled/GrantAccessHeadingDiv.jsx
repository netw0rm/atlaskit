import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const GrantAccessHeadingDiv = styled.div`
  padding-left: ${math.multiply(gridSize, 1.75)}px;
`;

GrantAccessHeadingDiv.displayName = 'GrantAccessHeadingDiv';
export default GrantAccessHeadingDiv;
