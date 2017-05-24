import Button from '@atlaskit/button';
import * as mediaTestHelpers from '@atlaskit/media-test-helpers';
import { action, storiesOf } from '@kadira/storybook';
import { storyDecorator, storyMediaProviderFactory } from '@atlaskit/editor-core/dist/es5/test-helper';
import * as React from 'react';
import Editor from '../src';
import { emojiProvider, mentionProvider, testImageUrl, testImageName } from './story-data';
import { name, version } from '../package.json';

storiesOf(name, module)
  .addDecorator(function (story: Function, context: { kind: string, story: string }) {
    return <div style={{ border: '1px solid #C1C7D0', borderRadius: 3, padding: '4px 4px 4px 8px' }}>
      {story()}
    </div>;
  })
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
    let reactEditorComponent: Editor;

    function openMediaPicker() {
      if (reactEditorComponent) {
        reactEditorComponent.showMediaPicker();
      }
    }

    function insertTestFile() {
      if (reactEditorComponent) {
        reactEditorComponent.insertFileFromDataUrl(testImageUrl, testImageName);
      }
    }

    const editor = (
      <div>
        <div style={{ float: 'right', position: 'relative', top: -6, left: 6 }}>
          <Button onClick={openMediaPicker} appearance="primary">Show media picker</Button>&nbsp;
          <Button onClick={insertTestFile} appearance="primary">Insert from base64</Button>
        </div>
        <Editor
          // tslint:disable-next-line:jsx-no-lambda
          ref={elem => reactEditorComponent = elem}
          onSubmit={action('submit')}
          mediaProvider={storyMediaProviderFactory(mediaTestHelpers)}
        />
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
  ).add('Editor Hipchat with all enabled', () =>
    {
      let reactEditorComponent;

    function openMediaPicker() {
      if (reactEditorComponent) {
        reactEditorComponent.showMediaPicker();
      }
    }
      const editor = (
        <div>
          <div style={{ float: 'right', position: 'relative', top: -6, left: 6 }}>
            <Button onClick={openMediaPicker} appearance="primary">Show media picker</Button>
          </div>
        <Editor
          maxContentSize={400}
          mentionProvider={mentionProvider}
          emojiProvider={emojiProvider}
          reverseMentionPicker={false}
          onChange={action('onChange')}
           // tslint:disable-next-line:jsx-no-lambda
          ref={elem => reactEditorComponent = elem}
          onSubmit={action('submit')}
          mediaProvider={storyMediaProviderFactory(mediaTestHelpers)}
        />
        </div>
      );
      return editor;
    });

