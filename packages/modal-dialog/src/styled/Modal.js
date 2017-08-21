import { colors, gridSize, math } from '@atlaskit/theme';
import styled from 'styled-components';
import { WIDTH_ENUM } from '../shared-variables';

const dialogWidth = ({ width }) => `${WIDTH_ENUM.widths[width]}px`;
const dialogHeight = ({ height }) => {
  if (typeof height === 'number') {
    return `${height}px`;
  } else if (typeof height === 'string') {
    return height;
  }
  return 'auto';
};
const viewportMargin = math.multiply(gridSize, 15);

export const DialogPositioner = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Dialog = styled.div`
  background-color: ${colors.background};
  border-radius: ${math.divide(gridSize, 2)}px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 1px rgba(0, 0, 0, 0.1), 0 0 20px -6px rgba(0, 0, 0, 0.3);
  height: ${dialogHeight};
  max-height: calc(100% - 1px);
  max-width: calc(100% - ${viewportMargin}px);
  outline: 0;
  position: relative;
  width: ${dialogWidth};
`;

export const Overlay = styled(DialogPositioner)`
  background-color: rgba(9, 30, 66, 0.54);
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;
