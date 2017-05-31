import styled from 'styled-components';
import { getProvided } from '../../theme/util';

const SearchBox = styled.div`
  background-color: ${({ theme }) => getProvided(theme).background.tertiary};
  color: ${({ theme }) => getProvided(theme).text};
  display: flex;
`;

SearchBox.displayName = 'SearchBox';
export default SearchBox;
