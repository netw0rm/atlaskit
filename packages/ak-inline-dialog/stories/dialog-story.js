import reactify from 'akutil-react';
import AkInlineDialog from '../src/index';
import { storiesOf } from '@kadira/storybook';
import { name } from '../package.json';

const { React, ReactDOM } = window;

const Dialog = reactify(AkInlineDialog, {
  React,
  ReactDOM,
});

import DialogWithInput from './DialogWithInput.js';
import DialogWithButton from './DialogWithButton.js';
import DialogWithBlanket from './DialogWithBlanket.js';
import ToggleDemo from './DialogRemoveDom.js';

storiesOf(name, module)
  .add('All dialogs together, open on click', () => (
    <div
      style={{
        width: '320px',
        height: '200px',
        position: 'relative',
        top: '100px',
        left: '300px',
      }}
    >
      <div
        id="target"
        style={{
          width: '320px',
          height: '200px',
          background: '#ccc',
          margin: '0',
          position: 'relative',
          padding: '0px',
        }}
      ></div>
      <DialogWithButton
        event="click"
        position="top left"
        style={{ position: 'absolute', top: 0, left: '50px', width: '50px', marginLeft: '0px' }}
      />
      <DialogWithButton
        event="click"
        position="top center"
        style={{ position: 'absolute', top: 0, left: '50%', width: '50px', marginLeft: '-25px' }}
      />
      <DialogWithButton
        event="click"
        position="top right"
        style={{ position: 'absolute', top: 0, left: '100%', width: '50px', marginLeft: '-100px' }}
      />
      <DialogWithButton
        event="click"
        position="right top"
        style={{ position: 'absolute', top: 0, left: '100%', width: '50px', marginLeft: '-50px', marginTop: '30px' }} // eslint-disable-line max-len
      />
      <DialogWithButton
        event="click"
        position="right middle"
        style={{ position: 'absolute', top: '50%', left: '100%', width: '50px', marginTop: '-15px', marginLeft: '-50px' }} // eslint-disable-line max-len
      />
      <DialogWithButton
        event="click"
        position="right bottom"
        style={{ position: 'absolute', top: '100%', left: '100%', width: '50px', marginTop: '-60px', marginLeft: '-50px' }} // eslint-disable-line max-len
      />
      <DialogWithButton
        event="click"
        position="bottom left"
        style={{ position: 'absolute', top: '100%', left: 0, width: '50px', marginLeft: '50px', marginTop: '-32px' }} // eslint-disable-line max-len
      />
      <DialogWithButton
        event="click"
        position="bottom center"
        style={{ position: 'absolute', top: '100%', left: '50%', width: '50px', marginLeft: '-25px', marginTop: '-32px' }} // eslint-disable-line max-len
      />
      <DialogWithButton
        event="click"
        position="bottom right"
        style={{ position: 'absolute', top: '100%', left: '100%', width: '50px', marginLeft: '-100px', marginTop: '-32px' }} // eslint-disable-line max-len
      />
      <DialogWithButton
        event="click"
        position="left top"
        style={{ position: 'absolute', top: '30px', left: 0, width: '50px', marginLeft: '0px' }}
      />
      <DialogWithButton
        event="click"
        position="left middle"
        style={{ position: 'absolute', top: '50%', left: 0, width: '50px', marginTop: '-15px' }}
      />
      <DialogWithButton
        event="click"
        position="left bottom"
        style={{ position: 'absolute', top: '100%', left: 0, width: '50px', marginTop: '-60px' }}
      />
    </div>
  ))
  .add('All dialogs together, open on hover', () => (
    <div
      id="target"
      style={{
        width: '320px',
        height: '200px',
        background: '#ccc',
        margin: '100px auto',
        position: 'relative',
        padding: '0px' }}
    >
      <DialogWithButton
        event="hover"
        position="top left"
        style={{ position: 'absolute', top: 0, left: '50px', width: '50px', marginLeft: '0px' }}
      />
      <DialogWithButton
        event="hover"
        position="top center"
        style={{ position: 'absolute', top: 0, left: '50%', width: '50px', marginLeft: '-25px' }}
      />
      <DialogWithButton
        event="hover"
        position="top right"
        style={{ position: 'absolute', top: 0, left: '100%', width: '50px', marginLeft: '-100px' }}
      />
      <DialogWithButton
        event="hover"
        position="right top"
        style={{ position: 'absolute', top: 0, left: '100%', width: '50px', marginLeft: '-50px', marginTop: '30px' }} // eslint-disable-line max-len
      />
      <DialogWithButton
        event="hover"
        position="right middle"
        style={{ position: 'absolute', top: '50%', left: '100%', width: '50px', marginTop: '-15px', marginLeft: '-50px' }} // eslint-disable-line max-len
      />
      <DialogWithButton
        event="hover"
        position="right bottom"
        style={{ position: 'absolute', top: '100%', left: '100%', width: '50px', marginTop: '-60px', marginLeft: '-50px' }} // eslint-disable-line max-len
      />
      <DialogWithButton
        event="hover"
        position="bottom left"
        style={{ position: 'absolute', top: '100%', left: 0, width: '50px', marginLeft: '50px', marginTop: '-32px' }} // eslint-disable-line max-len
      />
      <DialogWithButton
        event="hover"
        position="bottom center"
        style={{ position: 'absolute', top: '100%', left: '50%', width: '50px', marginLeft: '-25px', marginTop: '-32px' }} // eslint-disable-line max-len
      />
      <DialogWithButton
        event="hover"
        position="bottom right"
        style={{ position: 'absolute', top: '100%', left: '100%', width: '50px', marginLeft: '-100px', marginTop: '-32px' }} // eslint-disable-line max-len
      />
      <DialogWithButton
        event="hover"
        position="left top"
        style={{ position: 'absolute', top: '30px', left: 0, width: '50px', marginLeft: '0px' }}
      />
      <DialogWithButton
        event="hover"
        position="left middle"
        style={{ position: 'absolute', top: '50%', left: 0, width: '50px', marginTop: '-15px' }}
      />
      <DialogWithButton
        event="hover"
        position="left bottom"
        style={{ position: 'absolute', top: '100%', left: 0, width: '50px', marginTop: '-60px' }}
      />
    </div>
  ))
  .add('Dialogs can be constrain to a parent (flip)', () => (
    <div
      id="container"
      style={{ margin: '0 auto', width: '300px', height: '300px', overflow: 'scroll', flex: '1', border: '1px solid red' }} // eslint-disable-line max-len
    >
      <div
        style={{ height: '200%', width: '200%', display: 'flex', alignContent: 'center', alignItems: 'center' }} // eslint-disable-line max-len
      >
        <div
          id="target"
          style={{ background: '#ff0000', width: '100px', height: '100px', border: '1px solid red' }} // eslint-disable-line max-len
        ></div>
        <Dialog
          open
          enableFlip
          hasBlanket={false}
          target="#target"
          position="bottom left"
          boundariesElement="#container"
        >bottom left positioning</Dialog>
      </div>
    </div>
  ))
  .add('Dialog is showing on input onchange', () => (
    <DialogWithInput />
  ))
  .add('Dialog with the blanket - transparent', () => (
    <div
      id="target"
      style={{
        width: '320px',
        height: '200px',
        background: '#ccc',
        margin: '100px auto',
        position: 'relative',
        padding: '0px',
      }}
    >
      <DialogWithBlanket hasBlanket />
    </div>
  ))
  .add('Dialog with the blanket - tinted', () => (
    <div
      id="target"
      style={{
        width: '320px',
        height: '200px',
        background: '#ccc',
        margin: '100px auto',
        position: 'relative',
        padding: '0px',
      }}
    >
      <DialogWithBlanket hasBlanket blanketTinted />
    </div>
  ))
  .add('Toggle add/remove from dom', () => (<ToggleDemo />));
