import * as React from 'react';
import { AkNavigationItem } from '@atlaskit/navigation';

interface Props {
  /**
   * The avatar to display.
   */
  avatar: React.ReactChild;

  /**
   * A callback to execute when the result is selected.
   */
  onClick: () => void;

  /**
   * Label content of the result.
   */
  body: React.ReactChild;
}

export class Result extends React.PureComponent<Props, {}> {
  render() {
    return (
      <AkNavigationItem
        avatar={this.props.avatar}
        onClick={this.props.onClick}
        text={this.props.body}
      />
    );
  }
}
