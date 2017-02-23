import * as React from 'react';
import { PureComponent } from 'react';

export default class Strike extends PureComponent<React.Props<Strike>, {}> {
  shouldComponentUpdate(): boolean {
    return false;
  }

  render() {
    return <span style={{textDecoration: 'line-through'}}>{this.props.children}</span>;
  }
}
