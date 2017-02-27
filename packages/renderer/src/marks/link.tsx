import * as React from 'react';
import { PureComponent } from 'react';

export interface Props {
  url: string;
}

export default class Link extends PureComponent<Props, {}> {
  shouldComponentUpdate(): boolean {
    return false;
  }

  render() {
    const { props } = this;
    return (
      <a href={props.url}>{props.children}</a>
    );
  }
}
