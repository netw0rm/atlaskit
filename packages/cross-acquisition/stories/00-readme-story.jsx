import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Readme, { Code, Props } from '@atlaskit/util-readme';

import RequestTrialOverviewExample from './examples/RequestTrialOverview'; // eslint-disable-line import/no-duplicates
import ConfluenceStartTrialOverviewExample from './examples/ConfluenceStartTrialOverview'; // eslint-disable-line import/no-duplicates
import ConfluenceStartTrialProgressOverviewExample from './examples/ConfluenceStartTrialProgressOverview'; // eslint-disable-line import/no-duplicates
import ConfluenceOptOutOverviewExample from './examples/ConfluenceOptOutOverview'; // eslint-disable-line import/no-duplicates

/* eslint-disable import/first, import/no-duplicates */
import RequestTrialOverviewExampleRaw from '!raw!./examples/RequestTrialOverview';
import ConfluenceStartTrialOverviewExampleRaw from '!raw!./examples/ConfluenceStartTrialOverview';
import ConfluenceStartTrialProgressOverviewExampleRaw from '!raw!./examples/ConfluenceStartTrialProgressOverview';
import ConfluenceOptOutOverviewExampleRaw from '!raw!./examples/ConfluenceOptOutOverview';
/* eslint-enable import/first, import/no-duplicates */

import { name, description } from '../package.json';
import { RequestTrial, StartTrial, StartTrialProgress, OptOut } from '../src';

storiesOf(name, module)
  .add('📖 RequestTrial readme', () => (
    <div>
      <Readme
        component={name}
        description={description}
      >
        <Code code={RequestTrialOverviewExampleRaw}>
          {RequestTrialOverviewExample}
        </Code>
        <Props component={RequestTrial} />
      </Readme>
    </div>
  ))
  .add('📖 StartTrial readme', () => (
    <div>
      <Readme
        component={name}
        description={description}
      >
        <Code code={ConfluenceStartTrialOverviewExampleRaw}>
          {ConfluenceStartTrialOverviewExample}
        </Code>
        <Props component={StartTrial} />
      </Readme>
    </div>
  ))
  .add('📖 OptOut readme', () => (
    <div>
      <Readme
        component={name}
        description={description}
      >
        <Code code={ConfluenceOptOutOverviewExampleRaw}>
          {ConfluenceOptOutOverviewExample}
        </Code>
        <Props component={OptOut} />
      </Readme>
    </div>
  ))
  .add('📖 StartTrialProgress readme', () => (
    <div>
      <Readme
        component={name}
        description={description}
      >
        <Code code={ConfluenceStartTrialProgressOverviewExampleRaw}>
          {ConfluenceStartTrialProgressOverviewExample}
        </Code>
        <Props component={StartTrialProgress} />
      </Readme>
    </div>
  ));
