import React, { PureComponent } from 'react';
import AkPagination from '../../src';

export default class extends PureComponent {
  render() {
    return (
      <AkPagination
        defaultCurrent={6}
        total={10}
        onSetPage={page => console.log(page)}
      />
    );
  }
}
