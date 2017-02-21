/* tslint:disable:variable-name */
import styled from 'styled-components';

export const FilmStripViewWrapper = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  line-height: 0;

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style-type: none;
    margin: 0;
    padding-left: 8px;

    &:first-child {
      padding-left: 0;
    }
  }
`;
