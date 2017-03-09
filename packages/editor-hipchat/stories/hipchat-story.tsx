import { action, storiesOf } from '@kadira/storybook';
import { storyDecorator } from '@atlaskit/editor-core/src/test-helper';
import * as React from 'react';
import Editor from '../src';
import { resourceProvider, mediaProvider } from './story-data';
import { name, version } from '../package.json';

storiesOf(name, module)
  .addDecorator(storyDecorator(version))
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
  .add('With Media Support', () => {
    return (
      <Editor
        onSubmit={action('submit')}
        mediaProvider={mediaProvider}
      />
    );
  })
  .add('With maxContentSize', () => <Editor maxContentSize={100}/>)
  .add('With onChange', () => <Editor onChange={action('onChange')} />)
;
