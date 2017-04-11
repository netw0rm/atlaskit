import React, { Component, PropTypes } from 'react';

import ResultsList from '../ResultsList';
import { ISearchProvider, SearchSubscriber } from '../../api/SearchProvider';
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

  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
    this.searchSubscriber = new SearchSubscriber({
      subscriberKey: uniqueId('ak-quick-search-resourced-results'),
      changeHandler: this.onSearchResultUpdate,
      errorHandler: this.filterError,
    });
  }

  componentDidMount() {
    this.searchSubscriber.subscribe(this.props.searchProvider);
  }

  componentWillUnmount() {
    this.searchSubscriber.unsubscribe(this.props.searchProvider);
  }

  onSearchResultUpdate = (items) => {
    this.setState({
      items,
    });
  }

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
