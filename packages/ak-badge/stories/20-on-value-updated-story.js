import { storiesOf } from '@kadira/storybook';
import React from 'react';

import { name } from '../package.json';
import OnValueUpdatedExample from './examples/on-value-updated'; // eslint-disable-line import/no-duplicates

/* eslint-disable import/first, import/no-duplicates, no-duplicate-imports */
import OnValueUpdatedExampleRaw from '!raw!./examples/on-value-updated';
/* eslint-enable import/first, import/no-duplicates, no-duplicate-imports */

const imports = [['React', 'react'], ['Badge', 'ak-badge']];
storiesOf(name, module)
  .addCodeExampleStory('onValueUpdated handler prop', () => (
    <OnValueUpdatedExample />
  ), { imports, scripts: [OnValueUpdatedExampleRaw] });
