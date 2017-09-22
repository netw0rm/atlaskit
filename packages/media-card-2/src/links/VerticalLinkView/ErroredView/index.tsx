import * as React from 'react';
import {ErrorIcon} from '../../../utils/ErrorIcon';
import {CardBorder} from '../../utils/CardBorder';

export class ErroredView extends React.Component<{}, {}> {
  render() {
    return (
      <CardBorder icon={<ErrorIcon/>}>
        Error!
      </CardBorder>
    );
  }
}
