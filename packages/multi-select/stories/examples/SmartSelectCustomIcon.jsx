import React from 'react';
import Select from '@atlaskit/multi-select';
import SearchIcon from '@atlaskit/icon/glyph/search';

const selectItems = [
  {
    heading: 'Cities',
    items: [
      { content: 'Sydney', value: 'city_1' },
      { content: 'Canberra', value: 'city_2' },
      { content: 'Melbourne', value: 'city_3' },
    ],
  },
  {
    heading: 'Towns',
    items: [
      { content: 'Manjimup', value: 'town_1' },
      { content: 'Pemberton', value: 'town_2' },
      { content: 'Margaret River', value: 'town_3' },
    ],
  },
];

export default (
  <Select
    items={selectItems}
    label="Search for destination"
    icon={<SearchIcon label="" />}
    shouldFitContainer
  />
);
