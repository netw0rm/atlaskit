import * as React from 'react';
import { PureComponent } from 'react';

export default class Doc extends PureComponent<React.Props<Doc>, {}> {
  render() {
    const { props } = this;
    return (
      <div>{props.children}</div>
    );
  }
}
