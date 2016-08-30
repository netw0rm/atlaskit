import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import WebComponent from '../src/index';
const { React, ReactDOM } = window;
import { name } from '../package.json';

const Component = reactify(WebComponent, {
  React,
  ReactDOM,
});

storiesOf(name, module)
  .add('a simple ak-lozenge', () => (
    <Component />
  ))
  .add('a simple ak-lozenge with a name', () => (
    <Component appearance="removed" />
  ))
  .add('an ak-lozenge that emits an action when it is clicked', () => (
    <Component appearance="removed" bold />
  ))
  .addMonitored('an ak-lozenge with monitored performance', () => (
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
