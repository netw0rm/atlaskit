import React, { PropTypes, PureComponent } from 'react';

import NoScrollResultsBox from './NoScrollResultsBox';
import { GroupedResultsParser, IResultParser } from '../api/result-parser/ResultParser';

export default class ResultsList extends PureComponent {

  static itemPropType = PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.any),
  }));

  static propTypes = {
    resultGroups: PropTypes.shape({
      Conversations: self.itemPropType,
      Other: self.itemPropType,
    }),
    resultsType: PropTypes.string,
    onSearchTerminate: PropTypes.func,
    resultCallbacks: PropTypes.shape({
      HipChatConversation: PropTypes.func,
    }),
    resultParser: PropTypes.instanceOf(IResultParser),
  }

  static defaultProps = {
    resultGroups: {},
  }

  constructor(props) {
    super(props);
    this.resultParser =
      props.resultParser ||
      new GroupedResultsParser(props.onSearchTerminate, props.resultCallbacks);
  }

  render() {
    const mapPropsToResults = resultGroups => (
      Object.keys(resultGroups).length
        ? this.resultParser.parse(resultGroups)
        : 'No results found'
    );

    const content = mapPropsToResults(this.props.resultGroups || {});

    if (this.props.resultsType === 'recent') {
      return <NoScrollResultsBox>{content}</NoScrollResultsBox>;
    }

    return <div>{content}</div>;
  }
}
