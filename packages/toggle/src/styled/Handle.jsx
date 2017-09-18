import styled, { css } from 'styled-components';
import { colors, themed } from '@atlaskit/theme';
import { getHeight, paddingUnitless, transition } from './constants';

const backgroundColor = themed({ light: colors.N0, dark: colors.DN0 });

const getTransform = ({ isChecked, size }) => (isChecked
  ? `translateX(${getHeight({ size })}px)`
  : 'initial'
);

export default styled.span`
  ${({ isDisabled }) => (isDisabled ? css`opacity: 0.5` : '')}
  background-color: ${backgroundColor};
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
