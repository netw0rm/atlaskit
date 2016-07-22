import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import HyperlinkPopup from '../src/index';
const { React, ReactDOM } = window;
import { name } from '../package.json';
import 'style!./../src/host.less';
import EditorButton from 'ak-editor-button';
import Icon from 'ak-editor-icon';

const Component = reactify(HyperlinkPopup, {
  React,
  ReactDOM,
});

storiesOf(name, module)
  .add('a simple ak-hyperlink-popup', () => (
    <Component />
  ))
  .add('with one button', () => (
    <Component>
      <EditorButton><Icon glyph="unlink" /></EditorButton>
    </Component>
  ))
  .add('with two buttons', () => (
    <Component>
      <EditorButton><Icon glyph="unlink" /></EditorButton>
      <EditorButton><Icon glyph="open" /></EditorButton>
    </Component>
  ))
  .add('with two buttons and a input', () => (
    <Component>
      <EditorButton><Icon glyph="unlink" /></EditorButton>
      <EditorButton><Icon glyph="open" /></EditorButton>
      <input />
    </Component>
  ));
