import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import reactify from 'akutil-react';
import 'style!../src/ToolbarHyperlink/host.less';
import ToolbarComponent from '../src/Toolbar';
import ToolbarHyperlink from '../src/ToolbarHyperlink';

const Component = reactify(ToolbarHyperlink);
const Toolbar = reactify(ToolbarComponent);

storiesOf('ak-editor-ui ToolbarHyperlink', module)
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
