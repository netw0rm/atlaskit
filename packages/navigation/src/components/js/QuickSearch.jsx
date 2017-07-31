import React, { PureComponent } from 'react';

import { AkSearch, AkSearchResults } from '../../../src';
import AdvancedSearchOptions from './AdvancedSearchOptions';

const noOp = () => {};

export default class QuickSearch extends PureComponent {
  static propTypes = {
    /* Search pass-through props */
    isLoading: AkSearch.propTypes.isLoading,
    onSearchBlur: AkSearch.propTypes.onBlur,
    onSearchInput: AkSearch.propTypes.onInput,
    onSearchKeyDown: AkSearch.propTypes.onKeyDown,
    placeholder: AkSearch.propTypes.placeholder,
    value: AkSearch.propTypes.value,

    /* SearchResults pass-through props */
    isResultHoverStylesDisabled: AkSearchResults.propTypes.isResultHoverStylesDisabled,
    onResultMouseEnter: AkSearchResults.propTypes.onResultMouseEnter,
    onResultMouseLeave: AkSearchResults.propTypes.onResultMouseLeave,
    results: AkSearchResults.propTypes.results,
    selectedItemId: AkSearchResults.propTypes.selectedItemId,

    /* AdvancedSearchOptions pass-through props */
    advancedSearchOptions: AdvancedSearchOptions.propTypes.options,
    advancedSearchOptionsTitle: AdvancedSearchOptions.propTypes.title,
  }

  static defaultProps = {
    isLoading: false,
    isResultHoverStylesDisabled: false,
    onResultMouseEnter: noOp,
    onResultMouseLeave: noOp,
    onSearchBlur: noOp,
    onSearchKeyDown: noOp,
    placeholder: 'Search',
    results: [],
    value: '',
  }

  render() {
    return (
      <AkSearch
        isLoading={this.props.isLoading}
        onBlur={this.props.onSearchBlur}
        onInput={this.props.onSearchInput}
        onKeyDown={this.props.onSearchKeyDown}
        placeholder={this.props.placeholder}
        value={this.props.value}
      >
        <AkSearchResults
          isResultHoverStylesDisabled={this.props.isResultHoverStylesDisabled}
          isTabbingDisabled
          onResultMouseEnter={this.props.onResultMouseEnter}
          onResultMouseLeave={this.props.onResultMouseLeave}
          results={this.props.results}
          selectedItemId={this.props.selectedItemId}
        />
        {this.props.advancedSearchOptions && (
          <AdvancedSearchOptions
            isResultHoverStylesDisabled={this.props.isResultHoverStylesDisabled}
            onResultMouseEnter={this.props.onResultMouseEnter}
            onResultMouseLeave={this.props.onResultMouseLeave}
            options={this.props.advancedSearchOptions}
            selectedItemId={this.props.selectedItemId}
            title={this.props.advancedSearchOptionsTitle}
          />
        )}
      </AkSearch>
    );
  }
}
