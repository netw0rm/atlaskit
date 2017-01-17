import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Lorem from 'react-lorem-component';

import Tabs from '../src';
import { name } from '../package.json';

storiesOf(name, module)
  .add('ak-tabs', () => (
    <Tabs
      tabs={[
        {
          content: <Lorem count="1" />,
          defaultSelected: true,
          label: 'Details',
        },
        {
          content: <Lorem count="1" />,
          label: 'Diff',
        },
        {
          content: <Lorem count="1" />,
          label: 'Commits',
        },
        {
          content: <Lorem count="1" />,
          label: 'Pipeline',
        },
      ]}
    />
  ))
  .add('ak-tabs with no child tabs', () => (
    <Tabs />
  ))
  .add('ak-tabs with multiple selected tabs', () => (
    <Tabs
      tabs={[
        {
          content: 'Tab 1 is selected',
          isSelected: true,
          label: 'Tab 1',
        },
        {
          content: <span>Tab 2 is selected</span>,
          label: <span>Tab 2</span>,
        },
        {
          content: 'Tab 3 is selected',
          label: 'Tab 3',
        },
      ]}
    />
));
