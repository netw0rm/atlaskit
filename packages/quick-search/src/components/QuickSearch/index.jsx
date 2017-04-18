import React, { Component, PropTypes } from 'react';
import { CrossIcon } from '@atlaskit/icon';
import { AkSearch } from '@atlaskit/navigation';
import _debounce from 'lodash.debounce';

import DelayedSpinner from '../DelayedSpinner';
import ResourcedResultsList from '../ResourcedResultsList';
import { AbstractResource, SearchSubscriber } from '../../api/SearchResource';
import uniqueId from '../../util/id';

export default class QuickSearch extends Component {
  static propTypes = {
    searchResource: PropTypes.instanceOf(AbstractResource),
    callbacks: PropTypes.shape({
      HipChatConversation: PropTypes.func,
    }),
    onSearchTerminate: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      query: '',
    };
    this.searchSubscriber = new SearchSubscriber({
      subscriberKey: uniqueId('ak-quick-search-bar'),
      changeHandler: this.subscriptionChangeCallback,
      errorHandler: this.subscriptionErrorCallback,
    });
    this.queryResourceDebounced = _debounce(this.queryResource, 250);
  }

  componentDidMount() {
    this.searchSubscriber.subscribe(this.props.searchResource);
    this.props.searchResource.recentItems();
  }

  componentWillUnmount() {
    this.searchSubscriber.unsubscribe(this.props.searchResource);
  }

  subscriptionChangeCallback = () => this.setState({ isLoading: false });

  subscriptionErrorCallback = (err) => {
    this.subscriptionChangeCallback();
    // eslint-disable-next-line no-console
    console.log('ak-quick-search-bar.queryErrorCallback', err);
  }

  queryResource = (query) => {
    this.props.searchResource.query(query);
    this.setState({
      isLoading: true,
    });
  }

  handleQueryChange = (ev) => {
    const query = ev.target.value;
    if (query === '') {
      this.props.searchResource.cancelQuery();
      this.props.searchResource.recentItems();
    } else {
      this.queryResourceDebounced(query);
    }
    this.setState({
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
        <ResourcedResultsList
          searchResource={this.props.searchResource}
          callbacks={this.props.callbacks}
          onSearchTerminate={this.props.onSearchTerminate}
        />
      </AkSearch>
    );
  }
}
