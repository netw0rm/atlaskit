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
  .add('some field-bases in various states', () => (
    <div>
      <form action="" style={formStyle(500)}>
        <FieldBase label="A default field-base">
          <div is slot="editmode">This content is in the Editing slot!</div>
          <div is slot="viewmode"><b>This content is in the Viewing slot!</b></div>
        </FieldBase>
        <FieldBase label="In edit mode" editing>
          <div is slot="editmode">This content is in the Editing slot!</div>
          <div is slot="viewmode"><b>This content is in the Viewing slot!</b></div>
        </FieldBase>
        <FieldBase label="In edit mode, focused" editing focused>
          <div is slot="editmode">This content is in the Editing slot!</div>
          <div is slot="viewmode"><b>This content is in the Viewing slot!</b></div>
        </FieldBase>
        <FieldBase label="In edit mode, waiting" editing waiting>
          <div is slot="editmode">This content is in the Editing slot!</div>
          <div is slot="viewmode"><b>This content is in the Viewing slot!</b></div>
        </FieldBase>
        <FieldBase label="In edit mode, waiting, focused" editing waiting focused>
          <div is slot="editmode">This content is in the Editing slot!</div>
          <div is slot="viewmode"><b>This content is in the Viewing slot!</b></div>
        </FieldBase>
        <FieldBase
          label="In edit mode, with a max-width css style"
          editing
          style={{ maxWidth: '100px' }}
        >
          <div is slot="editmode">This content is in the Editing slot!</div>
          <div is slot="viewmode"><b>This content is in the Viewing slot!</b></div>
        </FieldBase>

      </form>
    </div>
  ))
  .add('fieldbase with the labels hidden', () => {
    const noMarginStyle = {
      margin: '0px',
    };
    return (
      <div>
        <form action="" style={formStyle(500)}>
          <h2>My Label-less Form</h2>
          <FieldBase label="Label for bold FieldBase" hideLabel>
            <div is slot="editmode">I'm in editing mode but I don't have a label!</div>
            <div is slot="viewmode"><b>I'm in view mode but I don't have a label!</b></div>
          </FieldBase>
          <FieldBase label="Label for h1 FieldBase" hideLabel>
            <div is slot="editmode"><h1 style={noMarginStyle}>Edit mode, no label</h1></div>
            <div is slot="viewmode"><h1 style={noMarginStyle}>View mode, no label</h1></div>
          </FieldBase>
        </form>
      </div>
    );
  })
  .add('a simple form with text fields', () => (
    <div>
      <form action="" style={formStyle()}>
        <h2>My Form</h2>
        <Textfield label="Viewmode by default" value="Yo! If you had..." />
        <Textfield label="Editmode by default" value="One shot..." editing />
        <Textfield label="I am not inline editable" value="One opportunity..." editing />
      </form>
    </div>
  ))
  ;
