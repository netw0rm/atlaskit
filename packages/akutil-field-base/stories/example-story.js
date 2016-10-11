import { storiesOf } from '@kadira/storybook';
import React from 'react';
import reactify from 'akutil-react';
import FieldBaseWC from '../src';
import { name } from '../package.json';
import TextfieldWC from './skate/textfield';

const FieldBase = reactify(FieldBaseWC);
const Textfield = reactify(TextfieldWC);

const formStyle = (width = 300) => ({
  padding: '20px',
  backgroundColor: 'white',
  width: `${width}px`,
});

storiesOf(name, module)
  .add('a simple ak-field-base', () => (
    <div>
      <form action="" style={formStyle(500)}>
        <div>This shows the base functionality provided by ak-field-base. It has two slots; editmode
        and viewmode. Hovering over the field whilst in view mode should show the edit icon and
        clicking should enter edit mode. Edit mode will display whatever content is in.</div>
        <FieldBase label="Label for FieldBase">
          <div is slot="editmode">This content is in the Editing slot!</div>
          <div is slot="viewmode"><b>This content is in the Viewing slot!</b></div>
        </FieldBase>
      </form>
    </div>
  ))
  .add('a simple ak-textfield', () => (
    <div>
      <div>This is a simply implemented textfield component to show how to extend EditableBase</div>
      <br /><br />
      <Textfield label="This is a label" value="This is my value" editing />
    </div>
  ))
  .add('a simple form with text fields', () => (
    <div>
      <form action="" style={formStyle()}>
        <h2>My Form</h2>
        <Textfield label="This is a label" value="Yo! If you had..." editing />
        <Textfield label="This is a label" value="This is my value" editing />
        <Textfield label="I am not inline editable" value="This is my value" editing />
      </form>
    </div>
  ));
