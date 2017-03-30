import * as React from 'react';
import {Component} from 'react';

import {A} from './styled';

export interface HrefProps {
  linkUrl?: string;
}

export class Href extends Component<HrefProps, {}> {
  render() {
    const {linkUrl} = this.props;

    return (
      <A href={linkUrl} target="_blank" rel="noopener">
        {this.props.children}
      </A>
    );
  }
}
