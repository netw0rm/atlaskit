import React, { Component, PropTypes } from 'react';

import ResultsList from '../ResultsList';
import { ISearchProvider } from '../../api/SearchProvider';
import JsonToResultParser from '../../api/JsonToResultParser';

export default class RecentResultsList extends Component {
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
    /** TODO: revise */
    props.searchProvider.recentItems().then((items) => {
      this.setState({ items });
    });
  }

  render() {
    return <ResultsList items={this.props.jsonToResultParser.parse(this.state.items)} />;
  }
}
