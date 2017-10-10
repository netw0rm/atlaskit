import styled from 'styled-components';

import { colors, themed } from '@atlaskit/theme';

const progressBarColor = themed({ light: colors.N800, dark: colors.N40 });

// NOTE: border-radius should be half height of ProgressBarBackground

const ProgressBarValue = styled.div`
  background: ${progressBarColor};
  height: 6px;
  width: 50%;
  border-radius: 3px 0px 0px 3px;
  transition: width 5s linear;
`;

ProgressBarValue.displayName = 'ProgressBarValue';
export default ProgressBarValue;
