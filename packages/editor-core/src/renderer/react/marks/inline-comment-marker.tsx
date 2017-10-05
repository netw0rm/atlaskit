import * as React from 'react';
import { Component } from 'react';

export interface Props {
  reference: string;
}

export default class InlineCommentMarker extends Component<Props, {}> {
  render() {
    const { reference, children } = this.props;
    return <span data-reference={reference}>{children}</span>;
  }
}
