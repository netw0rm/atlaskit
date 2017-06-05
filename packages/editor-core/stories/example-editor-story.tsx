import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';
import { defaultClientId, defaultServiceHost } from '@atlaskit/media-test-helpers/dist/es5/contextProvider';
import { defaultCollectionName } from '@atlaskit/media-test-helpers/dist/es5/collectionNames';
import { StoryBookTokenProvider } from '@atlaskit/media-test-helpers/dist/es5/tokenProvider';
import { MentionProvider } from '@atlaskit/mention';
import { EmojiProvider } from '@atlaskit/emoji';
import { emoji as emojiData, mention as mentionData } from '@atlaskit/util-data-test';

import Editor from './editor';
import { Content } from './styles';
import { name } from '../package.json';
import * as v1schema from '../src/json-schema/v1.json';
import imageUploadHandler from '../stories/imageUpload/handler';
import { toJSON } from '../src/utils';
import { storyMediaProviderFactory } from '../src/test-helper';

const mediaTestHelpers = {
  defaultClientId,
  defaultServiceHost,
  defaultCollectionName,
  StoryBookTokenProvider,
};

const CANCEL_ACTION = () => action('Cancel')();
const SAVE_ACTION = () => action('Save')();

const jsonPretty = (obj: any) => JSON.stringify(obj, null, 2);
const analyticsHandler = (actionName, props) => action(actionName)(props);
const mentionProvider1 = new Promise<any>(resolve => {
  resolve(mentionData.mentionStoryData.resourceProvider);
});

const mentionProvider2 = new Promise<any>(resolve => {
  resolve(mentionData.mentionStoryData.resourceProvider2);
});

const emojiProvider1 = emojiData.emojiStoryData.getEmojiResource() as Promise<EmojiProvider>;

interface Props {
  onChange: any;
}

interface State {
  mentionProvider: Promise<MentionProvider>;
  emojiProvider: Promise<EmojiProvider>;
  jsonDocument?: string;
}

class DemoEditor extends React.PureComponent<Props, State> {
  private editorRef: Editor;

  constructor(props) {
    super(props);

    this.state = {
      mentionProvider: mentionProvider1,
      emojiProvider: emojiProvider1,
      jsonDocument: '{}',
    };
  }

  private toggleProvider = () => {
    const { mentionProvider } = this.state;
    if (mentionProvider === mentionProvider1) {
      this.setState({
        mentionProvider: mentionProvider2
      });
    } else {
      this.setState({
        mentionProvider: mentionProvider1
      });
    }
  }

  private extractDocument = () => {
    const editor = this.editorRef;
    if (editor && editor.doc) {
      this.setState({
        jsonDocument: JSON.stringify(toJSON(editor.doc), null, 2)
      });
    }
  }

  private handleEditorRef = (ref) => {
    this.editorRef = ref;
  }

  render() {
    const { mentionProvider, emojiProvider, jsonDocument } = this.state;
    return (
      <Content>
        <div style={{ padding: '5px 0'}}>
          ️️️⚠️ Atlassians, make sure you're logged into <a href="https://id.stg.internal.atlassian.com" target="_blank">staging Identity server</a>.
        </div>
        <Editor
          maxHeight={200}
          imageUploadHandler={imageUploadHandler}
          analyticsHandler={analyticsHandler}
          onCancel={CANCEL_ACTION}
          onSave={SAVE_ACTION}
          onChange={this.props.onChange}
          mediaProvider={storyMediaProviderFactory(mediaTestHelpers)}
          mentionProvider={mentionProvider}
          emojiProvider={emojiProvider}
          isExpandedByDefault={true}
          ref={this.handleEditorRef}
          devTools={true}
        />
        <div>
          <br />
          <button onClick={this.toggleProvider}>Toggle mention provider</button>
          {`Provider: ${mentionProvider === mentionProvider1 ? '1' : '2'}`}
        </div>
        <div>
          <button onClick={this.extractDocument}>Extract document</button>
        </div>
        <pre>{jsonDocument}</pre>
      </Content>
    );
  }
}

storiesOf(name, module)
  .add('Example editor', () => (
    <Content>
      <DemoEditor
        onChange={this.fetchEditorState}
      />
    </Content>
  ))
  .add('v1 JSON Schema', () => (
    <pre><code className="json">{jsonPretty(v1schema)}</code></pre>
  ));
