import styled from 'styled-components';
import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';
import { Component } from 'react';
import Button from '@atlaskit/button';
import ButtonGroup from '@atlaskit/button-group';
import { akColorN80 } from '@atlaskit/util-shared-styles';

import Editor from './../src/editor';
import EditorContext from './../src/editor/ui/EditorContext';
import WithEditorActions from './../src/editor/ui/WithEditorActions';
import { name, version } from '../package.json';
import { storyDecorator, storyMediaProviderFactory } from '../src/test-helper';
import { defaultClientId, defaultServiceHost } from '@atlaskit/media-test-helpers/dist/es5/contextProvider';
import { defaultCollectionName } from '@atlaskit/media-test-helpers/dist/es5/collectionNames';
import { StoryBookTokenProvider } from '@atlaskit/media-test-helpers/dist/es5/tokenProvider';
import { storyData as mentionStoryData } from '@atlaskit/mention/dist/es5/support';
import { storyData as emojiStoryData } from '@atlaskit/emoji/dist/es5/support';
import { MockActivityResource } from '@atlaskit/activity/dist/es5/support';
import { ConfluenceTransformer } from '../';
import Spinner from '@atlaskit/spinner';
import { pd } from 'pretty-data';

import {
  akEditorCodeBackground,
  akEditorCodeBlockPadding,
  akEditorCodeFontFamily,
} from '../src/styles';

import { akBorderRadius } from 'akutil-shared-styles';

const mediaTestHelpers = {
  defaultClientId,
  defaultServiceHost,
  defaultCollectionName,
  StoryBookTokenProvider,
};

// tslint:disable-next-line:variable-name
export const TitleInput = styled.input`
  border: none;
  outline: none;
  font-size: 2.07142857em;
  margin: 0 0 21px;
  padding: 0;

  &::placeholder {
    color: ${akColorN80};
  }
`;
TitleInput.displayName = 'TitleInput';

// tslint:disable-next-line:variable-name
export const Content = styled.div`
  padding: 0 20px;
  height: 100%;
  background: #fff;
  box-sizing: border-box;

  & .ProseMirror {
    & pre {
      font-family: ${akEditorCodeFontFamily};
      background: ${akEditorCodeBackground};
      padding: ${akEditorCodeBlockPadding};
      border-radius: ${akBorderRadius};
    }
  }
}`;
Content.displayName = 'Content';

const analyticsHandler = (actionName, props) => action(actionName)(props);
let handleChange: (actions) => void;

// tslint:disable-next-line:variable-name
const SaveAndCancelButtons = props => (
  <ButtonGroup>
    <Button
      appearance="primary"
      // tslint:disable-next-line:jsx-no-lambda no-console
      onClick={() => props.editorActions.getValue().then(value => console.log(value.toJSON()))}
    >
      Publish
    </Button>
    <Button
      appearance="subtle"
      // tslint:disable-next-line:jsx-no-lambda
      onClick={() => props.editorActions.clear()}
    >
      Close
    </Button>
  </ButtonGroup>
);

const CODE_MACRO = `<ac:structured-macro ac:name="code" ac:schema-version="1" ac:macro-id="1c61c2dd-3574-45f3-ac07-76d400504d84"><ac:parameter ac:name="language">js</ac:parameter><ac:parameter ac:name="theme">Confluence</ac:parameter><ac:parameter ac:name="title">Example</ac:parameter><ac:plain-text-body><![CDATA[if (true) {
  console.log('Hello World');
}]]></ac:plain-text-body></ac:structured-macro>`;

const PANEL_MACRO = `<ac:structured-macro ac:name="warning" ac:schema-version="1" ac:macro-id="f348e247-44a6-41e5-8034-e8aa469649b5"><ac:parameter ac:name="title">Hello</ac:parameter><ac:rich-text-body><p>Warning panel</p></ac:rich-text-body></ac:structured-macro>`;
const JIRA_ISSUE = '<p><ac:structured-macro ac:name="jira" ac:schema-version="1" ac:macro-id="a1a887df-a2dd-492b-8b5c-415d8eab22cf"><ac:parameter ac:name="server">JIRA (product-fabric.atlassian.net)</ac:parameter><ac:parameter ac:name="serverId">70d83bc8-0aff-3fa5-8121-5ae90121f5fc</ac:parameter><ac:parameter ac:name="key">ED-1068</ac:parameter></ac:structured-macro></p>';
const JIRA_ISSUES_LIST = '<p><ac:structured-macro ac:name="jira" ac:schema-version="1" ac:macro-id="be852c2a-4d33-4ceb-8e21-b3b45791d92e"><ac:parameter ac:name="server">JIRA (product-fabric.atlassian.net)</ac:parameter><ac:parameter ac:name="columns">key,summary,type,created,updated,due,assignee,reporter,priority,status,resolution</ac:parameter><ac:parameter ac:name="maximumIssues">20</ac:parameter><ac:parameter ac:name="jqlQuery">project = ED AND component = codeblock</ac:parameter><ac:parameter ac:name="serverId">70d83bc8-0aff-3fa5-8121-5ae90121f5fc</ac:parameter></ac:structured-macro></p>';


