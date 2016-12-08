import { storiesOf } from '@kadira/storybook';
import React from 'react';
import reactify from 'akutil-react';

import CounterWC from './skate/counter';
import AppWC from './skate/app';
import { name } from '../package.json';

const App = reactify(AppWC);
const Counter = reactify(CounterWC);

storiesOf(name, module)
  .add('an example of using ak-component-base', () => (
    <div>
      <div>
        <p>This is an example of how to use the ak-component-base component</p>
        <p>
          Here, we have defined a Counter component that keeps track of two counts, one going up
          every milisecond and the other, every second. Counter extends the ak-component-base
          component. We have also defined an App component which simply wraps the Counter component
          and, using the override prop, is able to completely control the state of one of the counts
          (you will notice it counts up by two every 500 miliseconds).
        </p>
        <p>This allows a consumer to be able to turn any “smart” component into a “dumb” component
        by selectively choosing which props it wants to take control of.</p>
      </div>
      <h3>Regular Counter</h3>
      <Counter />
      <h3>Counter controlled by App</h3>
      <App />
    </div>
  ));
