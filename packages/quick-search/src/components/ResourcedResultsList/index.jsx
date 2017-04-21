import React, { Component, PropTypes } from 'react';

import { AbstractResource, SearchSubscriber } from '../../api/SearchResource';
import { GroupedResultsParser, JsonToResultParser } from '../../api/JsonToResultParser';
import uniqueId from '../../util/id';
import NoScrollResultsBox from '../NoScrollResultsBox';

export default class ResourcedResultsList extends Component {
  static propTypes = {
    searchResource: PropTypes.instanceOf(AbstractResource).isRequired,
    jsonToResultParser: PropTypes.instanceOf(JsonToResultParser),
    resultCallbacks: PropTypes.shape({
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
      resultType: 'recent',
    };
    this.searchSubscriber = new SearchSubscriber({
      subscriberKey: uniqueId('ak-quick-search-resourced-results'),
      changeHandler: this.onSearchResultUpdate,
      errorHandler: this.filterError,
    });
    this.jsonToResultParser =
      this.props.jsonToResultParser ||
      new GroupedResultsParser(props.onSearchTerminate, props.resultCallbacks);
  }

  componentDidMount = () => {
    this.searchSubscriber.subscribe(this.props.searchResource);
  }

  componentWillUnmount() {
    this.searchSubscriber.unsubscribe(this.props.searchResource);
  }

  onSearchResultUpdate = (resultType, items) => {
    this.setState({ resultType, items });
  }

  getNoScrollHeight = () => {
    const cmpntY = this.ref && this.ref.getBoundingClientRect().top;
    return window.innerHeight - cmpntY;
  }

  filterError = (err) => {
    this.setState({
      items: [],
      resultType: 'error',
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

    let content = this.state.items && mapItemsToResults(this.state.items);
    if (this.state.resultType === 'recent') {
      content = (
        <NoScrollResultsBox getContainerHeight={this.getNoScrollHeight}>
          {content}
        </NoScrollResultsBox>
      );
    }

    return (
      <div ref={(div) => { this.ref = div; }}>
        {content}
      </div>
    );
  }
}
