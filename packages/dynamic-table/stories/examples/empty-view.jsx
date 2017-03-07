import React, { PureComponent } from 'react';
import { DynamicTable } from '../../src';

export default class extends PureComponent {
  render() {
    return (
      <DynamicTable
        emptyView={<em>empty view</em>}
      />
    );
  }
}
