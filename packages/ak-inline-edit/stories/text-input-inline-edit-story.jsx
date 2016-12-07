import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import TextInlineEdit from './TextInlineEdit';
import AkInlineEdit from '../src';
import { name } from '../package.json';

const containerStyle = {
  padding: 20,
  backgroundColor: 'white',
  width: 500,
};

storiesOf(`${name} (text input)`, module)
  .add('with label', () => (
    <div style={containerStyle}>
      <TextInlineEdit />
    </div>
  ))
  .add('with label hidden', () => (
    <div style={containerStyle}>
      <TextInlineEdit isLabelHidden />
    </div>
  ))
  .add('with confirmation cancellation', () => (
    <div style={containerStyle}>
      <TextInlineEdit
        onConfirm={(cancelConfirmation) => {
          action('Cancelling confirmation')();
          cancelConfirmation();
        }}
      />
    </div>
  ))
  .add('with no edit view', () => (
    <div style={containerStyle}>
      <AkInlineEdit
        label="Read-only"
        readView="Can't touch this"
      />
    </div>
  ))
  .add('with no edit view and label hidden', () => (
    <div style={containerStyle}>
      <AkInlineEdit
        label="Read-only"
        readView="Can't touch this"
        isLabelHidden
      />
    </div>
  ));
