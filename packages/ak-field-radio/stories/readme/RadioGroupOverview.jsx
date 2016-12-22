import React from 'react';
import { AkRadioGroup } from 'ak-field-radio';

const items = [
  { name: 'color', value: 'red', label: 'Red' },
  { name: 'color', value: 'blue', label: 'Blue', isSelected: true },
  { name: 'color', value: 'yellow', label: 'Yellow' },
];

const changeHandler = (event) => {
  console.log(`Radio item for ${event.target.value} was selected.`);
  // Update your state here.
};

export default (
  <AkRadioGroup
    items={items}
    label="Pick your favourite color:"
    onRadioChange={changeHandler}
  />
);
