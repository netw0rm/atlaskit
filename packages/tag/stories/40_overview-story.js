import { storiesOf } from '@kadira/storybook';
import React from 'react';

import Component from '../src/index';
import { name } from '../package.json';

const imports = [
  ['React', 'react'],
  ['Tag', '@atlaskit/tag'],
];

storiesOf(name, module)
  .addCodeExampleStory('overview', () => (
    <div>
      <Component
        text="Text only"
      />
      <Component
        href="https://some.link"
        text="Linked text"
      />
      <Component
        text="Removable"
        removeButtonText="Remove me"
      />
      <Component
        href="https://some.link"
        text="Removable & linked"
        removeButtonText="Remove me"
      />
      <Component
        text="Overflowing text that will be cut off"
      />
      <Component
        text="Text with button that will be cut off"
        removeButtonText="Remove me"
      />
    </div>
  ), { imports });
