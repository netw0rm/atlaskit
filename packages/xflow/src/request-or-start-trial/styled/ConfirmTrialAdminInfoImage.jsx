import styled from 'styled-components';

import { gridSize, math } from '@atlaskit/theme';

const ConfirmTrialAdminInfoImage = styled.img`
  display: block;
  margin: auto;
  width: ${math.multiply(gridSize, 3)}px;
  height: ${math.multiply(gridSize, 3)}px;
  padding-bottom: ${gridSize()}px;
`;

ConfirmTrialAdminInfoImage.displayName = 'ConfirmTrialAdminInfoImage';
export default ConfirmTrialAdminInfoImage;
