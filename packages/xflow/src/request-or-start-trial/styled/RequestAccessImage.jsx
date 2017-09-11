import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const RequestAccessImage = styled.img`
  display: block;
  margin: ${math.multiply(gridSize, 1.5)}px auto auto auto;
  width: ${math.multiply(gridSize, 17.5)}px;
`;

RequestAccessImage.displayName = 'RequestAccessImage';
export default RequestAccessImage;
