import { storiesOf, action } from '@kadira/storybook';
import reactify from 'akutil-react';
import { definition } from '../src/index';
import { define } from 'skatejs';
const { React, ReactDOM, uniqueWebComponent } = window;
import { name } from '../package.json';

const Component = reactify(uniqueWebComponent('akutil-component-template', definition, define), {
  React,
  ReactDOM,
});

storiesOf(name, module)
  .add('a simple akutil-component-template', () => (
    <Component />
  ))
  .add('an akutil-component-template that does X when I do Y', () => (
    <Component id="myComponent" onClick={action('clicking the WebComponent')} />
  ))
  .add('an akutil-component-template that behaves like XY', () => {
    const removeMe = (e) => e.currentTarget.parentNode.removeChild(e.currentTarget);
    return (<Component id="myComponent" onClick={removeMe} />);
  })
  .addMonitored('an akutil-component-template with monitored performance', () => (
    <Component />
  ), () => {
    // This is where the actual work is done - anything in here will be monitored by the stats
    // view and displayed, so this is where you want to do your animation work, etc.
    const x = Math.random() * 1000000;
    for (let i = 0; i < x; i++) {
      Math.random(); // burn some CPU cycles
    }
  });
