import * as React from 'react';
import { PureComponent } from 'react';

export default class Strong extends PureComponent<React.Props<Strong>, {}> {
  shouldComponentUpdate(): boolean {
    return false;
  }

  render() {
    return <strong>{this.props.children}</strong>;
  }
}
