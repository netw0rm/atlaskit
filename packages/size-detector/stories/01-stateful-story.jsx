import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { name } from '../package.json';

/* eslint-disable import/first, import/no-duplicates, no-duplicate-imports */
import PullRequestsExample from './examples/PullRequests';
import PullRequestsExampleRaw from '!raw!./examples/PullRequests';
/* eslint-enable import/first, import/no-duplicates, no-duplicate-imports */

storiesOf(name, module)
  .addExampleWithCodeStory('Customise icon color with props',
   () => <PullRequestsExample />,
   { scripts: [PullRequestsExampleRaw] },
  );
