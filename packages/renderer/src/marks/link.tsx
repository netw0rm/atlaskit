import * as React from 'react';
import { PureComponent } from 'react';

export interface LinkProps extends React.Props<Link> {
  attrs: {
    url: string;
  };
}

export default class Link extends PureComponent<LinkProps, {}> {
  shouldComponentUpdate(): boolean {
    return false;
  }

  render() {
    const { props } = this;
    return (
      <a href={props.attrs.url}>{props.children}</a>
    );
  }
}
