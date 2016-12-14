import { storiesOf } from '@kadira/storybook';
import React from 'react';

import Component from '../src';
import { name } from '../package.json';

const imports = [
  ['React', 'react'],
  ['Tag', 'ak-tag'],
];

storiesOf(name, module)
  .addCodeExampleStory('edge case: a simple ak-tag (should warn that no text was given in dev)', () => (
    <Component />
  ), { imports })
  .addCodeExampleStory('edge case: a removable ak-tag (should warn that no text was given in dev)', () => (
    <Component removeButtonText="Remove me" />
  ), { imports })
  .addCodeExampleStory('edge case: special characters (must not alert)', () => (
    <Component
      text="<script>alert('must not alert');</script>"
    />
  ), { imports });
