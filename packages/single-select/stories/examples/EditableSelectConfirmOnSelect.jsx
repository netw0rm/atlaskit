import React from 'react';
import { StatelessSelect, EditableSelect } from '@atlaskit/single-select';

const selectItems = [
  {
    heading: 'Cities',
    items: [
      { content: 'Sydney', value: 'city_1' },
      { content: 'Canberra', value: 'city_2' },
      { content: 'Melbourne', value: 'city_3' },
      { content: 'Perth', value: 'city_4', isDisabled: true },
    ],
  },
];

const initialValue = selectItems[0].items[0];

export default (
  <div
    style={{
      padding: 20,
      backgroundColor: 'white',
      width: 200,
    }}
  >
    <EditableSelect
      select={
        <StatelessSelect
          items={selectItems}
        />
      }
      initialValue={initialValue}
      label="Confirm on select"
      isConfirmOnSelectEnabled
    />
  </div>
);
