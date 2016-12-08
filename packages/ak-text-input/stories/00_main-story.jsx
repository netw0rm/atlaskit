import { storiesOf } from '@kadira/storybook';
import React from 'react';
import InlineEdit from 'ak-inline-edit';
import { TextInput } from '../src';
import { name } from '../package.json';

const containerStyle = {
  padding: 20,
  backgroundColor: 'white',
  width: 500,
};

const createTextInput = props => (
  <TextInput
    {...props}
    value="Text"
    onChange={() => {}}
  />
);

storiesOf(name, module)
  .add('with default font size', () => (
    <div style={containerStyle}>
      {createTextInput({ value: 'banana' })}
    </div>
  ))
  .add('with default font size in edit mode', () => (
    <div style={containerStyle}>
      {createTextInput({ value: 'banana', isEditing: true })}
    </div>
  ))
  .add('with custom font size', () => (
    <div style={containerStyle}>
      {createTextInput({ fontSize: 28 })}
    </div>
  ))
  .add('with custom font size in edit mode', () => (
    <div style={containerStyle}>
      {createTextInput({ fontSize: 28, isEditing: true })}
    </div>
  ))
  .add('with field base', () => (
    <div style={containerStyle}>
      <InlineEdit
        label="InlineEdit containing a TextInput"
        readView={createTextInput({ isEditing: false })}
        editView={createTextInput({ isEditing: true })}
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    </div>
  ));
