import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';

import Button, { ButtonGroup } from '@atlaskit/button';
import Editor from './../src/editor';
import EditorContext from './../src/editor/ui/EditorContext';
import WithEditorActions from './../src/editor/ui/WithEditorActions';
import ToolsDrawer from './ToolsDrawer';
import { name, version } from '../package.json';
import { storyDecorator } from '../src/test-helper';
import CollapsedEditor from '../src/editor/ui/CollapsedEditor';
import ToolbarFeedback from '../src/ui/ToolbarFeedback';

const SAVE_ACTION = () => action('Save')();
const CANCEL_ACTION = () => action('Cancel')();
const EXPAND_ACTION = () => action('Expand')();
const analyticsHandler = (actionName, props) => action(actionName)(props);
const exampleDocument = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'Some example document with emojis ' },
        {
          type: 'emoji',
          attrs: { shortName: ':catchemall:', id: 'atlassian-catchemall', text: ':catchemall:' }
        },
        { type: 'text', text: ' and mentions ' },
        {
          type: 'mention',
          attrs: { id: '0', text: '@Carolyn', accessLevel: '' }
        },
        { type: 'text', text: '. ' }
      ]
    }
  ]
};

storiesOf(name, module)
  .addDecorator(storyDecorator(version))
  .add('Comment Editor', () => {
    type Props = {};
    type State = { hasJquery?: boolean, isExpanded?: boolean };
    class EditorWithFeedback extends React.Component<Props, State> {
      state = {
        hasJquery: false,
        isExpanded: false
      };

      componentDidMount() {
        delete window.jQuery;
        this.loadJquery();
      }

      onFocus = () => this.setState(prevState => ({ isExpanded: !prevState.isExpanded }));

      render() {
        if (!this.state.hasJquery) {
          return <h3>Please wait, loading jQuery ...</h3>;
        }

        return (
          <EditorContext>
            <div>
              <WithEditorActions
                // tslint:disable-next-line:jsx-no-lambda
                render={actions =>
                  <ButtonGroup>
                    <Button onClick={() => actions.replaceDocument(exampleDocument)}>Load Document</Button>
                    <Button onClick={() => actions.clear()}>Clear</Button>
                  </ButtonGroup>
                }
              />
              <ToolsDrawer
                // tslint:disable-next-line:jsx-no-lambda
                renderEditor={({ mentionProvider, emojiProvider, mediaProvider, imageUploadProvider, onChange }) =>
                  <div style={{ padding: '20px' }}>
                    <CollapsedEditor
                      placeholder="What do you want to say?"
                      isExpanded={this.state.isExpanded}
                      onFocus={this.onFocus}
                    >
                      <Editor
                        appearance="comment"
                        analyticsHandler={analyticsHandler}
                        shouldFocus={true}

                        allowTextFormatting={true}
                        allowTasksAndDecisions={true}
                        allowHyperlinks={true}
                        allowCodeBlocks={true}
                        allowLists={true}

                        mentionProvider={mentionProvider}
                        emojiProvider={emojiProvider}
                        mediaProvider={mediaProvider}
                        imageUploadProvider={imageUploadProvider}

                        onChange={onChange}
                        onSave={SAVE_ACTION}
                        onCancel={CANCEL_ACTION}
                        onExpand={EXPAND_ACTION}

                        primaryToolbarComponents={<ToolbarFeedback packageVersion={version} packageName={name} />}
                      />
                    </CollapsedEditor>
                  </div>}
              />
            </div>
          </EditorContext>
        );
      }

      private loadJquery = () => {
        const scriptElem = document.createElement('script');
        scriptElem.type = 'text/javascript';
        scriptElem.src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js';

        scriptElem.onload = () => {
          this.setState({
            ...this.state,
            hasJquery: true
          });
        };

        document.body.appendChild(scriptElem);
      }
    }

    return <EditorWithFeedback />;
  }
);
