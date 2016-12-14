import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import InlineEdit from 'ak-inline-edit';
import TextInput from '../src';
import { name } from '../package.json';

const containerStyle = {
  padding: 20,
  backgroundColor: 'white',
  width: 500,
};

const customTextStyle = {
  fontSize: 28,
};

const createTextInput = props => (
  <TextInput
    value="Lorem ipsum dolor sit amet"
    onChange={action('onChange')}
    {...props}
  />
);

storiesOf(name, module)
  .add('with default font size', () => (
    <div style={containerStyle}>
      {createTextInput()}
    </div>
  ))
  .add('with default font size in edit mode', () => (
    <div style={containerStyle}>
      {createTextInput({ isEditing: true })}
    </div>
  ))
  .add('with auto focus', () => (
    <div style={containerStyle}>
      {createTextInput({ isEditing: true, hasAutoFocus: true })}
    </div>
  ))
  .add('with custom font size', () => (
    <div style={containerStyle}>
      {createTextInput({ style: customTextStyle })}
    </div>
  ))
  .add('with custom font size in edit mode', () => (
    <div style={containerStyle}>
      {createTextInput({ style: customTextStyle, isEditing: true })}
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
