import { storiesOf } from '@kadira/storybook';
import React from 'react';

import Component from '../src';
import { name } from '../package.json';

storiesOf(name, module)
  .add('edge case: a simple ak-tag (should warn that no text was given in dev)', () => (
    <Component />
  ))
  .add('edge case: a removable ak-tag (should warn that no text was given in dev)', () => (
    <Component removeButtonText="Remove me" />
  ))
  .add('edge case: special characters (must not alert)', () => (
    <Component
      text="<script>alert('must not alert');</script>"
    />
  ));
