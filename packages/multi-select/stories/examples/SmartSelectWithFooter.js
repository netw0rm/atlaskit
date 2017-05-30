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

const FooterWithLink = {
  content: '+ Create new component',
  href: 'http://atlassian.com',
  onClick: () => {
    console.log('Footer click! Do something!');
  },
};

const FooterWithoutLink = {
  content: '+ Create new component',
  onClick: () => {
    console.log('Footer click! Do something!');
  },
};

const FooterJustText = {
  content: 'Just some text here',
};

export default (
  <div>
    <Select
      footer={FooterWithLink}
      items={selectItems}
      label="Link in the footer"
      placeholder="Choose a component"
      shouldFitContainer
    />
    <Select
      footer={FooterWithoutLink}
      items={selectItems}
      label="onClick in the footer"
      placeholder="Choose a component"
      shouldFitContainer
    />
    <Select
      footer={FooterJustText}
      items={selectItems}
      label="Just text in footer"
      placeholder="Choose a component"
      shouldFitContainer
    />
  </div>
);
