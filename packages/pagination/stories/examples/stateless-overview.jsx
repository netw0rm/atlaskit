import React, { PureComponent } from 'react';
import { Pagination } from '@atlaskit/pagination';

export default class extends PureComponent {
  render() {
    return (
      <Pagination
        current={4}
        total={10}
        onSetPage={page => console.log(page)}
      />
    );
  }
}
