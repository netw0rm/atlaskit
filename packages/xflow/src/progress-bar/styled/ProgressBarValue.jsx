import styled from 'styled-components';

import { colors } from '@atlaskit/theme';

// NOTE: border-radius should be half height of ProgressBarBackground

const ProgressBarValue = styled.div`
  background: ${colors.blue};
  height: 6px;
  width: 50%;
  border-radius: 3px;
  transition: width 5s linear;
`;

ProgressBarValue.displayName = 'ProgressBarValue';
export default ProgressBarValue;
