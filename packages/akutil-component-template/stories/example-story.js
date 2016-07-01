import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import { definition } from '../src/index';
import { define } from 'skatejs';
const { React, ReactDOM, uniqueWebComponent } = window;

const Component = reactify(uniqueWebComponent('akutil-component-template', definition, define), {
  React,
  ReactDOM,
});

export default storiesOf('akutil-component-template', module)
  // use .addWithMonkeyTest
  // if you want to automatically run https://github.com/marmelab/gremlins.js against it
  .addWithMonkeyTest('a simple akutil-component-template', () => (
    <Component />
  ))
  // use .add for a normal story that is available in the storybook
  .add('an akutil-component-template that does X when I do Y', () => (
    <Component id="myComponent" />
  ))
  // use .addWithIntegrationTest
  // if you want to run an integration test against it
  .addWithIntegrationTest('an akutil-component-template that behaves like XY', () => {
    const removeMe = (e) => e.currentTarget.parentNode.removeChild(e.currentTarget);
    return (<Component id="myComponent" onClick={removeMe} />);
  });
