import * as React from 'react';
import { Result } from './Result';
import OpenIcon from '@atlaskit/icon/glyph/open';

interface Props {
  /**
   * Result text.
   */
  text: string;

  /**
   * A callback to execute when the result is selected.
   */
  onClick: () => void;
}

export class UnknownResult extends React.PureComponent<Props, {}> {
  render() {
    return (
      <Result
        avatar={<OpenIcon label="Open" />}
        body={this.props.text}
        onClick={this.props.onClick}
      />
    );
  }
}
