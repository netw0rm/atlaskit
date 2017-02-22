import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import ModalDialog from '@atlaskit/modal-dialog';
import MentionInlineEdit from './MentionInlineEdit';
import TextInlineEdit from './TextInlineEdit';
import LoopConfirmInlineEdit from './LoopConfirmInlineEdit';
import SlowInlineEdit from './SlowInlineEdit';
import exampleMentions from './example-mentions';
import AkInlineEdit, { InlineEdit } from '../src';
import { name } from '../package.json';

const containerStyle = {
  padding: 20,
  backgroundColor: 'white',
  width: 400,
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
  .add('with invalid input', () => (
    <div style={containerStyle}>
      <TextInlineEdit isInvalid />
    </div>
  ))
  .add('with lots of text', () => (
    <div style={containerStyle}>
      <TextInlineEdit initialValue="Banana banana banana banana banana banana banana banana banana banana banana" />
    </div>
  ))
  .add('with lots of text and no spaces', () => (
    <div style={containerStyle}>
      <TextInlineEdit initialValue="BananaBananaBananaBananaBananaBananaBananaBananaBananaBananaBananaBananaBananaBanana" />
    </div>
  ))
  .add('with confirmation loop', () => (
    <div style={containerStyle}>
      <LoopConfirmInlineEdit />
    </div>
  ))
  .add('with confirmation when enter is pressed', () => (
    <div style={containerStyle}>
      <TextInlineEdit
        shouldConfirmOnEnter
      />
    </div>
  ))
  .add('with confirmation cancellation', () => (
    <div style={containerStyle}>
      <TextInlineEdit
        isConfirmOnBlurDisabled
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
  ))
  .add('with confirm on blur disabled', () => (
    <div style={containerStyle}>
      <TextInlineEdit
        isConfirmOnBlurDisabled
      />
    </div>
  ))
  .add('with narrow maximum width', () => {
    const narrowContainerStyle = {
      ...containerStyle,
      width: 250,
    };

    return (
      <div style={narrowContainerStyle}>
        <TextInlineEdit
          isConfirmOnBlurDisabled
        />
      </div>
    );
  })
  .add('with spinner', () => (
    <div style={containerStyle}>
      <InlineEdit
        label="Not able to edit"
        readView="Can't touch this"
        isEditing
        isWaiting
      />
    </div>
  ))
  .add('with slow confirmation', () => (
    <div style={containerStyle}>
      <SlowInlineEdit />
    </div>
  ))
  .add('with mention list', () => (
    <div style={containerStyle}>
      <MentionInlineEdit
        label="User picker"
        mentions={exampleMentions}
      />
    </div>
  ))
  .add('inside modal dialog', () => (
    <div style={containerStyle}>
      <ModalDialog
        width="200"
        isOpen
      >
        <div style={{ height: '200px' }}>
          <TextInlineEdit
            label="field 1"
            isConfirmOnBlurDisabled
          />
        </div>
      </ModalDialog>
    </div>
  ));
