import React from 'react';
import Select from '@atlaskit/multi-select';
import AddIcon from '@atlaskit/icon/glyph/add';
import {
  akColorB400,
} from '@atlaskit/util-shared-styles';

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
  content: 'Create new component',
  elemBefore: <AddIcon label="" primaryColor={akColorB400} />,
  textColor: akColorB400,
  onActivate: () => {
    // this looks a bit weird, but it can't be a link because of the accessibility issues
    window.location.href = 'http://atlassian.com';
  },
};

const FooterWithoutLink = {
  content: 'Create new component',
  elemBefore: <AddIcon label="" primaryColor={akColorB400} />,
  textColor: akColorB400,
  onActivate: () => {
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
      label="How to behave like a link"
      placeholder="Choose a component"
      shouldFitContainer
    />
    <Select
      footer={FooterWithoutLink}
      items={selectItems}
      label="How to behave like not a link"
      placeholder="Choose a component"
      shouldFitContainer
    />
    <Select
      footer={FooterJustText}
      items={selectItems}
      label="How not to behave at all"
      placeholder="Choose a component"
      shouldFitContainer
    />
  </div>
);
