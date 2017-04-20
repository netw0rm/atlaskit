import { storiesOf } from '@kadira/storybook';
import React from 'react';
import ModalDialog from '@atlaskit/modal-dialog';

import { name } from '../package.json';
import ButtonActivatedDialog from './examples/ButtonActivatedDialog';

const buttonsWithDialogs = ([
  <ButtonActivatedDialog content="Dialog content words words words words words words words words" position="top left">
            with position = top left
        </ButtonActivatedDialog>,
  <ButtonActivatedDialog content="Dialog content words words words words words words words words" position="top right">
            with position = top right
        </ButtonActivatedDialog>,
  <ButtonActivatedDialog content="Dialog content words words words words words words words words" position="bottom left">
            with position = bottom left
        </ButtonActivatedDialog>,
  <ButtonActivatedDialog content="Dialog content words words words words words words words words" position="bottom right">
            with position = bottom right
        </ButtonActivatedDialog>,
]);

storiesOf(name, module)
    .add('buttons with dialogs in position: relative container with margins', () => (
      <div style={{ position: 'relative', marginTop: '200px', marginLeft: '500px' }}>
        {buttonsWithDialogs}
      </div>
    ))
    .add('buttons with dialogs in position: relative container with top and left', () => (
      <div style={{ position: 'relative', top: '200px', left: '500px' }}>
        {buttonsWithDialogs}
      </div>
    ))
    .add('buttons with dialogs in position: absolute container', () => (
      <div style={{ position: 'absolute', top: '200px', left: '500px' }}>
        {buttonsWithDialogs}
      </div>
    ))
    .add('buttons with dialogs in position: fixed container', () => (
      <div style={{ position: 'fixed', top: '200px', left: '500px' }}>
        {buttonsWithDialogs}
      </div>
    ))
    .add('buttonS with dialogS in a modal', () => (
      <ModalDialog isOpen>
        {buttonsWithDialogs}
      </ModalDialog>
    ));
