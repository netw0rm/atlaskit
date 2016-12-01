import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import Editor from '../src';

declare var module: any;

storiesOf('ak-editor-hipchat', module)
  .add('Simple', () => (
    <Editor onSubmit={action('submit')}/>
  ));
