import { action, storiesOf } from '@kadira/storybook';
import * as React from 'react';

import Editor from './../src/editor';
import ToolsDrawer from './ToolsDrawer';
import { name, version } from '../package.json';
import { storyDecorator } from '../src/test-helper';

const SAVE_ACTION = () => action('Save')();
const analyticsHandler = (actionName, props) => action(actionName)(props);

storiesOf(name, module)
  .addDecorator(storyDecorator(version))
  .add('Message Editor', () =>
    <ToolsDrawer
      // tslint:disable-next-line:jsx-no-lambda
      renderEditor={({mentionProvider, emojiProvider, mediaProvider, onChange}) =>
        <Editor
          appearance="message"
          analyticsHandler={analyticsHandler}

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
    />)
  .add('Message Editor with Max Length', () =>
    <Editor
      appearance="message"
      saveOnEnter={true}
      maxContentSize={10}
    />);
