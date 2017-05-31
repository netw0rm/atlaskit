import React from 'react';
import Select from '@atlaskit/multi-select';

const selectItems = [
  {
    items: [
      { content: 'Quote builder form', value: 'comp1' },
      { content: 'Sidebar', value: 'comp2' },
      { content: 'Navigation', value: 'comp3' },
      { content: 'Login', value: 'comp4' },
      { content: 'Directory', value: 'comp5' },
      { content: 'Payment gateway', value: 'comp6' },
      { content: 'Email system', value: 'comp7' },
    ],
  },
];

const Footer = () => (<a href="https://atlassian.com">+ Create new component</a>);

export default (
  <Select
    footer={<Footer />}
    items={selectItems}
    label="Components"
    placeholder="Choose a component"
    shouldFitContainer
  />
);
