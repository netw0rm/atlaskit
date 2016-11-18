import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Component from '../src';
import { name } from '../package.json';


storiesOf(name, module)
  .add('a simple akutil-component-template', () => (
    <Component />
  ))
  .add('a simple akutil-component-template with a name', () => (
    <Component name="MyComponent" />
  ))
  .add('an akutil-component-template that removes itself when being clicked', () => {
    const removeMe = e => e.currentTarget.parentNode.removeChild(e.currentTarget);
    return (<Component id="myComponent" onClick={removeMe} />);
  })
  .addMonkeyTest('a akutil-component-template with monkey testing', () => (
    // Use this to add a story that has fuzzy testing attached.
    <Component />
  ))
  .addMonitored('an akutil-component-template with monitored performance', () => (
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
