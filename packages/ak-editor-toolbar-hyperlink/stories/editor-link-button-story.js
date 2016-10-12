import { storiesOf, action } from '@kadira/storybook';
import reactify from 'akutil-react';
import ToolbarComponent from 'ak-editor-toolbar';
import EditorkitLinkButton from '../src/index';
import React from 'react';
import { name } from '../package.json';
import 'style!./../src/host.less';

const Component = reactify(EditorkitLinkButton);

const Toolbar = reactify(ToolbarComponent);

storiesOf(name, module)
  .add('a simple ak-editor-hyperlink-popup-button', () => (
    <Component />
  ))
  .add('ak-editor-hyperlink-popup-button in toolbar', () => (
    <Toolbar>
      <Component />
    </Toolbar>
  ))
  .add('disabled state', () => (
    <Component disabled />
  ))
  .add('emit enter key up event', () => (
    <Component
      onsave={(e) => {
        action('You just entered :)')(e.detail.value);
      }}
    />
  ))
  .add('with some margin', () => (
    <Component
      style={{ position: 'absolute', marginLeft: 200 }}
      onsave={e => action('You just entered: ')(e.detail.value)}
    />
  ));
