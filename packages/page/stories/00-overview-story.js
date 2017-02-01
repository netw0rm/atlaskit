import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code } from 'akutil-readme';
import Page from 'ak-page';

import { name, description } from '../package.json';

import OverviewExample from './examples/overview'; // eslint-disable-line

/* eslint-disable import/first, import/no-duplicates */
import OverviewExampleRaw from '!raw!./examples/overview';
/* eslint-enable import/first, import/no-duplicates */

storiesOf(name, module)
  .add('Overview', () => (
    <Readme component={Page} description={description}>
      <Code code={OverviewExampleRaw}>
        {OverviewExample}
      </Code>
    </Readme>
  ));
