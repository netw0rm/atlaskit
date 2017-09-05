import styled from 'styled-components';
import { colors } from '@atlaskit/theme';
import { transition } from './constants';

const colorOptions = {
  default: colors.N0,
  checkedDisabled: '#A1DCC4',
  uncheckedDisabled: '#AFB6C2',
};

const getColor = ({ isChecked, isDisabled }) => {
  let color = colorOptions.default;

  if (isDisabled) color = colorOptions.uncheckedDisabled;
  if (isDisabled && isChecked) color = colorOptions.checkedDisabled;

  return color;
};
const getFlexDirection = ({ isChecked }) => (isChecked ? 'row' : 'row-reverse');

export default styled.div`
  color: ${getColor};
  display: inline-flex;
  flex-direction: ${getFlexDirection};
  height: 100%;
  transition: ${transition};
  width: 100%;
`;
