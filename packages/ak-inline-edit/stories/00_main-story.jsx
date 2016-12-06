import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import TextInlineEdit from './components';
import { name } from '../package.json';

const containerStyle = {
  padding: 20,
  backgroundColor: 'white',
  width: 500,
};

storiesOf(name, module)
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
  ));
