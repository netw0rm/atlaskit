import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const RequestTrialHeading = styled.h3`
  margin-top: 0px;
  max-width: ${math.multiply(gridSize, 32.5)}px;
`;

RequestTrialHeading.displayName = 'RequestTrialHeading';
export default RequestTrialHeading;
