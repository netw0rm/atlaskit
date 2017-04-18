import React, { Component, PropTypes } from 'react';

import { AbstractResource, SearchSubscriber } from '../../api/SearchResource';
import JsonToResultParser from '../../api/JsonToResultParser';
import uniqueId from '../../util/id';

export default class ResourcedResultsList extends Component {
  static propTypes = {
    searchResource: PropTypes.instanceOf(AbstractResource).isRequired,
    jsonToResultParser: PropTypes.instanceOf(JsonToResultParser),
    callbacks: PropTypes.shape({
      HipChatConversation: PropTypes.func,
    }),
    onSearchTerminate: PropTypes.func,
  }

  static defaultProps = {
    callbacks: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      items: null,
    };
    this.searchSubscriber = new SearchSubscriber({
      subscriberKey: uniqueId('ak-quick-search-resourced-results'),
      changeHandler: this.onSearchResultUpdate,
      errorHandler: this.filterError,
    });
    this.jsonToResultParser =
      this.props.jsonToResultParser ||
      new JsonToResultParser({
        callbacks: props.callbacks,
        onSearchTerminate: props.onSearchTerminate,
      });
  }

  componentDidMount() {
    this.searchSubscriber.subscribe(this.props.searchResource);
  }

  componentWillUnmount() {
    this.searchSubscriber.unsubscribe(this.props.searchResource);
  }

  onSearchResultUpdate = (items) => {
    this.setState({ items });
  }

  filterError = (err) => {
    this.setState({
      items: [],
    });
    // eslint-disable-next-line no-console
    console.log('ak-quick-search.filterError', err);
  }

  render() {
    const mapItemsToResults = items => (
      items.length
        ? this.jsonToResultParser.parse(items)
        : 'No results found'
    );
    return (
      <div>
        {this.state.items && mapItemsToResults(this.state.items)}
      </div>
    );
  }
}
