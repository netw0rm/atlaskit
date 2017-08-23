import React from 'react';
import Select from '@atlaskit/single-select';

const selectItems = [
  {
    heading: 'Numbers',
    items: [
      { content: 'One', value: '1', filterValues: ['1'], description: '(matches \'1\')' },
      { content: 'Two', value: '2', filterValues: ['2', 'two'], description: '(matches \'2\' and \'two\')' },
      { content: 'Three', value: '3', filterValues: ['3', 'three'], description: '(matches \'3\' and \'three\')' },
      { content: 'Four', value: '4', description: 'No filterValues, will just match against the content \'Four\'.' },
      { content: 'Two & Three', value: '2-3', filterValues: ['2', '3'], description: '(matches \'2\' and \'3\')' },
    ],
  },
];

export default (
  <Select
    hasAutocomplete
    items={selectItems}
    placeholder="Search for numbers"
  />
);
