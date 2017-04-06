import styled from 'styled-components';
import {
    akGridSizeUnitless,
 } from '@atlaskit/util-shared-styles';

const SearchClearButtonOuter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: ${akGridSizeUnitless * 2}px;
`;

SearchClearButtonOuter.displayName = SearchClearButtonOuter;
export default SearchClearButtonOuter;
