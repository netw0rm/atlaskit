import React, { Component, PropTypes } from 'react';

import ResultsList from '../ResultsList';
import SearchResource, { SearchSubscriber } from '../../api/SearchResource';
import JsonToResultParser from '../../api/JsonToResultParser';
import uniqueId from '../../util/id';

export default class ResourcedResultsList extends Component {
  static propTypes = {
    searchResource: PropTypes.instanceOf(SearchResource).isRequired,
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
    this.searchSubscriber.subscribe(this.props.searchResource);
  }

  componentWillUnmount() {
    this.searchSubscriber.unsubscribe(this.props.searchResource);
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
