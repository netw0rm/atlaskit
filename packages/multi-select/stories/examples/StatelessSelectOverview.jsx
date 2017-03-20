import React from 'react';
import { StatelessMultiSelect as MultiSelect } from '@atlaskit/multi-select';

const items = [
  {
    items: [
      { content: 'Sydney', value: 'city_1' },
      { content: 'Canberra', value: 'city_2' },
      { content: 'Melbourne', value: 'city_3' },
      { content: 'Perth', value: 'city_4', isDisabled: true },
      { content: 'Some city with spaces', value: 'city_5' },
      { content: 'Some city with another spaces', value: 'city_6' },
    ],
  },
];

const selectedItems = [items[0].items[0], items[0].items[1], items[0].items[4]];

export default (
  <MultiSelect
    items={items}
    selectedItems={selectedItems}
    label="Choose your favourite"
    placeholder="Australia"
    name="test"
    onSelected={(item) => {
      // here we would normally update some state, add `item` to selectedItems for example
      console.log(item);
    }}

    shouldFitContainer
  />
);
