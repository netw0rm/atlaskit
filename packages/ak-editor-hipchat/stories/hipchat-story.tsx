import { storiesOf, action } from '@kadira/storybook';
import * as React from 'react';
import Editor from '../src';

storiesOf('ak-editor-hipchat', module)
  .add('Simple', () => (
    <Editor onSubmit={action('submit')}/>
  ));
