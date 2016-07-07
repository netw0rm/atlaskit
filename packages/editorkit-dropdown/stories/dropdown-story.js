import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import Dropdown from '../src/index';

const React = window.React;
const ReactDOM = window.ReactDOM;

const Component = reactify(Dropdown)

storiesOf('editorkit-formatting-dropdown', module)
  .add('A default UI', () => (
    <Component />
  ));
