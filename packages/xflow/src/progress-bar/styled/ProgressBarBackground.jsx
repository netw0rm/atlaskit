import styled from 'styled-components';

import { colors, gridSize, themed, math } from '@atlaskit/theme';

const backgroundColor = themed({ light: colors.N700, dark: colors.DN60 });

// NOTE: height and border radius are intentionally not based on the grid
// border-radius should always be half the height to round the corners

const ProgressBarBackground = styled.div`
  align-self: center;
  margin-top: ${math.divide(gridSize, 2)}px;
  background: ${backgroundColor};
  height: 6px;
  width: 100%;
  border-radius: 3px;
`;

ProgressBarBackground.displayName = 'ProgressBarBackground';
export default ProgressBarBackground;
