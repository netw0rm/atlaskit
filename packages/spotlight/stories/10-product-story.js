import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { name } from '../package.json';
import JiraExample from './examples/jira';

storiesOf(name, module)
  .add('Jira', () => <JiraExample />);
