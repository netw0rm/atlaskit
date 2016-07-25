import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import ToolbarComponent from 'ak-editor-toolbar';
import EditorkitLinkButton from '../src/index';
const { React, ReactDOM } = window;
import { name } from '../package.json';
import 'style!./../src/host.less';

const Component = reactify(EditorkitLinkButton, {
  React,
  ReactDOM,
});

const Toolbar = reactify(ToolbarComponent, {
  React,
  ReactDOM,
});

storiesOf(name, module)
  .add('a simple ak-editor-hyperlink-popup-button', () => (
    <Component />
  ))
  .add('ak-editor-toolbar-block-type in toolbar', () => (
    <Toolbar>
      <Component />
    </Toolbar>
  ));
