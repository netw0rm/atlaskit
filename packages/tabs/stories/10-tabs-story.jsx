import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import Lorem from 'react-lorem-component';

import Tabs from '../src';
import { name } from '../package.json';

function handleTabSelect(selectedTabIndex) {
  action(`Switched to tab at index ${selectedTabIndex}`)();
}

storiesOf(name, module)
  .add('@atlaskit/tabs', () => (
    <Tabs
      onSelect={handleTabSelect}
      tabs={[
        {
          content: <Lorem count="1" />,
          defaultSelected: true,
          label: 'Details',
        },
        {
          content: <Lorem count="1" seed="1" />,
          label: 'Diff',
        },
        {
          content: <Lorem count="1" seed="2" />,
          label: 'Commits',
        },
        {
          content: <Lorem count="1" seed="3" />,
          label: 'Pipeline',
        },
      ]}
    />
  ))
  .add('@atlaskit/tabs with no default selection', () => (
    <Tabs
      onSelect={handleTabSelect}
      tabs={[
        {
          content: <Lorem count="1" />,
          label: 'Details',
        },
        {
          content: <Lorem count="1" seed="1" />,
          label: 'Diff',
        },
        {
          content: <Lorem count="1" seed="2" />,
          label: 'Commits',
        },
        {
          content: <Lorem count="1" seed="3" />,
          label: 'Pipeline',
        },
      ]}
    />
  ))
  .add('@atlaskit/tabs with many tabs', () => (
    <Tabs
      onSelect={handleTabSelect}
      tabs={[
        { label: 'Tab 1', content: 'Tab 1 content', defaultSelected: true },
        { label: 'Tab 2', content: 'Tab 2 content' },
        { label: 'Tab 3', content: 'Tab 3 content' },
        { label: 'Tab 4', content: 'Tab 4 content' },
        { label: 'Tab 5', content: 'Tab 5 content' },
        { label: 'Tab 6', content: 'Tab 6 content' },
        { label: 'Tab 7', content: 'Tab 7 content' },
        { label: 'Tab 8', content: 'Tab 8 content' },
        { label: 'Tab 9', content: 'Tab 9 content' },
        { label: 'Tab 10', content: 'Tab 10 content' },
      ]}
    />
  ))
  .add('@atlaskit/tabs with no child tabs', () => (
    <Tabs />
  ))
  .add('@atlaskit/tabs with multiple selected tabs', () => (
    <Tabs
      onSelect={handleTabSelect}
      tabs={[
        {
          content: <div>
            <p>Tab 1 should be selected.</p>
            <p>
              If multiple tabs have <em>defaultSelected: true</em>,
              then the first of these tabs should be selected.
            </p>
          </div>,
          defaultSelected: true,
          label: 'Tab 1 should be selected',
        },
        {
          content: 'Tab 2 should not be selected.',
          defaultSelected: true,
          label: 'Tab 2',
        },
        {
          content: 'Tab 3 should not be selected.',
          defaultSelected: true,
          label: 'Tab 3',
        },
      ]}
    />
));
