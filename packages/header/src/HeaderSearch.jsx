import React, { PureComponent } from 'react';
import styled from 'styled-components';
import SearchIcon from '@atlaskit/icon/glyph/search';

const SearchForm = styled.form`
  display: flex;
  align-items: baseline;
  height: 36px;
`;

const SearchInput = styled.input`
  transition: width .5s ease-out;
  border: none;
  background: transparent;
  box-shadow: none;
  color: white;
  margin-left: -24px;
  padding-left: 26px;
  cursor: pointer;
  width: 26px;
  // The transparent border is necessary to prevent minor jank in safari
  border-top: 2px solid transparent;

  &:focus, &:valid {
    border-bottom: 2px solid white;
    cursor: auto;
    width: 180px;
    outline: none;
    box-shadow: none;
    margin-left: 0;
    padding-left: 2px;
    // Necessary to prevent minor jank in safari
    border-top: none;
  }
`;

const SearchIconPositioningWrapper = styled.div`
  position: relative;
  top: 6px;
  pointer-events: none;
`;

export default class HeaderSearch extends PureComponent {
  render() {
    return (
      <SearchForm action="/search" method="get">
        <SearchIconPositioningWrapper>
          <SearchIcon label="search the docs" />
        </SearchIconPositioningWrapper>
        <SearchInput required name="q" />
      </SearchForm>
    );
  }
}
