import * as React from 'react';
import { ActionGroupAttributes as Attributes } from '@atlaskit/editor-common';

export default class ActionGroup extends React.Component<Attributes, any> {
  render() {
    const { children } = this.props;

    if (React.Children.count(children) === 0) {
      return null;
    }

    return <p>{this.props.children}</p>;
  }
}
