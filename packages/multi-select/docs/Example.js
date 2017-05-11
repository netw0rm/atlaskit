import React from 'react';
import MultiSelect from '@atlaskit/multi-select';

const selectItems = [
  {
    heading: 'Cities',
    items: [
      { content: 'Sydney', value: 'sydney' },
      { content: 'Canberra', value: 'canberra' },
    ],
  },
  {
    heading: 'Animals',
    items: [
      { content: 'Sheep', value: 'sheep' },
      { content: 'Cow', value: 'cow', isDisabled: true },
    ],
  },
  {
    items: [
      { content: 'No Heading', value: 'headingless' },
    ],
  },
  {
    items: [],
  },
];

const PaginationExample = () => (
  <div>
    <MultiSelect
      items={selectItems}
      placeholder="Choose a City"
      label="Base use-case"
    />
    <MultiSelect
      items={selectItems}
      label="With more props provided"
      placeholder="Choose a City"
      noMatchesFound="Empty items"
      hasAutocomplete
      defaultSelected={[selectItems[0].items[0]]}
      onSelectedChange={e => console.log('select change', e)}
    />
    <MultiSelect
      items={selectItems}
      label="Disabled Select"
      placeholder="Choose a City"
      isDisabled
    />
    <MultiSelect
      items={selectItems}
      label="Disabled Select"
      placeholder="Choose a City"
      isInvalid
    />
  </div>
);

export default PaginationExample;
