import { storiesOf, action } from '@kadira/storybook';
import reactify from 'akutil-react';
import { definition } from '../src/index';
import { define } from 'skatejs';
const { React, ReactDOM, uniqueWebComponent } = window;

const Component = reactify(uniqueWebComponent('akutil-component-template', definition, define), {
  React,
  ReactDOM,
});

storiesOf('akutil-component-template', module)
  .add('a simple akutil-component-template', () => (
    <Component />
  ))
  .add('an akutil-component-template that does X when I do Y', () => (
    <Component id="myComponent" onClick={action('clicking the WebComponent')} />
  ))
  .add('an akutil-component-template that behaves like XY', () => {
    const removeMe = (e) => e.currentTarget.parentNode.removeChild(e.currentTarget);
    return (<Component id="myComponent" onClick={removeMe} />);
  });
