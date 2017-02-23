import * as React from 'react';
import { PureComponent } from 'react';

export default class Em extends PureComponent<React.Props<Em>, {}> {
  shouldComponentUpdate(): boolean {
    return false;
  }

  render() {
    return <em>{this.props.children}</em>;
  }
}