storiesOf(name, module)
  .addDecorator(function (story: Function, context: { kind: string, story: string }) {
    type Props = {};
    type State = { cxhtml?: string, story?: any, prettify?: boolean, isMediaReady?: boolean};
    class Demo extends Component<Props, State> {
      state: State;

      constructor(props: Props) {
        super(props);
        handleChange = this.handleChange;
        this.state = {
          cxhtml: '',
          prettify: true,
          story: story(),
          isMediaReady: true,
        };
      }

      handleChange = (editorActions) => {
        this.setState({ isMediaReady: false });

        action('Change')();

        editorActions.getValue().then((value) => {
          action('Value has been resolved')(value);
          this.setState({
            isMediaReady: true,
            cxhtml: value
          });
        });
      }

      togglePrettify = () => {
        this.setState({ prettify: !this.state.prettify });
      }

      render() {
        const xml = this.state.prettify ? pd.xml(this.state.cxhtml || '') : this.state.cxhtml || '';

        return (
          <div ref="root">
            {this.state.story}
            <fieldset style={{ marginTop: 20 }}>
              <legend>
                CXHTML output
                (
                  <input type="checkbox" checked={this.state.prettify} onChange={this.togglePrettify}/>
                  <span onClick={this.togglePrettify} style={{ cursor: 'pointer' }}> prettify</span>
                )
              </legend>
              {this.state.isMediaReady ?
                <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{xml}</pre>
                :
                <div style={{ padding: 20 }}><Spinner size="large" /></div>
              }
            </fieldset>
          </div>
        );
      }
    }

    return <Demo/>;
  })
  .addDecorator(storyDecorator(version))
  .add('CXHTML transformer', () => {
    type Props = {};
    type State = { input: string, output: string };
    class Demo extends Component<Props, State> {
      state = { input: '', output: '' };
      refs: {
        input: HTMLTextAreaElement;
      };

      render() {
        return (
          <div ref="root">
            <fieldset style={{ marginTop: 20, marginBottom: 20 }}>
              <legend>Input</legend>
              <textarea
                style={{
                  boxSizing: 'border-box',
                  border: '1px solid lightgray',
                  fontFamily: 'monospace',
                  padding: 10,
                  width: '100%',
                  height: 100
                }}
                ref="input"
              />
              <button onClick={this.handleImportClick}>Import</button>
              <button onClick={this.handleInsertCodeClick}>Insert Code</button>
              <button onClick={this.handleInsertPanelClick}>Insert Panel</button>
              <button onClick={this.handleInsertJiraIssueClick}>Insert JIRA Issue</button>
              <button onClick={this.handleInsertJiraIssuesListClick}>Insert JIRA Issues List</button>
            </fieldset>
            <Content>
              <EditorContext>
                <WithEditorActions
                    // tslint:disable-next-line:jsx-no-lambda
                    render={actions => (
                      <Editor
                        appearance="full-page"
                        analyticsHandler={analyticsHandler}

                        allowTextFormatting={true}
                        allowTasksAndDecisions={true}
                        allowHyperlinks={true}
                        allowCodeBlocks={true}
                        allowLists={true}
                        allowTextColor={true}
                        allowTables={true}

                        mediaProvider={storyMediaProviderFactory(mediaTestHelpers)}
                        emojiProvider={emojiStoryData.getEmojiResource({ uploadSupported: true })}
                        mentionProvider={Promise.resolve(mentionStoryData.resourceProvider)}
                        activityProvider={Promise.resolve(new MockActivityResource())}
                        // tslint:disable-next-line:jsx-no-lambda
                        transformerProvider={(schema) => new ConfluenceTransformer(schema)}

                        placeholder="Write something..."
                        shouldFocus={false}

                        onChange={(editorView) => handleChange(actions)}

                        contentComponents={
                          <TitleInput
                            placeholder="Give this page a title..."
                            // tslint:disable-next-line:jsx-no-lambda
                            innerRef={ref => ref && ref.focus()}
                          />
                        }

                        primaryToolbarComponents={
                          <WithEditorActions
                            // tslint:disable-next-line:jsx-no-lambda
                            render={actions => <SaveAndCancelButtons editorActions={actions}/>}
                          />
                        }
                      />
                    )}
                />
              </EditorContext>
            </Content>
          </div>
        );
      }

      private handleImportClick = () => this.setState({ input: this.refs.input.value });
      private handleInsertCodeClick = () => this.setState({ input: CODE_MACRO });
      private handleInsertPanelClick = () => this.setState({ input: PANEL_MACRO });
      private handleInsertJiraIssueClick = () => this.setState({ input: JIRA_ISSUE });
      private handleInsertJiraIssuesListClick = () => this.setState({ input: JIRA_ISSUES_LIST });
    }

    return <Demo />;
  });
