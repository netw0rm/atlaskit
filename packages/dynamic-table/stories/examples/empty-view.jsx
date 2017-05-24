import React, { PureComponent } from 'react';
import { DynamicTableStateless } from '@atlaskit/dynamic-table';

export default class extends PureComponent {
  render() {
    return (
      <DynamicTableStateless
        emptyView={<em>empty view</em>}
      />
    );
  }
}
