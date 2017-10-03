import styled from 'styled-components';
import { borderRadius, colors, gridSize, math, themed } from '@atlaskit/theme';

const backgroundColor = themed({
  light: colors.N800,
  dark: colors.DN0,
});
const textColor = themed({
  light: colors.N0,
  dark: colors.DN600,
});

// Tooltip Wrapper
export default styled.div`
  background-color: ${backgroundColor};
  border-radius: ${borderRadius}px;
  box-sizing: border-box;
  color: ${textColor};
  font-size: 12px;
  line-height: 1.3;
  margin: ${gridSize}px;
  max-width: ${math.multiply(gridSize, 52)}px;
  padding: ${math.divide(gridSize, 4)}px ${gridSize}px;
  pointer-events: none;
  white-space: nowrap;
`;

// The inline-block here is needed to keep the tooltip appearing in the correct position
// when nested inside a wider parent (see position: relative example).
export const TooltipTrigger = styled.div`
  display: inline-block;
`;
