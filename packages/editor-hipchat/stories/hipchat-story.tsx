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
        reversePosition={true}
      />
    );
  })
  .add('With EmojiTypeAhead', () => {
    let editorRef;
    const reloadEditor = () => {
      if (editorRef) {
        const jsonDoc = editorRef.value;
        editorRef.setFromJson(jsonDoc);
      }
    };
    return (
      <div>
        <button onClick={reloadEditor}>Reload document</button>
        <div
          style={{
            border: '1px solid #ccc',
            margin: '5px',
          }}
        >
          <Editor
            onSubmit={action('submit')}
            emojiService={emojiService}
            ref={(ref) => { editorRef = ref; }}
          />
        </div>
      </div>
    );
  })
  .add('With maxContentSize', () => <Editor maxContentSize={100}/>)
  .add('With onChange', () => <Editor onChange={action('onChange')} />)
;
