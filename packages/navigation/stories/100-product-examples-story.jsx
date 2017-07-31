import { storiesOf } from '@kadira/storybook';
import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';

import JIRAExample from './examples/Jira';
import JIRAProjectSwitcherExample from './examples/JiraProjectSwitcher';
import { name } from '../package.json';

storiesOf(`${name}/Product patterns`, module)
  .add('JIRA', () => (
    <JIRAExample />
  ))
  .add('JIRA — Project Switcher', () => (
    <JIRAProjectSwitcherExample />
  )
);
