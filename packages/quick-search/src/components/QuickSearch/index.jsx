import React, { Component, PropTypes } from 'react';
import { CrossIcon } from '@atlaskit/icon';
import { AkSearch } from '@atlaskit/navigation';

import DelayedSpinner from '../DelayedSpinner';
import ResourcedResultsList from '../ResourcedResultsList';
import SearchResource, { SearchSubscriber } from '../../api/SearchResource';
import uniqueId from '../../util/id';

export default class QuickSearch extends Component {
  static propTypes = {
    searchResource: PropTypes.instanceOf(SearchResource),
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
  }

  componentDidMount() {
    this.searchSubscriber.subscribe(this.props.searchResource);
    this.props.searchResource.recentItems();
  }

  componentWillUnmount() {
    this.searchSubscriber.unsubscribe(this.props.searchResource);
  }

  queryComplete = () => this.setState({ isLoading: false });

  filterError = (err) => {
    this.queryComplete();
    // eslint-disable-next-line no-console
    console.log('ak-quick-search-bar.filterError', err);
  }

  handleQueryChange = (ev) => {
    const query = ev.target.value;
    if (query === '') {
      this.props.searchResource.recentItems();
    } else {
      this.props.searchResource.query(query);
    }
    this.setState({
      isLoading: true,
      query,
    });
  }

  clearSearch = () => {
    this.props.searchResource.cancelQuery();
    this.setState({
      isLoading: false,
      query: '',
    });
    this.props.searchResource.recentItems();
  }

  render() {
    const clearIcon = this.state.isLoading
      ? <DelayedSpinner />
      : <CrossIcon label="Clear search" />;
    return (
      <AkSearch
        onChange={this.handleQueryChange}
        clearIcon={clearIcon}
        onSearchClear={this.clearSearch}
        value={this.state.query}
      >
        <ResourcedResultsList searchResource={this.props.searchResource} />
      </AkSearch>
    );
  }
}
