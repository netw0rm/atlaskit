import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { AkSearch, AkSearchResults } from '../../../src';

const noOp = () => {};

export default class QuickSearch extends PureComponent {
  static propTypes = {
    /* Search pass-through props */
    isLoading: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onSearchClear: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string,

    /* SearchResults pass-through props */
    results: AkSearchResults.propTypes.results,
  }

  defaultProps = {
    isLoading: false,
    onSearchClear: noOp,
    placeholder: 'Search',
    results: [],
    value: '',
  }

  render() {
    return (
      <AkSearch
        isLoading={this.props.isLoading}
        onChange={this.props.onChange}
        onSearchClear={this.props.onSearchClear}
        placeholder={this.props.placeholder}
        value={this.props.value}
      >
        <AkSearchResults results={this.props.results} />
      </AkSearch>
    );
  }
}
