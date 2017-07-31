import { storiesOf } from '@kadira/storybook';
import React from 'react';
import { name } from '../package.json';
import SimpleList from './components/drag-and-drop/SimpleList';

storiesOf(`${name} - reordering`, module)
  .add('with simple list', () => (
    <SimpleList />
  )
);
