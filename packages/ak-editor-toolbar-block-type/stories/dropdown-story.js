import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import BlockType from '../src/index';
import ToolbarComponent from 'ak-editor-toolbar';
const { React, ReactDOM } = window;
import { vdom } from 'skatejs';
import { name } from '../package.json';

const Component = reactify(BlockType, { React, ReactDOM });
const Toolbar = reactify(ToolbarComponent, { React, ReactDOM });

storiesOf(name, module)
  .add('a simple ak-editor-toolbar-block-type', () => (
    <Component style={{ position: 'absolute', left: 100 }} />
  ))
  .add('a ak-editor-toolbar-block-type at the bottom', () => (
    <Component style={{ position: 'absolute', left: 100, top: 600 }} />
  ))
  .add('ak-editor-toolbar-block-type in toolbar', () => (
    <Toolbar>
      <Component />
    </Toolbar>
  ));
