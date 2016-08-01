import { storiesOf, action } from '@kadira/storybook';
import reactify from 'akutil-react';
import Blanket from '../src/index';
const { React, ReactDOM } = window;
import { name } from '../package.json';

const Component = reactify(Blanket, {
  React,
  ReactDOM,
});

function doSomethingOnClick() {
  action('the ak-blanket-click event is caught')();
}

storiesOf(name, module)
  .add('a simple ak-blanket - tinted', () => {
    window.removeEventListener('ak-blanket-click', doSomethingOnClick);
    window.addEventListener('ak-blanket-click', doSomethingOnClick);

    return (
      <div>
        this is just an empty blanket. Click on it!
        <Component clickable tinted />
      </div>
    );
  })
  .add('a transparent ak-blanket that emits an event when it is clicked', () => {
    window.removeEventListener('ak-blanket-click', doSomethingOnClick);
    window.addEventListener('ak-blanket-click', doSomethingOnClick);
    return (
      <div>
        this is just an empty blanket. Click on it!
        <Component clickable />
      </div>
    );
  });

