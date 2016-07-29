import { storiesOf } from '@kadira/storybook';
import { vdom } from 'skatejs'; // eslint-disable-line no-unused-vars
import { name } from '../package.json';
const { React } = window; // eslint-disable-line no-unused-vars

import DialogWithInput from './DialogWithInput.js';
import DialogWithButton from './DialogWithButton.js';
import DialogWithBlanket from './DialogWithBlanket.js';

storiesOf(name, module)
  .add('All dialogs together, open on click', () => (
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
  .add('Dialogs could be constrain to a parent', () => (
    <div
      style={{
        width: '60%',
        height: '350px',
        background: '#ccc',
        margin: '10px auto',
        position: 'relative',
        overflow: 'auto',
        padding: '0px',
      }}
    >
      <div
        style={{
          width: '2000px',
          height: '2000px',
          border: '1px solid red',
        }}
      >
      </div>
      <div
        id="target"
        style={{ position: 'absolute', top: '150px', left: '150px', width: '150px', height: '50px', background: '#ff0000' }} // eslint-disable-line max-len
      >
        <DialogWithButton event="click" position="top left" attachTo="scrollParent" />
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
  .add('Dialog with the blanket - obscure', () => (
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
      <DialogWithBlanket hasBlanket blanketObscure />
    </div>
  ));
