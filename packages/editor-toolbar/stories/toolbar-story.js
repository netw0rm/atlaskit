import { storiesOf } from '@kadira/storybook';
import ToolbarComponent from '../src/index';
import ToolbarButtonComponent from 'editor-button';
import TextFormattingComponent from 'editor-toolbar-text-formatting';
import IconComponent from 'editor-icon';
import { define, vdom } from 'skatejs'; // eslint-disable-line no-unused-vars
const { React, ReactDOM } = window;
import reactify from 'akutil-react';

const Toolbar = reactify(ToolbarComponent, { React, ReactDOM, });
const ToolbarButton = reactify(ToolbarButtonComponent, { React, ReactDOM, });
const Icon = reactify(IconComponent, { React, ReactDOM, });
const TextFormatting = reactify(TextFormattingComponent, { React, ReactDOM, });

storiesOf('editor-toolbar', module)
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
