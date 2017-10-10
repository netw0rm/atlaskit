import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const RequestTrialImage = styled.img`
  display: block;
  margin: ${math.multiply(gridSize, 1.5)}px auto auto auto;
  width: ${math.multiply(gridSize, 17.5)}px;
`;

RequestTrialImage.displayName = 'RequestTrialImage';
export default RequestTrialImage;
