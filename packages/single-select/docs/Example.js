import React from 'react';
import SingleSelect from '@atlaskit/single-select';
import styled from 'styled-components';

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

const Vert = styled.div`
  display: flex;
  flex-direction: column;
`;

const SingleSelectExample = () => (
  <Vert>
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
  </Vert>
);

export default SingleSelectExample;
