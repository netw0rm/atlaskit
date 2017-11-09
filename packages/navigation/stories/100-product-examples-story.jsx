import { storiesOf } from '@kadira/storybook';
import React from 'react';
import JIRAExample from './examples/Jira';
import ConfluenceSpacePage from './examples/ConfluenceSpacePage';
import ConfluenceHome from './examples/ConfluenceHome';
import { name } from '../package.json';

storiesOf(`${name}/Product patterns`, module)
  .add('JIRA', () => (
    <JIRAExample />
  ))
  .add('Confluence - Home', () => (
    <ConfluenceHome />
  ))
  .add('Confluence - Space / Page', () => (
    <ConfluenceSpacePage />
  ));
