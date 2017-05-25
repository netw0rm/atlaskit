import styled from 'styled-components';
import { gridSize } from '../../shared-variables';
import { getProvided } from '../../theme/util';

const sizes = {
  small: 4 * gridSize,
  medium: 5 * gridSize,
  large: 6 * gridSize,
};

const GlobalItemInner = styled.div`
  color: ${({ theme }) => getProvided(theme).text};
  background-color: ${({ theme }) => getProvided(theme).item.default.background};
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  width: ${({ size }) => sizes[size]}px;
  height: ${({ size }) => sizes[size]}px;
  justify-content: center;
  margin-top: ${({ size }) => (size === 'small' ? gridSize : 0)}px;

  &:hover {
    background-color: ${({ theme }) => getProvided(theme).item.hover.background};
  }

  &:focus {
    background-color: ${({ theme }) => getProvided(theme).item.focus.background};
  }

  &:active {
    background-color: ${({ theme }) => getProvided(theme).item.active.background};
  }
`;

GlobalItemInner.displayName = 'GlobalItemInner';
export default GlobalItemInner;
