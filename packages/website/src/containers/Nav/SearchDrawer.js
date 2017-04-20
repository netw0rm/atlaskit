import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { akGridSize, akGridSizeUnitless } from '@atlaskit/util-shared-styles';
import SearchResults from './SearchResults';
// import { BASE_URL } from '../config';

export default class SearchDrawer extends PureComponent {
  static propTypes = {
    onResultClicked: PropTypes.func.isRequired,
    onSearchInputRef: PropTypes.func,
  }

  state = {
    searchString: '',
    components: [],
  }

  componentDidMount() {
    // fetch(`${BASE_URL}/spa_data/components_page.json`)
    //   .then(result => result.json())
    //   .then((json) => {
    //     this.setState({
    //       components: json,
    //     });
    //   });
  }

  filterChange = () => {
    this.setState({ searchString: this.searchInput.value });
  }

  searchResults = () => {
    const { components, searchString } = this.state;

    if (!searchString.length) return null;

    const matchingComponents = components.filter(
      c => (
        c.name.indexOf(searchString) >= 0 ||
        (c.description && c.description.indexOf(searchString) >= 0)
      )
    ).slice(0, 10);

    return (
      <SearchResults
        matchingComponents={matchingComponents}
        onResultClicked={this.props.onResultClicked}
      />
    );
  }

  render() {
    const { onSearchInputRef } = this.props;
    return (
      <div style={{ paddingTop: akGridSize }}>
        <Input
          onKeyUp={this.filterChange}
          placeholder="Component search..."
          innerRef={(el) => {
            this.searchInput = el;
            if (onSearchInputRef) onSearchInputRef(el);
          }}
          type="text"
        />
        {this.searchResults()}
      </div>
    );
  }
}
const Input = styled.input`
  border: none;
  display: block;
  font-size: ${akGridSizeUnitless * 3}px;
  font-weight: 200;
  margin-top: ${0 - (akGridSizeUnitless / 2)}px;
  outline: none;
  padding: 0 0 0 ${akGridSize};
`;
