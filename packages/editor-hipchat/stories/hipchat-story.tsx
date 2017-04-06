import { action, storiesOf } from '@kadira/storybook';
import { storyDecorator } from '@atlaskit/editor-core/dist/es5/test-helper';
import * as React from 'react';
import Editor from '../src';
import { mentionProvider } from './story-data';
import { name, version } from '../package.json';

storiesOf(name, module)
  .addDecorator(storyDecorator(version))
  .add('Simple', () => <Editor onSubmit={action('submit')}/>)
  .add('With MentionPicker', () => {
    return (
      <Editor
        onSubmit={action('submit')}
        mentionProvider={mentionProvider}
        reverseMentionPicker={false}
      />
    );
  })
  .add('With maxContentSize', () => <Editor maxContentSize={100}/>)
  .add('With onChange', () => <Editor onChange={action('onChange')} />)
;
