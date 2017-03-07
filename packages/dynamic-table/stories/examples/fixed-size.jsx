import React, { PureComponent } from 'react';
import { action } from '@kadira/storybook';
import AkDynamicTable from '../../src';
import { caption, head, rows } from './sample-data';

export default class extends PureComponent {
  render() {
    return (
      <AkDynamicTable
        caption={caption}
        head={head}
        rows={rows}
        isFixedSize
        rowsPerPage={10}
        defaultPage={1}
        onSetPage={action('onSetPage')}
      />
    );
  }
}
