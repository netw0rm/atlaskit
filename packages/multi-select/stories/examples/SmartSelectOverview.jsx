import React from 'react';
import Select from '@atlaskit/multi-select';

const selectItems = [
  {
    items: [
      { content: 'Sydney', value: 'city_1' },
      { content: 'Canberra', value: 'city_2' },
      { content: 'Melbourne', value: 'city_3' },
      { content: 'Perth', value: 'city_4', isDisabled: true },
    ],
  },
];

export default (
  <Select
    items={selectItems}
    label="Choose your favourite"
    shouldFitContainer
    onSelectedChange={(item) => {
      console.log(item);
    }}
  />
);
