import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import React from 'react';


import TextFieldWC from './skate/textfield';
import { name } from '../package.json';

const Textfield = reactify(TextFieldWC);

const formStyle = {
  padding: '20px',
  backgroundColor: 'white',
  width: '500px',
};

storiesOf(name, module)
  .add('extending fieldBase as a webcomponent', () => (
    <div>
      <form action="" style={formStyle}>
        <h2>My Form</h2>
        <div>
          This form shows actual TextField components that are created by extending FieldBase using
          Skatejs.
        </div>
        <Textfield label="Viewmode by default" value="Webcomponents are Awesome!" />
        <Textfield label="Editmode by default" value="Webcomponents are Awesome!" editing />
      </form>
    </div>
  ));
