import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';
import { defaultClientId, defaultServiceHost } from '@atlaskit/media-test-helpers/dist/es5/contextProvider';
import { defaultCollectionName } from '@atlaskit/media-test-helpers/dist/es5/collectionNames';
import { StoryBookTokenProvider } from '@atlaskit/media-test-helpers/dist/es5/tokenProvider';
import Button from '@atlaskit/button';
import ButtonGroup from '@atlaskit/button-group';
import { emoji as emojiData, mention as mentionData } from '@atlaskit/util-data-test';

import Editor from './editor';
import { Content } from './styles';
import { name, version } from '../package.json';
import * as v1schema from '../src/json-schema/v1.json';
import { toJSON } from '../src/utils';
import { storyDecorator, storyMediaProviderFactory } from '../src/test-helper';

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

const rejectedPromise = Promise.reject(new Error('Simulated provider rejection'));
const pendingPromise = new Promise<any>(() => {});
const providers = {
  mentionProvider: {
    resolved: Promise.resolve(mentionData.mentionStoryData.resourceProvider),
    'resolved 2': Promise.resolve(mentionData.mentionStoryData.resourceProvider2),
    pending: pendingPromise,
    rejected: rejectedPromise,
    'undefined' : undefined,
  },
  emojiProvider: {
    resolved: emojiData.emojiStoryData.getEmojiResource(),
    pending: pendingPromise,
    rejected: rejectedPromise,
    'undefined' : undefined,
  },
  mediaProvider: {
    resolved: storyMediaProviderFactory(mediaTestHelpers),
    pending: pendingPromise,
    rejected: rejectedPromise,
    'view only': storyMediaProviderFactory(mediaTestHelpers, undefined, undefined, false),
    'undefined' : undefined,
  },
};
rejectedPromise.catch(() => {});

interface Props {}

interface State {
  editorEnabled: boolean;
  mentionProvider: string;
  mediaProvider: string;
  emojiProvider: string;
  jsonDocument?: string;
}

class DemoEditor extends React.PureComponent<Props, State> {
  private editorRef: Editor;

  constructor(props) {
    super(props);

    this.state = {
      editorEnabled: true,
      mentionProvider: 'resolved',
      mediaProvider: 'resolved',
      emojiProvider: 'resolved',
      jsonDocument: '{}',
    };
  }

  private switchProvider = (providerType, providerName) => {
    this.setState({ [providerType]: providerName });
  }

  private reloadEditor = () => {
    this.setState({ editorEnabled: false }, () => {
      this.setState({ editorEnabled: true });
    });
  }

  private onChange = () => {
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
    const { mentionProvider, emojiProvider, mediaProvider, jsonDocument, editorEnabled } = this.state;
    return (
      <Content>
        <div style={{ padding: '5px 0'}}>
          ️️️⚠️ Atlassians, make sure you're logged into <a href="https://id.stg.internal.atlassian.com" target="_blank">staging Identity server</a>.
        </div>
        {editorEnabled ? (
          <Editor
            analyticsHandler={analyticsHandler}
            onCancel={CANCEL_ACTION}
            onSave={SAVE_ACTION}
            onChange={this.onChange}
            mediaProvider={providers.mediaProvider[mediaProvider]}
            mentionProvider={providers.mentionProvider[mentionProvider]}
            emojiProvider={providers.emojiProvider[emojiProvider]}
            isExpandedByDefault={true}
            ref={this.handleEditorRef}
            defaultValue={jsonDocument}
            devTools={true}
          />
        ) : ''}
        <div className="toolsDrawer">
          <div>
            <ButtonGroup>
              <label>Mention provider: </label>
              {Object.keys(providers.mentionProvider).map((providerName) => (
                <Button
                  key={`mentionProvider-${providerName}`}
                  onClick={this.switchProvider.bind(this, 'mentionProvider', providerName)}
                  appearance={providerName === mentionProvider ? 'primary' : 'default'}
                  theme="dark"
                  spacing="compact"
                >
                  {providerName}
                </Button>
              ))}
            </ButtonGroup>
          </div>
          <div>
            <ButtonGroup>
              <label>Media provider: </label>
              {Object.keys(providers.mediaProvider).map((providerName) => (
                <Button
                  key={`mediaProvider-${providerName}`}
                  onClick={this.switchProvider.bind(this, 'mediaProvider', providerName)}
                  appearance={providerName === mediaProvider ? 'primary' : 'default'}
                  theme="dark"
                  spacing="compact"
                >
                  {providerName}
                </Button>
              ))}
            </ButtonGroup>
          </div>
          <div>
            <ButtonGroup>
              <label>Emoji provider: </label>
              {Object.keys(providers.emojiProvider).map((providerName) => (
                <Button
                  key={`emojiProvider-${providerName}`}
                  onClick={this.switchProvider.bind(this, 'emojiProvider', providerName)}
                  appearance={providerName === emojiProvider ? 'primary' : 'default'}
                  theme="dark"
                  spacing="compact"
                >
                  {providerName}
                </Button>
              ))}
            </ButtonGroup>
          </div>
          <div>
            <Button onClick={this.reloadEditor} theme="dark" spacing="compact">
              Reload Editor
            </Button>
          </div>
        </div>
        <legend>JSON output:</legend>
        <pre>{jsonDocument}</pre>
      </Content>
    );
  }
}

storiesOf(name, module)
  .addDecorator(storyDecorator(version))
  .add('Example editor', () => (
    <Content>
      <DemoEditor />
    </Content>
  ))
  .add('v1 JSON Schema', () => (
    <pre><code className="json">{jsonPretty(v1schema)}</code></pre>
  ));
