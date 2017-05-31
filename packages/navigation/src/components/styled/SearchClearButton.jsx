// @flow
import styled from 'styled-components';
import { gridSize } from '../../shared-variables';
import { getProvided } from '../../theme/util';

const SearchClearButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  background: none;
  border: none;
  border-radius: 50%;
  padding: 0;
  width: ${gridSize * 4}px;
  height: ${gridSize * 4}px;
  outline: none;
  color: inherit;

  &:hover {
    background-color: ${({ theme }) => getProvided(theme).item.hover.background};
  }

  &:active {
    background-color: ${({ theme }) => getProvided(theme).item.active.background};
  }
`;

SearchClearButton.displayName = 'SearchClearButton';
export default SearchClearButton;
