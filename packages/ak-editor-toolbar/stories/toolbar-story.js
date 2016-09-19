import { storiesOf } from '@kadira/storybook';
import ToolbarComponent from '../src';
import ToolbarButtonComponent from 'ak-editor-button';
import TextFormattingComponent from 'ak-editor-toolbar-text-formatting';
import IconComponent from 'ak-editor-icon';
import React from 'react';
import reactify from 'akutil-react';

const Toolbar = reactify(ToolbarComponent);
const ToolbarButton = reactify(ToolbarButtonComponent);
const Icon = reactify(IconComponent);
const TextFormatting = reactify(TextFormattingComponent);

storiesOf('ak-editor-toolbar', module)
  .add('Empty', () => (
    <Toolbar />
  ))
  .add('Single button', () => (
    <Toolbar>
      <ToolbarButton><Icon glyph="bold" /></ToolbarButton>
    </Toolbar>
  ))
  .add('Text formatting', () => (
    <Toolbar>
      <TextFormatting />
    </Toolbar>
  ));
