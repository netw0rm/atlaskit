import Editor from '@atlaskit/editor-jira';
import { action } from '@kadira/storybook';
import * as React from 'react';

export default (
  <Editor
    onSave={() => action('save')}
    onChange={() => action('change')}
    isExpandedByDefault={true}
  />
);
