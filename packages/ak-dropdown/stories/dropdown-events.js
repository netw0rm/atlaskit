import { storiesOf } from '@kadira/storybook';
import React from 'react';

import { name } from '../package.json';
import DropdownExample from './DropdownExample';
import { handlers, removeAllTheListeners } from './_helper';

import { events } from '../src';

storiesOf(`${name} - all the available events`, module)
  .add('event \'changeBefore\', preventable', () => {
    removeAllTheListeners();
    window.addEventListener(events.changeBefore, handlers.changeBefore);

    return <DropdownExample close />;
  })
  .add('event \'changeAfter\', non-preventable', () => {
    removeAllTheListeners();
    window.addEventListener(events.changeAfter, handlers.changeAfter);

    return <DropdownExample close />;
  })
  .add('event \'openBefore\', preventable', () => {
    removeAllTheListeners();
    window.addEventListener(events.openBefore, handlers.openBefore);

    return <DropdownExample close />;
  })
  .add('event \'openAfter\', non-preventable', () => {
    removeAllTheListeners();
    window.addEventListener(events.openAfter, handlers.openAfter);

    return <DropdownExample close />;
  })
  .add('event \'closeBefore\', preventable', () => {
    removeAllTheListeners();
    window.addEventListener(events.closeBefore, handlers.closeBefore);

    return <DropdownExample close />;
  })
  .add('event \'closeAfter\', non-preventable', () => {
    removeAllTheListeners();
    window.addEventListener(events.closeAfter, handlers.closeAfter);

    return <DropdownExample close />;
  })
;
