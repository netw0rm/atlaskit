import * as React from 'react';
import { PureComponent } from 'react';

export default class Strong extends PureComponent<{}, {}> {
  shouldComponentUpdate(): boolean {
    return false;
  }

  render() {
    return <strong>{this.props.children}</strong>;
  }
}
