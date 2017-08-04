import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { name } from '../package.json';
import SimpleListWithTheme from './components/drag-and-drop/SimpleListWithTheme';
import WithNestedNavigation from './components/drag-and-drop/WithNestedNavigation';
import ListWithGroups from './components/drag-and-drop/ListWithGroups';

storiesOf(`${name} - reordering`, module)
  .add('with simple list and themeing', () => (
    <SimpleListWithTheme />
  ))
  .add('with groups', () => (
    <ListWithGroups />
  ))
  .add('with nested navigation', () => (
    <WithNestedNavigation />
  ));
