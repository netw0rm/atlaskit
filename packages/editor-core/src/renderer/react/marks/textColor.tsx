import * as React from 'react';
import { PureComponent } from 'react';

export interface Props {
  color: string;
}

export default class TextColor extends PureComponent<Props, {}> {
  render() {
    const { color, children } = this.props;
    return <span style={{color}}>{children}</span>;
  }
}
