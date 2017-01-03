import { storiesOf, action } from '@kadira/storybook';
import * as React from 'react';
import Editor from '../src';
import { resourceProvider } from './story-data';

storiesOf('ak-editor-hipchat', module)
  .add('Simple', () => <Editor onSubmit={action('submit')}/>)
  .add('With MentionPicker', () => {
    return (
      <Editor
        onSubmit={action('submit')}
        mentionResourceProvider={resourceProvider}
        reverseMentionPicker={false}
      />
    );
  })
  .add('With maxContentSize', () => <Editor maxContentSize={100}/>)
;
