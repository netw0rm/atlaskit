import styled from 'styled-components';

import { colors, gridSize, math } from '@atlaskit/theme';

const ConfirmTrialAdminInfo = styled.div`
  width: ${math.multiply(gridSize, 21)}px;
  text-align: center;
  line-height: 1.33;
  font-size:12px;
  color: ${colors.N200};
  float: left;
  position: relative;
  margin: ${math.multiply(gridSize, 2)}px;
`;

ConfirmTrialAdminInfo.displayName = 'ConfirmTrialAdminInfo';
export default ConfirmTrialAdminInfo;
