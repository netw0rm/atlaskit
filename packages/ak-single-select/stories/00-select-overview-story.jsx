import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Code, Chrome, Description } from 'akutil-readme';

/* eslint-disable import/first, import/no-duplicates */
import StatelessSelectOverview from './examples/StatelessSelectOverview';
import StatelessSelectOverviewRaw from '!raw!./examples/StatelessSelectOverview';
import SmartSelectOverview from './examples/SmartSelectOverview';
import SmartSelectOverviewRaw from '!raw!./examples/SmartSelectOverview';
/* eslint-enable import/first, import/no-duplicates */

import { name } from '../package.json';

storiesOf(name, module)
  .add('Single select (stateless) - overview', () => (
    <Chrome title="Single select (stateless) - overview">
      <Description>
        <p>Simple select component</p>
      </Description>
      {StatelessSelectOverview}
      <Code>{StatelessSelectOverviewRaw}</Code>
    </Chrome>
  ))
  .add('Single select (smart) - overview', () => (
    <Chrome title="Single select (smart) - overview">
      <Description>
        <p>Simple select component</p>
      </Description>
      <Code code={SmartSelectOverviewRaw}>
        {SmartSelectOverview}
      </Code>
    </Chrome>
  ));
