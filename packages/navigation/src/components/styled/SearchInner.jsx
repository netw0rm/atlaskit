import styled from 'styled-components';
import { gridSize } from '../../shared-variables';

const SearchInner = styled.div`
  padding: ${gridSize * 0.5}px 0 0 ${gridSize * 3}px;
`;

SearchInner.displayName = 'SearchInner';
export default SearchInner;
