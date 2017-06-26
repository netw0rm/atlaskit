import * as React from 'react';
import { PureComponent, ReactNode } from 'react';
import Tooltip from '@atlaskit/tooltip';

export interface Props {
  description: string;
  children: ReactNode;
  className?: string;
}
export default class TooltipWrapper extends PureComponent<Props, undefined> {

  render() {
    const { description, children, className } = this.props;

    return (
      <span className={className}>
        <Tooltip description={description} position="top">
          {children}
        </Tooltip>
      </span>
    );
  }
}
