import styled from 'styled-components';

import { colors, gridSize, themed, math } from '@atlaskit/theme';

const backgroundColor = themed({ light: colors.N30, dark: colors.N700 });

// NOTE: height and border radius are intentionally not based on the grid
// border-radius should always be half the height to round the corners

const ProgressBarBackground = styled.div`
  align-self: center;
  margin-top: ${math.divide(gridSize, 2)}px;
  background: ${backgroundColor};
  height: 6px;
  width: 100%;
  border-radius: 3px;
  overflow: hidden;
`;

ProgressBarBackground.displayName = 'ProgressBarBackground';
export default ProgressBarBackground;
