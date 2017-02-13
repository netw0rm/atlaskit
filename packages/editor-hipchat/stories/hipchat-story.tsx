import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';
import Editor from '../src';
import { emojiService } from '../test/_emoji-service';
import { resourceProvider } from './story-data';
import { name } from '../package.json';

storiesOf(name, module)
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
  .add('With EmojiTypeAhead', () => {
    return (
      <Editor
        onSubmit={action('submit')}
        emojiService={emojiService}
      />
    );
  })
  .add('With maxContentSize', () => <Editor maxContentSize={100}/>)
  .add('With onChange', () => <Editor onChange={action('onChange')} />)
;
