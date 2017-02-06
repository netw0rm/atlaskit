import React from 'react';
import FieldRadioGroup from '@atlaskit/field-radio-group';

const items = [
  { name: 'color', value: 'red', label: 'Red' },
  { name: 'color', value: 'blue', label: 'Blue', defaultSelected: true },
  { name: 'color', value: 'yellow', label: 'Yellow' },
];

export default (
  <FieldRadioGroup
    items={items}
    label="Pick your favourite color:"
  />
);
