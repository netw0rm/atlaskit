import * as React from 'react';
import { action } from '@kadira/storybook';
import Editor from 'ak-editor-hipchat';

export default (
  <Editor
    onSubmit={action('submit')}
    onChange={action('change')}
    maxContentSize={100}
    reverseMentionPicker={true}
  />
);
