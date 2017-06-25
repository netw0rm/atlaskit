import styled from 'styled-components';
import { search } from '../../shared-variables';
import { entireSizeStyle } from './SearchLabel';

const SearchPlaceholder = styled.div`
  ${entireSizeStyle}
  color: ${search.placeholder.color};
`;

SearchPlaceholder.displayName = 'SearchPlaceholder';
export default SearchPlaceholder;
