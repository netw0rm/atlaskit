import React from 'react';
import SingleSelect from '@atlaskit/single-select';

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

const SingleSelectExample = () => (
  <div>
    <SingleSelect
      items={selectItems}
      placeholder="Choose a City"
    />
    <SingleSelect
      items={selectItems}
      placeholder="Choose a City"
      noMatchesFound="Empty items"
      hasAutocomplete
      appearance="subtle"
      defaultSelected={selectItems[0].items[0]}
    />
    <SingleSelect
      items={selectItems}
      placeholder="Choose a City"
      isInvalid
    />
    <SingleSelect
      items={selectItems}
      placeholder="Choose a City"
      isDisabled
    />
  </div>
);

export default SingleSelectExample;
