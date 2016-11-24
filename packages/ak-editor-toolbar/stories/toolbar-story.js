import { storiesOf } from '@kadira/storybook';
import ToolbarButtonComponent from 'ak-editor-button';
import TextFormattingComponent from 'ak-editor-toolbar-text-formatting';
import BoldEditorIcon from 'ak-icon/glyph/editor/bold';
import React from 'react';
import reactify from 'akutil-react';

import ToolbarComponent from '../src';

const Toolbar = reactify(ToolbarComponent);
const ToolbarButton = reactify(ToolbarButtonComponent);
const BoldIcon = reactify(BoldEditorIcon);
const TextFormatting = reactify(TextFormattingComponent);

storiesOf('ak-editor-toolbar', module)
  .add('Empty', () => (
    <Toolbar />
  ))
  .add('Single button', () => (
    <Toolbar>
      <ToolbarButton><BoldIcon /></ToolbarButton>
    </Toolbar>
  ))
  .add('Text formatting', () => (
    <Toolbar>
      <TextFormatting />
    </Toolbar>
  ));
