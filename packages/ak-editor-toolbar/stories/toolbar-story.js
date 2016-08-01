import { storiesOf } from '@kadira/storybook';
import ToolbarComponent from '../src';
import ToolbarButtonComponent from 'ak-editor-button';
import TextFormattingComponent from 'ak-editor-toolbar-text-formatting';
import IconComponent from 'ak-editor-icon';
import { vdom } from 'skatejs'; // eslint-disable-line no-unused-vars
const { React, ReactDOM } = window;
import reactify from 'akutil-react';

const Toolbar = reactify(ToolbarComponent, { React, ReactDOM });
const ToolbarButton = reactify(ToolbarButtonComponent, { React, ReactDOM });
const Icon = reactify(IconComponent, { React, ReactDOM });
const TextFormatting = reactify(TextFormattingComponent, { React, ReactDOM });

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
