import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code, Props } from '@atlaskit/util-readme';

import ConfluenceRequestTrialOverviewExample from './examples/ConfluenceRequestTrialOverview'; // eslint-disable-line import/no-duplicates
import ConfluenceStartTrialOverviewExample from './examples/ConfluenceStartTrialOverview'; // eslint-disable-line import/no-duplicates
import ConfluenceOptOutOverviewExample from './examples/ConfluenceOptOutOverview'; // eslint-disable-line import/no-duplicates

/* eslint-disable import/first, import/no-duplicates */
import ConfluenceRequestTrialOverviewExampleRaw from '!raw!./examples/ConfluenceRequestTrialOverview';
import ConfluenceStartTrialOverviewExampleRaw from '!raw!./examples/ConfluenceStartTrialOverview';
import ConfluenceOptOutOverviewExampleRaw from '!raw!./examples/ConfluenceOptOutOverview';
/* eslint-enable import/first, import/no-duplicates */

import { name, description } from '../package.json';
import { RequestTrial } from '../src';

storiesOf(name, module)
  .add('📖 ConfluenceRequestTrial readme', () => (
    <div>
      <Readme
        component={name}
        description={description}
      >
        <Code code={ConfluenceRequestTrialOverviewExampleRaw}>
          {ConfluenceRequestTrialOverviewExample}
        </Code>
        <Props component={RequestTrial} />
      </Readme>
    </div>
  ))
  .add('📖 ConfluenceStartTrial readme', () => (
    <div>
      <Readme
        component={name}
        description={description}
      >
        <Code code={ConfluenceOptOutOverviewExampleRaw}>
          {ConfluenceOptOutOverviewExample}
        </Code>
        <Props component={RequestTrial} />
      </Readme>
    </div>
  ))
  .add('📖 ConfluenceOptOut readme', () => (
    <div>
      <Readme
        component={name}
        description={description}
      >
        <Code code={ConfluenceStartTrialOverviewExampleRaw}>
          {ConfluenceStartTrialOverviewExample}
        </Code>
        <Props component={RequestTrial} />
      </Readme>
    </div>
  ));
