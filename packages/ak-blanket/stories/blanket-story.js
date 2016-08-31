import { storiesOf, action } from '@kadira/storybook';
import reactify from 'akutil-react';
import Blanket, { EVENTS } from '../src/index';
const { React, ReactDOM } = window;
import { name } from '../package.json';

const Component = reactify(Blanket, {
  React,
  ReactDOM,
});

function doSomethingOnClick() {
  action(`the "${EVENTS.ACTIVATE}" event is caught`)();
}

storiesOf(name, module)
  .add('a simple ak-blanket - tinted', () => {
    window.removeEventListener(EVENTS.ACTIVATE, doSomethingOnClick);
    window.addEventListener(EVENTS.ACTIVATE, doSomethingOnClick);

    return (
      <div>
        this is just an empty blanket. Click on it!
        <Component clickable tinted />
      </div>
    );
  })
  .add('a transparent ak-blanket that emits an event when it is clicked', () => {
    window.removeEventListener(EVENTS.ACTIVATE, doSomethingOnClick);
    window.addEventListener(EVENTS.ACTIVATE, doSomethingOnClick);
    return (
      <div>
        this is just an empty blanket. Click on it!
        <Component clickable />
      </div>
    );
  });
