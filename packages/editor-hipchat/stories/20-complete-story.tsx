import { defaultClientId, defaultServiceHost } from '@atlaskit/media-test-helpers/dist/es5/contextProvider';
import { defaultCollectionName } from '@atlaskit/media-test-helpers/dist/es5/collectionNames';
import { StoryBookTokenProvider } from '@atlaskit/media-test-helpers/dist/es5/tokenProvider';
import { action, storiesOf } from '@kadira/storybook';
import { storyDecorator, storyMediaProviderFactory } from '@atlaskit/editor-core/dist/es5/test-helper';
import { ReactRenderer as Renderer } from '@atlaskit/editor-core/src/renderer';
import { ProviderFactory } from '@atlaskit/editor-core';
import * as React from 'react';
import { pd } from 'pretty-data';
import { default as Editor, Doc } from '../src';
import { emojiProvider, mentionProvider } from './story-data';
import { name, version } from '../package.json';
import Avatar from '@atlaskit/avatar';
import { EditorWrapper, ChatInput, Conversation, MessageContent, MessageHeader, MessageSender, InsertMenu, JsonOutput } from './examples/styled';
import AttachmentIcon from '@atlaskit/icon/glyph/attachment';

const mediaProvider = storyMediaProviderFactory({
  defaultClientId,
  defaultServiceHost,
  defaultCollectionName,
  StoryBookTokenProvider,
});

storiesOf(name, module)
  .addDecorator(storyDecorator(version))
  .add('Complete + Rendering', () => {
    type Props = {};
    type State = {
      value?: Doc,
      editor?: Editor,
      prettify?: boolean,
    };

    class Cmp extends React.PureComponent<Props, State> {
      state: State = { prettify: true };
      providerFactory: ProviderFactory;

      constructor(props: Props) {
        super();

        const pf = this.providerFactory = new ProviderFactory();
        pf.setProvider('mediaProvider', mediaProvider);
        pf.setProvider('emojiProvider', emojiProvider);
        pf.setProvider('mentionProvider', mentionProvider);
      }

      openMediaPicker = () => {
        const { editor } = this.state;
        if (editor) {
          editor.showMediaPicker();
        }
      }

      handleChange = () => {
        const { editor } = this.state;

        if (!editor) {
          return;
        }

        this.setState({ value: editor.value });
      }

      handleRef = (editor) => {
        if (!editor) {
          return;
        }
        this.setState({ editor });
      }

      togglePrettify = () => {
        this.setState({ prettify: !this.state.prettify });
      }

      render() {
        const { value, prettify } = this.state;
        const json = prettify ? pd.json(value) : JSON.stringify(value);

        return (
          <div>
            <Conversation>
              <MessageSender>
                <Avatar src="http://i.imgur.com/goIWOUf.jpg" />
              </MessageSender>
              <MessageContent>
                <MessageHeader>
                  Charlie Editor
                </MessageHeader>
                {value ?
                  <Renderer
                    document={value}
                    dataProviders={this.providerFactory}
                    eventHandlers={{
                      media: {
                        onClick: action('Media card clicked')
                      }
                    }}
                  />
                : '' }
              </MessageContent>
            </Conversation>
            <ChatInput>
              <InsertMenu>
                <AttachmentIcon label="attach file" size="small" onClick={this.openMediaPicker} />
              </InsertMenu>
              <EditorWrapper>
                <Editor
                  maxContentSize={400}
                  mentionProvider={mentionProvider}
                  emojiProvider={emojiProvider}
                  reverseMentionPicker={false}
                  onChange={this.handleChange}
                  // tslint:disable-next-line:jsx-no-lambda
                  ref={this.handleRef}
                  onSubmit={action('submit')}
                  mediaProvider={mediaProvider}
                />
              </EditorWrapper>
            </ChatInput>
            <JsonOutput>{json}</JsonOutput>
          </div>
        );
      }
    }

    return <Cmp />;
  })
;

