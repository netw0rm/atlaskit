import styled from 'styled-components';
import { gridSize } from '../../shared-variables';

const SearchFieldBaseInner = styled.div`
  padding-right: ${2 * gridSize}px;
  width: 100%;
  display: flex;
`;

SearchFieldBaseInner.displayName = 'SearchFieldBaseInner';
export default SearchFieldBaseInner;
