import { storiesOf } from '@kadira/storybook';
import React from 'react';
import reactify from 'akutil-react';
import { FieldBaseWC, FieldBaseEditableWC } from '../src';
import { name } from '../package.json';
import TextfieldWC from './skate/textfield';

const FieldBase = reactify(FieldBaseWC);
const FieldBaseEditable = reactify(FieldBaseEditableWC);
const Textfield = reactify(TextfieldWC);


storiesOf(name, module)
  .add('a simple ak-field-base', () => (
    <FieldBase label="Label for FieldBase">
      <b>Some slotted content in an ak-field-base!</b>
    </FieldBase>
  ))
  .add('a simple ak-field-base-editable', () => (
    <div>
      <FieldBaseEditable label="Label for FieldBase (not editing by default)">
        <div is slot="viewmode">
          <b>Some slotted content in an ak-field-base-editable!</b>
        </div>
        <div is slot="editmode">
          <input type="text" defaultValue="sdfsd" />
        </div>
      </FieldBaseEditable>

      <br /><br />

      <FieldBaseEditable label="Label for second FieldBase (editing by default)" editing>
        <div is slot="viewmode">
          <b>Some slotted content in an ak-field-base-editable!</b>
        </div>
        <div is slot="editmode">
          <input type="text" defaultValue="sdfsd" />
        </div>
      </FieldBaseEditable>
    </div>
  ))
  .add('a simple ak-textfield', () => (
    <div>
      <div>This is a simply implemented textfield component to show how to extent EditableBase</div>
      <br /><br />
      <Textfield label="This is a label" value="This is my value" editing />
    </div>
  ));
