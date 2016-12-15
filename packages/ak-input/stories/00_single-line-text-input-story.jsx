import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import InlineEdit from 'ak-inline-edit';
import FieldBase from 'ak-field-base';
import SingleLineTextInput from '../src';
import { name } from '../package.json';

const containerStyle = {
  padding: 20,
  backgroundColor: 'pink',
  width: 500,
};

const customTextStyle = {
  fontSize: 28,
};

const createSingleLineTextInput = props => (
  <SingleLineTextInput
    value="Lorem ipsum dolor sit amet"
    onChange={action('onChange')}
    {...props}
  />
);

const storyName = `${name} single-line-text-input`;

storiesOf(storyName, module)
  .add('with default font size', () => (
    <div style={containerStyle}>
      {createSingleLineTextInput()}
    </div>
  ))
  .add('with default font size in edit mode', () => (
    <div style={containerStyle}>
      {createSingleLineTextInput({ isEditing: true })}
    </div>
  ))
  .add('with auto focus', () => (
    <div style={containerStyle}>
      {createSingleLineTextInput({ isEditing: true, hasAutoFocus: true })}
    </div>
  ))
  .add('with custom font size', () => (
    <div style={containerStyle}>
      {createSingleLineTextInput({ style: customTextStyle })}
    </div>
  ))
  .add('with custom font size in edit mode', () => (
    <div style={containerStyle}>
      {createSingleLineTextInput({ style: customTextStyle, isEditing: true })}
    </div>
  ))
  .add('with lots of text in read mode', () => (
    <div style={containerStyle}>
      {createSingleLineTextInput({ value: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.' })}
    </div>
  ))
  .add('with lots of text in edit mode', () => (
    <div style={containerStyle}>
      {createSingleLineTextInput({ isEditing: true, value: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.' })}
    </div>
  ))
  .add('with inline edit', () => (
    <div style={containerStyle}>
      <InlineEdit
        label="Inside an InlineEdit"
        readView={createSingleLineTextInput({
          value: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.',
          hasAutoFocus: true,
          isEditing: false,
        })}
        editView={createSingleLineTextInput({
          value: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.',
          hasAutoFocus: true,
          isEditing: true,
        })}
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    </div>
  ))
  .add('with field base', () => (
    <div style={containerStyle}>
      <FieldBase
        label="Inside a FieldBase"
      >
        {createSingleLineTextInput({
          value: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.',
          hasAutoFocus: true,
          isEditing: false,
        })}
      </FieldBase>
    </div>
  ));
