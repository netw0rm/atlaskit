import React, { PropTypes, PureComponent } from 'react';
import { GroupedResultsParser } from '../api/JsonToResultParser';
import NoScrollResultsBox from './NoScrollResultsBox';

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
  }

  constructor(props) {
    super(props);
    this.jsonToResultParser =
      new GroupedResultsParser(props.onSearchTerminate, props.resultCallbacks);
  }

  render() {
    const mapPropsToResults = resultGroups => (
      Object.keys(resultGroups).length
        ? this.jsonToResultParser.parse(resultGroups)
        : 'No results found'
    );

    const content = this.props.resultGroups && mapPropsToResults(this.props.resultGroups);

    if (this.props.resultsType === 'recent') {
      return <NoScrollResultsBox>{content}</NoScrollResultsBox>;
    }

    return <div>{content}</div>;
  }
}
