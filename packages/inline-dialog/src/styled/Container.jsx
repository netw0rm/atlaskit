import styled from 'styled-components';

import {
  borderRadius,
  colors,
  gridSize,
  math,
} from '@atlaskit/theme';

import {
  backgroundColor,
  borderColor,
  shadowColor,
} from '../theme';

const getBoxShadow = props => {
  const border = `0 0 1px ${borderColor(props)}`;
  const shadow = `0 4px 8px -2px ${shadowColor(props)}`;

  return [border, shadow].join(',');
};

export default styled.div`
  background: ${backgroundColor};
  border-radius: ${borderRadius}px;
  box-shadow: ${getBoxShadow};
  box-sizing: border-box;
  color: ${colors.text};
  max-height: ${math.multiply(gridSize, 60)}px;
  max-width: ${math.multiply(gridSize, 62)}px;
  padding: ${math.multiply(gridSize, 3)}px;
  z-index: 200;
`;
