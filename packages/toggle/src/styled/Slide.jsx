import styled from 'styled-components';
import { colors } from '@atlaskit/theme';
import {
  borderWidth,
  getHeight,
  getWidth,
  transition,
} from './constants';

const colorOptions = {
  bgChecked: colors.G300,
  bgCheckedHover: colors.G500,
  bgCheckedDisabled: '#35B885',

  bgUnchecked: colors.N80,
  bgUncheckedHover: colors.N200,
  bgUncheckedDisabled: '#f3f4f5',
};

const getBgColor = ({ isChecked, isDisabled }) => {
  let color = colorOptions.bgUnchecked;

  if (isChecked) color = colorOptions.bgChecked;
  if (isDisabled && !isChecked) color = colorOptions.bgUncheckedDisabled;
  if (isDisabled && isChecked) color = colorOptions.bgCheckedDisabled;

  return color;
};
const getHoverStyles = ({ isChecked, isDisabled }) => {
  let bgcolor;
  if (!isDisabled) {
    bgcolor = isChecked ? colorOptions.bgCheckedHover : colorOptions.bgUncheckedHover;
  }

  return `
    &:hover {
      background-color: ${bgcolor};
      cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
    }
  `;
};
const getBorderColor = ({ isFocused }) => (isFocused ? colors.B100 : 'transparent');

export default styled.div`
  background-clip: content-box;
  background-color: ${getBgColor};
  border-radius: ${getHeight}px;
  border: ${borderWidth} solid ${getBorderColor};
  display: block;
  height: ${getHeight}px;
  padding: ${borderWidth};
  position: relative;
  transition: ${transition};
  width: ${getWidth}px;

  ${getHoverStyles}
`;
