import styled, { css } from 'styled-components';
import { colors, themed } from '@atlaskit/theme';
import {
  borderWidth,
  getHeight,
  getWidth,
  transition,
} from './constants';

const colorOptions = {
  bgChecked: themed({ light: colors.G300, dark: colors.G300 }),
  bgCheckedHover: themed({ light: colors.G500, dark: colors.G200 }), // hover go lighter
  bgCheckedDisabled: themed({ light: colors.G400, dark: colors.G400 }),

  bgUnchecked: themed({ light: colors.N80, dark: colors.DN80 }),
  bgUncheckedHover: themed({ light: colors.N200, dark: colors.DN200 }),
  bgUncheckedDisabled: themed({ light: colors.N300, dark: colors.DN300 }),
};

const getBgColor = ({ isChecked, isDisabled, ...rest }) => {
  let color = colorOptions.bgUnchecked;
  if (isChecked) color = colorOptions.bgChecked;
  if (isDisabled && !isChecked) color = colorOptions.bgUncheckedDisabled;
  if (isDisabled && isChecked) color = colorOptions.bgCheckedDisabled;

  return color(rest);
};
const getHoverStyles = ({ isChecked, isDisabled, ...rest }) => {
  let bgcolor;
  if (!isDisabled) {
    bgcolor = isChecked ? colorOptions.bgCheckedHover : colorOptions.bgUncheckedHover;
  }

  return css`
    &:hover {
      ${bgcolor ? css`background-color: ${bgcolor(rest)}` : ''};
      cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
    }
  `;
};
const getBorderColor = ({ isFocused }) => (isFocused ? colors.B100 : 'transparent');
// icon color should be 50% white when disabled
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
