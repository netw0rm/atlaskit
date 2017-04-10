import styled from 'styled-components';
import {
    akGridSizeUnitless,
 } from '@atlaskit/util-shared-styles';

const SearchInner = styled.div`
  padding: ${akGridSizeUnitless * 0.5} 0 0 ${akGridSizeUnitless * 3};
`;

SearchInner.displayName = 'SearchInner';
export default SearchInner;
