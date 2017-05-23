import * as React from 'react';
import { Result } from '../types';
import { ChatRoomResult, ChatPersonResult } from './result';

interface Props {
  /**
   * The search result to display.
   */
  result: Result;

  /**
   * A callback to execute when the search result is clicked.
   */
  onClick: (result: Result) => void;
}

/**
 * A single item in the search result list.
 *
 * This component is responsible for mapping a search result to an appropriate react component,
 * based on the type of the result.
 */
export class ResultListItem extends React.PureComponent<Props, {}> {
  render() {
    const { result } = this.props;

    switch (result.type) {
      case 'hc.room':
        return (
          <ChatRoomResult
            avatarUrl={result.avatarUrl}
            name={result.title}
            onClick={this.handleClick}
          />
        );
      case 'mention':
        return (
          <ChatPersonResult
            avatarUrl={result.avatarUrl}
            name={result.title}
            onClick={this.handleClick}
          />
        );
      default:
        return null;
    }
  }

  handleClick = () => {
    this.props.onClick(this.props.result);
  }
}
