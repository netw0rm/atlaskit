import { storiesOf } from '@kadira/storybook';
import React from 'react';
import reactify from 'akutil-react';
import ToolbarComponent from 'ak-editor-toolbar';

import BlockType from '../src';
import { name } from '../package.json';


const Component = reactify(BlockType);
const Toolbar = reactify(ToolbarComponent);

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
