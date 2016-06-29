import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import InlineDialog from '../src/index';
import { define } from 'skatejs';

const React = window.React;
const ReactDOM = window.ReactDOM;

let Dialog;
Dialog = reactify(window.uniqueWebComponent(InlineDialog, define), {
  React,
  ReactDOM,
});

storiesOf('ak-dialog', module)
  .add('Just open dialog', () => {
    let target = '#target';
    let position = 'right top';
    let open = true;
    return (<div style={{ position: 'relative', height: '500px' }}>
      <button id="target">test target div</button>
      <Dialog open={open} target={target} position={position}>Test text</Dialog>
    </div>);
  });
