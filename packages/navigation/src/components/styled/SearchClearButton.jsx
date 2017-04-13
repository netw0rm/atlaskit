import styled from 'styled-components';
import {
    akColorB50,
    akColorB400,
    akColorN20A,
    akGridSizeUnitless,
 } from '@atlaskit/util-shared-styles';
import focusRingMixin from '../../utils/focus-ring-mixin';

const SearchClearButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  background: none;
  border: none;
  border-radius: 50%;
  padding: 0;
  width: ${akGridSizeUnitless * 4}px;
  height: ${akGridSizeUnitless * 4}px;
  outline: none;
  color: inherit;

  ${focusRingMixin()}

  &:hover {
    background: ${akColorN20A};
    // Unsure why this is needed - but it is 🙃
    cursor: pointer;
  }

  &:active {
    background: ${akColorB50};
    color: ${akColorB400};
  }
`;

SearchClearButton.displayName = 'SearchClearButton';
export default SearchClearButton;
