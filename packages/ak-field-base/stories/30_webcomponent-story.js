import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import TextFieldWC from './skate/textfield';
import React from 'react';
import { name } from '../package.json';

const Textfield = reactify(TextFieldWC);

const formStyle = (width = 300) => ({
  padding: '20px',
  backgroundColor: 'white',
  width: `${width}px`,
});

const story = () => (
  <div>
    <form action="" style={formStyle(400)}>
      <h2>My Form</h2>
      <div>
        This form shows actual TextField components that are created by extending FieldBase using
        Skatejs.
      </div>
      <Textfield label="Viewmode by default" value="Webcomponents are Awesome!" />
      <Textfield label="Editmode by default" value="Webcomponents are Awesome!" editing />
    </form>
  </div>
);

storiesOf(name, module)
  .add('extending fieldBase as a webcomponent', story)
;
