import styled from 'styled-components';
import { globalItemSizes, gridSize } from '../../shared-variables';
import { focusOutline } from '../../utils/mixins';
import { getProvided } from '../../theme/util';
import type { Provided } from '../../theme/types';

const getOutline = (props) => {
  const provided: Provided = getProvided(props.theme);

  return focusOutline(provided.item.focus.outline);
};

const GlobalItemInner = styled.span`
  color: ${({ theme }) => getProvided(theme).text};
  background-color: ${({ theme }) => getProvided(theme).item.default.background};
  /* fill controls the secondary color used by some icons like the help icon */
  fill: ${({ theme }) => getProvided(theme).background.primary};
  align-items: center;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  line-height: 1;
  width: ${({ size }) => globalItemSizes[size]}px;
  height: ${({ size }) => globalItemSizes[size]}px;
  justify-content: center;
  margin-top: ${({ size }) => (size === 'small' ? gridSize : 0)}px;
  padding: 0;
  outline: none;
  text-align: center;

  &:hover {
    background-color: ${({ theme }) => getProvided(theme).item.hover.background};
  }

  &:focus {
    background-color: ${({ theme }) => getProvided(theme).item.focus.background};
    ${getOutline}
  }

  &:active {
    background-color: ${({ theme }) => getProvided(theme).item.active.background};
  }
`;

GlobalItemInner.displayName = 'GlobalItemInner';
export default GlobalItemInner;
