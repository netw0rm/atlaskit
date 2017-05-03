import Button from '@atlaskit/button';
import { action, storiesOf } from '@kadira/storybook';
import { storyDecorator, storyMediaProviderFactory } from '@atlaskit/editor-core/dist/es5/test-helper';
import * as React from 'react';
import Editor from '../src';
import { emojiProvider, mentionProvider } from './story-data';
import { name, version } from '../package.json';

storiesOf(name, module)
  .addDecorator(storyDecorator(version))
  .add('Simple', () => <Editor onSubmit={action('submit')}/>)
  .add('With mentions and emojis', () =>
    (
      <Editor
        onSubmit={action('submit')}
        mentionProvider={mentionProvider}
        emojiProvider={emojiProvider}
        reverseMentionPicker={false}
      />
    )
  )
  .add('With media', () => {
    let reactEditorComponent;

    function openMediaPicker() {
      if (reactEditorComponent) {
        reactEditorComponent.showMediaPicker();
      }
    }

    const editor = (
      <div>
        <Editor
          ref={elem => reactEditorComponent = elem}
          onSubmit={action('submit')}
          mediaProvider={storyMediaProviderFactory()}
        />
        <div style={{ marginTop: '12px' }}>
          <Button onClick={openMediaPicker}>Open mediaPicker</Button>
        </div>
      </div>
    );

    return editor;
  })
  .add('With maxContentSize', () => <Editor maxContentSize={100}/>)
  .add('With onChange', () => <Editor onChange={action('onChange')} />)
  .add('With legacy format', () =>
    (
      <Editor
        onSubmit={action('submit')}
        mentionProvider={mentionProvider}
        emojiProvider={emojiProvider}
        reverseMentionPicker={false}
        useLegacyFormat={true}
      />
    )
  )
;
