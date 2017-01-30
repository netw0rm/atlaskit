import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Code, Chrome, Description } from '@atlaskit/util-readme';

/* eslint-disable import/first, import/no-duplicates */
import SmartSelectOverview from './examples/SmartSelectOverview';
import SmartSelectOverviewRaw from '!raw!./examples/SmartSelectOverview';
/* eslint-enable import/first, import/no-duplicates */

import { name } from '../package.json';

storiesOf(name, module)
  .add('Single select (smart) - overview', () => (
    <Chrome title="Single select (smart) - overview">
      <Description>
        <p>Multi select component</p>
      </Description>
      {SmartSelectOverview}
      <Code>
        {SmartSelectOverviewRaw}
      </Code>
    </Chrome>
  ));
