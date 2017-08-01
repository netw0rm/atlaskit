import * as React from 'react';
import { PureComponent } from 'react';

export interface Props {}
export interface State {}

export class Error extends PureComponent<Props, State> {
  render() {
    return (
        <div>
          Error (todo: nice view here)
        </div>
    );
  }
}
