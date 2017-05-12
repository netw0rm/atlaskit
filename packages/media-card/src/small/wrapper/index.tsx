import * as React from 'react';

export interface SmallWrapperProps {
  readonly children: JSX.Element;
}

export const SmallWrapper = ({children}: SmallWrapperProps): JSX.Element => ( // tslint:disable-line:variable-name
  <div>{children}</div>
);
