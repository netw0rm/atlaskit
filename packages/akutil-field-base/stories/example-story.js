import { storiesOf } from '@kadira/storybook';
import React from 'react';
import reactify from 'akutil-react';
import FieldBaseWC from '../src';
import { name } from '../package.json';
import TextfieldWC from './skate/textfield';

const FieldBase = reactify(FieldBaseWC);
const Textfield = reactify(TextfieldWC);


storiesOf(name, module)
  .add('a simple ak-field-base', () => (
    <FieldBase label="Label for FieldBase">
      <div is slot="editmode">This content is in the Editing slot!</div>
      <div is slot="viewmode"><b>This content is in the Viewing slot!</b></div>
    </FieldBase>
  ))
  .add('a simple ak-textfield', () => (
    <div>
      <div>This is a simply implemented textfield component to show how to extent EditableBase</div>
      <br /><br />
      <Textfield label="This is a label" value="This is my value" editing />
    </div>
  ))
  .add('a simple form with text fields', () => {
    const formStyle = {
      padding: '20px',
      backgroundColor: 'white',
      width: '300px',
    };

    return (
      <div>
        <form action="" style={formStyle}>
          <h2>My Form</h2>
          <Textfield label="This is a label" value="This is my value" editing />
          <Textfield label="This is a label" value="This is my value" editing />
          <Textfield label="This is a label" value="This is my value" editing />
        </form>
      </div>
    );
  });
