import { storiesOf, action } from '@kadira/storybook';
import React from 'react';

import Component from '../src';
import { name } from '../package.json';

storiesOf(name, module)
  .add('simple akmedia-domain', () => (
    <Component />
  ))
  .add('with a prop set', () => (
    <Component audienceName="MyComponent" />
  ))
  .add('with a handler prop', () => (
    <Component onTextClicked={action('Clicked!')} />
  ))
  .addMonitored('with monitored performance', () => (
    // Use this to add a story that has a little fps/memory gauge that allows you
    // to monitor performance whilst developing
    <Component />
  ), () => {
    // This is where the actual work is done - anything in here will be monitored by the stats
    // view and displayed, so this is where you want to do your animation work, etc.
    const x = Math.random() * 1000000;
    for (let i = 0; i < x; i++) {
      Math.random(); // burn some CPU cycles
    }
  });
