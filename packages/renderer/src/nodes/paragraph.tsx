import * as React from 'react';
import { PureComponent } from 'react';

export default class Paragraph extends PureComponent<React.Props<Paragraph>, {}> {
  render() {
    const { props } = this;
    return (
      <p>{props.children}</p>
    );
  }
}
