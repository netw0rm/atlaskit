import styled from 'styled-components';
import { colors } from '@atlaskit/theme';
import { getHeight, paddingUnitless, transition } from './constants';

const colorOptions = {
  default: colors.N0,
  checkedDisabled: '#A1DCC4',
  uncheckedDisabled: '#AFB6C2',
};

const getBackgroundColor = ({ isChecked, isDisabled }) => {
  let color = colorOptions.default;

  if (isDisabled) color = colorOptions.uncheckedDisabled;
  if (isDisabled && isChecked) color = colorOptions.checkedDisabled;

  return color;
};
const getTransform = ({ isChecked, size }) => (isChecked
  ? `translateX(${getHeight({ size })}px)`
  : 'initial'
);

export default styled.span`
  background-color: ${getBackgroundColor};
  border-radius: 50%;
  bottom: ${2 * paddingUnitless}px;
  content: "";
  height: ${props => getHeight(props) - (paddingUnitless * 2)}px;
  left: ${2 * paddingUnitless}px;
  position: absolute;
  transform: ${getTransform};
  transition: ${transition};
  width: ${props => getHeight(props) - (paddingUnitless * 2)}px;
`;
