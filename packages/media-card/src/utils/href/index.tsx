import * as React from 'react';
import * as cx from 'classnames';
import {Component} from 'react';

import {A} from './styled';

export interface HrefProps {
  linkUrl?: string;
  underline?: boolean;
  className?: string;
}

export class Href extends Component<HrefProps, {}> {
  render() {
    const {linkUrl, underline, children, className} = this.props;
    const classNames = cx(className, {underline});

    return (
      <A href={linkUrl} className={classNames} target="_blank" rel="noopener">
        {children}
      </A>
    );
  }
}
