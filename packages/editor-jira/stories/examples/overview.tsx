import Editor from '@atlaskit/editor-jira';
import { action } from '@kadira/storybook';
import * as React from 'react';

export default (
  <Editor
    // tslint:disable-next-line:jsx-no-lambda
    onSave={() => action('save')}
    // tslint:disable-next-line:jsx-no-lambda
    onChange={() => action('change')}
    isExpandedByDefault={true}
  />
);
