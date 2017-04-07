import React, { Component, PropTypes } from 'react';

import ResultsList from '../ResultsList';
import { ISearchProvider } from '../../api/SearchProvider';
import JsonToResultParser from '../../api/JsonToResultParser';
import uniqueId from '../../util/id';

export default class ResourcedResultsList extends Component {
  static propTypes = {
    searchProvider: PropTypes.instanceOf(ISearchProvider).isRequired,
    jsonToResultParser: PropTypes.instanceOf(JsonToResultParser).isRequired,
  }

  static defaultProps = {
    jsonToResultParser: new JsonToResultParser(),
  }

  constructor() {
    super();
    this.state = {
      items: [],
    };
    this.subscriberKey = uniqueId('ak-quick-search');
  }

  componentDidMount() {
    this.subscribeSearchProvider(this.props.searchProvider);
  }

  componentWillUnmount() {
    this.unsubscribeSearchProvider(this.props.searchProvider);
  }

  onSearchResultUpdate(items) {
    this.setState({
      items,
    });
  }

  subscribeSearchProvider = (searchProvider) => {
    if (searchProvider) {
      searchProvider.subscribe(
        this.subscriberKey,
        this.filterChange,
        this.filterError
      );
    }
  }

  unsubscribeSearchProvider(searchProvider) {
    if (searchProvider) {
      searchProvider.unsubscribe(this.subscriberKey);
    }
  }

  filterChange = items => this.setState({ items });

  filterError = (err) => {
    this.setState({
      items: [],
    });
    // eslint-disable-next-line no-console
    console.log('ak-quick-search.filterError', err);
  }

  render() {
    return <ResultsList items={this.props.jsonToResultParser.parse(this.state.items)} />;
  }
}
