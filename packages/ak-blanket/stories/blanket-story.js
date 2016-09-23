import { storiesOf, action } from '@kadira/storybook';
import reactify from 'akutil-react';
import Blanket, { events as blanketEvents } from '../src/index';
import React from 'react';
import { name } from '../package.json';

const Component = reactify(Blanket);

function doSomethingOnClick() {
  action(`the "${blanketEvents.activate}" event is caught`)();
}

storiesOf(name, module)
  .add('a simple ak-blanket - tinted', () => {
    window.removeEventListener(blanketEvents.activate, doSomethingOnClick);
    window.addEventListener(blanketEvents.activate, doSomethingOnClick);

    return (
      <div>
        this is just an empty blanket. Click on it!
        <Component clickable tinted />
      </div>
    );
  })
  .add('a transparent ak-blanket that emits an event when it is clicked', () => {
    window.removeEventListener(blanketEvents.activate, doSomethingOnClick);
    window.addEventListener(blanketEvents.activate, doSomethingOnClick);
    return (
      <div>
        this is just an empty blanket. Click on it!
        <Component clickable />
      </div>
    );
  });
