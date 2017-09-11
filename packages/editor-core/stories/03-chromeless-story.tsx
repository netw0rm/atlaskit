import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';

import ButtonGroup from '@atlaskit/button-group';
import Button from '@atlaskit/button';
import Editor from './../src/editor';
import EditorContext from './../src/editor/ui/EditorContext';
import WithEditorActions from './../src/editor/ui/WithEditorActions';
import ToolsDrawer from './ToolsDrawer';
import { name, version } from '../package.json';
import { storyDecorator } from '../src/test-helper';

const SAVE_ACTION = () => action('Save')();
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
  .add('Chromeless Editor', () =>
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
          renderEditor={({ mentionProvider, emojiProvider, mediaProvider, onChange }) =>
            <Editor
              appearance="chromeless"
              analyticsHandler={analyticsHandler}
              shouldFocus={true}

              allowTextFormatting={true}
              allowTasksAndDecisions={true}
              allowHyperlinks={true}
              allowCodeBlocks={true}

              saveOnEnter={true}

              mentionProvider={mentionProvider}
              emojiProvider={emojiProvider}
              mediaProvider={mediaProvider}

              onChange={onChange}
              onSave={SAVE_ACTION}
            />}
        />
      </div>
    </EditorContext>
  );
