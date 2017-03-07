import React, { PureComponent } from 'react';
import AkDynamicTable from '../../src';
import { rows } from './sample-data';

export default class extends PureComponent {
  render() {
    return (
      <AkDynamicTable
        rows={rows}
      />
    );
  }
}
