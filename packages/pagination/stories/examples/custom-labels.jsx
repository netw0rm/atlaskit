import React, { PureComponent } from 'react';
import AkPagination from '../../src';

export default class extends PureComponent {
  render() {
    return (
      <AkPagination
        total={10}
        defaultCurrent={4}
        i18n={{ prev: '← Пред', next: 'След →' }}
      />
    );
  }
}
