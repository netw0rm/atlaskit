import React, { Component, PropTypes } from 'react';
import { AkSearch } from '@atlaskit/navigation';
import AkSpinner from '@atlaskit/spinner';
import { CrossIcon } from '@atlaskit/icon';

import ResourcedResultsList from '../ResourcedResultsList';
import RecentResultsList from '../RecentResultsList';
import { ISearchProvider, SearchSubscriber } from '../../api/SearchProvider';
import uniqueId from '../../util/id';

export default class QuickSearch extends Component {
  static propTypes = {
    searchProvider: PropTypes.instanceOf(ISearchProvider),
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      query: '',
    };
    this.searchSubscriber = new SearchSubscriber({
      subscriberKey: uniqueId('ak-quick-search-bar'),
      changeHandler: this.queryComplete,
      errorHandler: this.filterError,
    });
    this.recentResults = <RecentResultsList searchProvider={this.props.searchProvider} />;
    this.searchResults = <ResourcedResultsList searchProvider={this.props.searchProvider} />;
  }

  componentDidMount() {
    this.searchSubscriber.subscribe(this.props.searchProvider);
  }

  componentWillUnmount() {
    this.searchSubscriber.unsubscribe(this.props.searchProvider);
  }

  queryComplete = () => this.setState({ isLoading: false });

  filterError = (err) => {
    this.queryComplete();
    // eslint-disable-next-line no-console
    console.log('ak-quick-search-bar.filterError', err);
  }

  handleQueryChange = (ev) => {
    const query = ev.target.value;
    this.props.searchProvider.query(query);
    this.setState({
      isLoading: true && query,
      query,
    });
  }

  render() {
    const clearIcon = this.state.isLoading ? <AkSpinner /> : <CrossIcon label="Clear search" />;
    return (
      <AkSearch onChange={this.handleQueryChange} clearIcon={clearIcon}>
        {this.state.query ? this.searchResults : this.recentResults}
      </AkSearch>
    );
  }
}
