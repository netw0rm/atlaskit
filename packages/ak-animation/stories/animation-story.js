import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import { definition } from '../src/index';
import { define } from 'skatejs';

const { React, ReactDOM, uniqueWebComponent } = window;

const Component = reactify(uniqueWebComponent('x-hello', definition, define), {
  React,
  ReactDOM,
});

export default storiesOf('atlas-animation', module)
  .add('a simple atlas-animation', () => (
    <Component name="Blah"><span>Hello, Blah!!</span></Component>
  ));
