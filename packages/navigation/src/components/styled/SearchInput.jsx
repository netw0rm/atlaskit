import styled from 'styled-components';
import { getProvided } from '../../theme/util';
import { entireSizeStyle } from './SearchLabel';

const SearchInput = styled.input`
  color: ${({ theme }) => getProvided(theme).text};
  border: 0;
  border-radius: 0;
  outline: 0;
  background-color: transparent;
  font: inherit;
  ${entireSizeStyle};
`;

SearchInput.displayName = 'SearchInput';
export default SearchInput;
