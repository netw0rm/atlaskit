import React from 'react';
import Select from 'ak-single-select';

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

export default (
  <div>
    <Select
      items={selectItems}
      placeholder="Select me!"
    />
    or
    <Select
      items={selectItems}
      placeholder="Me!"
    />
    or
    <Select
      items={selectItems}
      placeholder="I'm also good"
    />
  </div>
);
