import { storiesOf } from '@kadira/storybook';
import * as React from 'react';

import Editor from './../src/editor';
import ToolsDrawer from './ToolsDrawer';
import { name } from '../package.json';

storiesOf(name, module)
  .add('Tray Editor', () =>
    <ToolsDrawer
      // tslint:disable-next-line:jsx-no-lambda
      renderEditor={({mentionProvider, emojiProvider, onChange}) =>
        <Editor
          appearance="tray"
          mentionProvider={mentionProvider}
          emojiProvider={emojiProvider}
          onChange={onChange}
          allowTextFormatting={true}
        />}
    />);
