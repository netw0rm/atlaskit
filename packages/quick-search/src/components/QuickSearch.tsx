import * as React from 'react';

import * as debounce from 'lodash.debounce';
import { AkSearch } from '@atlaskit/navigation';
import { SpinningClearIcon } from './SpinningClearIcon';
import { ResultList } from './ResultList';
import { search } from '../api/client';
import { serviceUrl } from '../api/service-url';
import { Result } from '../types';

interface Props {
  /**
   * A callback to execute when a search result is clicked.
   */
  onResultClick: (result: Result) => void;

  /**
   * User ID of the current user.
   */
  userId: string;

  /**
   * Cloud ID for the current user.
   */
  cloudId: string;
}

interface State {
  /**
   * If true, indicates that a search is in progress.
   */
  isLoading: boolean;

  /**
   * If present, indicates the current search.
   *
   * This is used to ignore stale search results. Stale searches are not cancelled (limitation of
   * fetch API), but their results are ignored.
   */
  fetchPromise?: Promise<any>;

  /**
   * The set of search results to display.
   */
  results: Result[];

  /**
   * The current search query;
   */
  query: string;
}

export class QuickSearch extends React.PureComponent<Props, {}> {
  state: State = {
    isLoading: false,
    results: [],
    query: '',
  };

  render() {
    return (
      <AkSearch
        onChange={this.handleChange}
        clearIcon={<SpinningClearIcon shouldSpin={this.state.isLoading} />}
        onSearchClear={this.clearSearch}
        value={this.state.query}
      >
        <ResultList
          results={this.state.results}
          onClick={this.handleResultClick}
        />
      </AkSearch>
    );
  }

  private clearSearch(): void {
    this.setState({
      isLoading: false,
      fetchPromise: undefined,
      query: '',
      results: [],
    });
  }

  private performRecentSearch(): void {
    /** TODO:revise when more info/design is available */
    this.performSearch('a');
  }

  private performSearch = (query: string): Promise<any> => {
    const fetchPromise = search(serviceUrl(), query, this.props.userId, this.props.cloudId)
      .then((results) => {
        if (fetchPromise === this.state.fetchPromise) {
          this.setState({
            fetchPromise: undefined,
            isLoading: false,
            results,
          });
        }
      });
    return fetchPromise;
  }

  private handleChange = debounce((ev) => {
    const query = ev.target.value;
    if (query === '') {
      this.clearSearch();
      this.performRecentSearch();
    } else {
      this.performSearch(query);
    }

    this.setState({ query });
  });

  private handleResultClick = (result: Result) => {
    this.props.onResultClick(result);
  }
}
