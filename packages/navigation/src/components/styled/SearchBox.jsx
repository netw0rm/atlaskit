import styled from 'styled-components';
import { getProvided } from '../../theme/util';
import { gridSize } from '../../shared-variables';

const SearchBox = styled.div`
  background-color: ${({ theme }) => getProvided(theme).background.tertiary};
  color: ${({ theme }) => getProvided(theme).text};
  display: flex;
  height: ${4 * gridSize}px;
  margin-right: ${3 * gridSize}px;
`;

SearchBox.displayName = 'SearchBox';
export default SearchBox;
