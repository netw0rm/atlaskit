import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { Code, Chrome, Description } from '@atlaskit/util-readme';

/* eslint-disable import/first, import/no-duplicates */
import SmartSelectOverview from './examples/SmartSelectOverview';
import SmartSelectOverviewRaw from '!raw!./examples/SmartSelectOverview';
/* eslint-enable import/first, import/no-duplicates */

import { name, description } from '../package.json';

storiesOf(name, module)
  .add('Multi select (smart) - overview', () => (
    <Chrome title="Multi select (smart) - overview">
      <Description>
        <p>{description}</p>
      </Description>
      {SmartSelectOverview}
      <Code>
        {SmartSelectOverviewRaw}
      </Code>
    </Chrome>
  ));
