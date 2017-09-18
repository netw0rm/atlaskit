import styled, { css } from 'styled-components';
import { colors, themed } from '@atlaskit/theme';
import { transition } from './constants';

const color = themed({ light: colors.N0, dark: colors.DN0 });

const getFlexDirection = ({ isChecked }) => (isChecked ? 'row' : 'row-reverse');

export default styled.div`
  color: ${color};
  ${({ isDisabled }) => (isDisabled ? css`opacity: 0.5` : '')}
  display: inline-flex;
  flex-direction: ${getFlexDirection};
  height: 100%;
  transition: ${transition};
  width: 100%;
`;
