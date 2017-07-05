import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { AkSearch, AkSearchResults } from '../../../src';

const noOp = () => {};

export default class QuickSearch extends PureComponent {
  static propTypes = {
    /* Search pass-through props */
    isLoading: PropTypes.bool,
    onSearchChange: PropTypes.func.isRequired,
    onSearchClear: PropTypes.func,
    onSearchKeyDown: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string,

    /* SearchResults pass-through props */
    onResultClick: PropTypes.func.isRequired,
    results: AkSearchResults.propTypes.results,
    selectedItemId: PropTypes.string,
  }

  static defaultProps = {
    isLoading: false,
    onSearchClear: noOp,
    onSearchKeyDown: noOp,
    placeholder: 'Search',
    results: [],
    value: '',
  }

  render() {
    return (
      <AkSearch
        isLoading={this.props.isLoading}
        onChange={this.props.onSearchChange}
        onKeyDown={this.props.onSearchKeyDown}
        onSearchClear={this.props.onSearchClear}
        placeholder={this.props.placeholder}
        value={this.props.value}
      >
        <AkSearchResults
          onClick={this.props.onResultClick}
          results={this.props.results}
          selectedItemId={this.props.selectedItemId}
        />
      </AkSearch>
    );
  }
}
