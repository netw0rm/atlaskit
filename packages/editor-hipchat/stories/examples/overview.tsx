import { action } from '@storybook/react';
import Editor from '@atlaskit/editor-hipchat';
import * as React from 'react';

export default (
  <Editor
    onSubmit={action('submit')}
    onChange={action('change')}
    maxContentSize={100}
    reverseMentionPicker={true}
  />
);
