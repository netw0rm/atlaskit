import * as React from 'react';
import * as cx from 'classnames';
import {Component} from 'react';

import {A} from './styled';

export interface HrefProps {
  linkUrl?: string;
  underline?: boolean;
}

export class Href extends Component<HrefProps, {}> {
  render() {
    const {linkUrl, underline} = this.props;
    const classNames = cx({underline});

    return (
      <A href={linkUrl} className={classNames} target="_blank" rel="noopener">
        {this.props.children}
      </A>
    );
  }
}
