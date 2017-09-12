import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { name } from '../package.json';
import JiraNavigation from './examples/JiraNavigation';

storiesOf(name, module)
  .add('Jira Navigation', () => <JiraNavigation />);
