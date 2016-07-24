import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import HyperlinkPopup from '../src/index';
const { React, ReactDOM } = window;
import { name } from '../package.json';
import 'style!./../src/host.less';
import EditorButtonComponent from 'ak-editor-button';
import IconComponent from 'ak-editor-icon';

const Component = reactify(HyperlinkPopup, {
  React,
  ReactDOM,
});

const EditorButton = reactify(EditorButtonComponent, {
  React,
  ReactDOM,
});

const Icon = reactify(IconComponent, {
  React,
  ReactDOM,
});

storiesOf(name, module)
  .add('a simple ak-hyperlink-popup', () => (
    <Component />
  ))
  .add('with one button', () => (
    <Component>
      <EditorButton><Icon glyph="unlink" fill="white" /></EditorButton>
    </Component>
  ))
  .add('with two buttons', () => (
    <Component>
      <EditorButton><Icon glyph="unlink" fill="white" /></EditorButton>
      <EditorButton><Icon glyph="open" fill="white" /></EditorButton>
    </Component>
  ))
  .add('with two buttons and a input', () => (
    <Component>
      <EditorButton><Icon glyph="unlink" fill="white" /></EditorButton>
      <EditorButton><Icon glyph="open" fill="white" /></EditorButton>
      <input />
    </Component>
  ));
