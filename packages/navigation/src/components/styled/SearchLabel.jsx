import styled from 'styled-components';
import { getProvided } from '../../theme/util';
import { search } from '../../shared-variables';

const heightStyle = `
  height: ${search.input.height}px;
  line-height: ${search.input.height}px;
`;

export const entireSizeStyle = `
  ${heightStyle}
  font-size: inherit;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 0 0 0 1px;
  width: 100%;
`;

const SearchLabel = styled.label`
  ${heightStyle}
  background-color: ${({ theme }) => getProvided(theme).background.tertiary};
  flex-grow: 1;
  font-size: 1.4em;
  position: relative;
  letter-spacing: normal;
`;

SearchLabel.displayName = 'SearchLabel';
export default SearchLabel;
