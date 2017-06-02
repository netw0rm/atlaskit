import styled from 'styled-components';
import { gridSize } from '../../shared-variables';

const SearchClearButtonOuter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: ${gridSize * 2}px;
`;

SearchClearButtonOuter.displayName = 'SearchClearButtonOuter';
export default SearchClearButtonOuter;
