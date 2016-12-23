import React from 'react';
import RadioGroup from 'ak-field-radio';

const items = [
  { name: 'color', value: 'red', label: 'Red' },
  { name: 'color', value: 'blue', label: 'Blue', defaultSelected: true },
  { name: 'color', value: 'yellow', label: 'Yellow' },
];

export default (
  <RadioGroup
    items={items}
    label="Pick your favourite color:"
  />
);
