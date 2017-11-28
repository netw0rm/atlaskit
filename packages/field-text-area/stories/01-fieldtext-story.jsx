import { storiesOf } from '@kadira/storybook';
import Button from '@atlaskit/button';
import React from 'react';

import FieldTextArea from '../src';
import { name } from '../package.json';

const formTestUrl = '//httpbin.org/get';

const fieldRefs = {};

function generateInput(opts) {
  const props = { label: 'Example label', ...opts };
  return (
    <FieldTextArea {...props} />
  );
}

// TODO: Need tests/story for when resize is enabled

function generateFormWithInput(opts) {
  return (
    <form
      action={formTestUrl}
      method="get"
      style={{
        backgroundColor: 'white',
        padding: '40px',
        width: '500px',
      }}
    >
      <h2>Atlaskit form</h2>
      {generateInput({ name: 'value', ...opts })}
      <p>
        <Button type="submit" appearance="primary">Submit</Button>
      </p>
    </form>
  );
}

function submitTestForm(useNativeSubmitBtn) {
  const submitBtn = useNativeSubmitBtn ? <input type="submit" /> : (
    <Button type="submit" appearance="primary">Submit</Button>
  );
  return (
    <div>
      <form
        action={formTestUrl}
        method="get"
        style={{ backgroundColor: 'white', padding: '40px', width: '500px' }}
        target="myFrame"
      >
        <h2>Submit test</h2>
        <p>Note: Ensure that you are not using HTTPS for this story.</p>
        {generateInput({ label: 'First name', name: 'fname' })}
        {generateInput({ label: 'Last name', name: 'lname' })}
        {generateInput({ label: 'Full name', name: 'name' })}
        <p>
          {submitBtn}
        </p>
      </form>
      <p>The data submitted by the form will appear below:</p>
      <iframe src="" name="myFrame" style={{ width: '50%', height: '300px' }} />
    </div>
  );
}

function focus1() {
  fieldRefs.input1.focus();
}

storiesOf(name, module)
  .add('standard field-text-area', () => (
    generateFormWithInput({ placeholder: 'Oh wow, such input' })
  ))
  .add('standard field-text-area that fits container width', () => (
    generateFormWithInput({ placeholder: 'Oh wow, such input', shouldFitContainer: true })
  ))
  .add('disabled field-text-area with placeholder', () => (
    generateFormWithInput({ disabled: true, placeholder: 'Such input, very uneditable' })
  ))
  .add('compact field-text-area', () => (
    generateFormWithInput({ compact: true, placeholder: 'Oh wow, such input' })
  ))
  .add('invalid field-text-area', () => (
    <div>
      {generateFormWithInput({
        label: 'A field-text-area with `isInvalid` set will display a warning icon',
        isInvalid: true,
        value: 'Icon only',
      })}
      {generateFormWithInput({
        label: 'A field-text-area with both `isInvalid` and `invalidMessage` set will display a warning icon and a message in an inline-dialog when the icon is clicked',
        isInvalid: true,
        invalidMessage: 'The value is invalid',
        value: 'Icon and message',
      })}
    </div>
  ))
  .add('field-text-area with all options', () => (
    generateFormWithInput({
      compact: true,
      disabled: true,
      required: true,
      isInvalid: true,
      placeholder: 'This field-text-area has all the options set on it',
      invalidMessage: 'This message should not be shown',
    })
  ))
  .add('field-text-area with really long label', () => (
    generateFormWithInput({ label: 'Example label with a realllly reallly reallly reallly reallly long label that goes past the edge of the input!' }) // eslint-disable-line max-len
  ))
  .add('field-text-area with multiline label string', () => (
    generateFormWithInput({ label: 'Example\nlabel' })
  ))
  .add('field-text-area with label string containing HTML', () => (
    generateFormWithInput({ label: 'Example <marquee>label</marquee>' })
  ))
  .add('field-text-area for autofill test', () => (
    <form
      action={formTestUrl}
      method="get"
      style={{
        backgroundColor: 'white',
        padding: '40px',
      }}
    >
      <h2>Autofill test</h2>
      {generateInput({ label: 'First name', name: 'fname' })}
      {generateInput({ label: 'Last name', name: 'lname' })}
      {generateInput({ label: 'Full name', name: 'name' })}
      <p>
        <Button type="submit" appearance="primary">Submit</Button>
      </p>
    </form>
  ))
  .add('field-text-area submission test (native submit button)', () => (
    submitTestForm(true)
  ))
  .add('field-text-area submission test (ak-button submit button)', () => (
    submitTestForm(false)
  ))
  .add('with autofocus', () => (
    generateFormWithInput({ autoFocus: true })
  ))
  .add('with maxLength', () => (
    generateFormWithInput({ maxLength: 5 })
  ))
  .add('with a set minimum number of rows', () => (
    generateFormWithInput({ minimumRows: 7 })
  ))
  .add('with spellcheck', () => (
    <form
      style={{
        backgroundColor: 'white',
        padding: '40px',
        width: '500px',
      }}
    >
      <h2>Atlaskit form</h2>
      {generateInput({
        isSpellCheckEnabled: true,
        autoFocus: true,
        label: 'Spellcheck enabled',
        value: 'This is mispelled' })}
      {generateInput({
        isSpellCheckEnabled: false,
        label: 'Spellcheck disabled',
        value: 'This is mispelled' }
        )}
    </form>
  ))
  .add('field-text-area with buttons that choose focus', () => (
    <form
      action={formTestUrl}
      method="get"
      style={{
        backgroundColor: 'white',
        padding: '40px',
      }}
    >
      <h2>Focus Test</h2>
      <FieldTextArea label="First Field" name="1" ref={(field1Ref) => { fieldRefs.input1 = field1Ref; }} />
      <FieldTextArea label="Second Field" name="2" ref={(field2Ref) => { fieldRefs.input2 = field2Ref; }} />
      <FieldTextArea label="Third Field" name="3" ref={(field3Ref) => { fieldRefs.input3 = field3Ref; }} />
      <p>
        <Button appearance="primary" onClick={focus1}>Focus First Field</Button>
      </p>
    </form>
  ))
  .add('field-text-area set to readonly', () => (
    generateFormWithInput({ value: 'This input cannot be edited', isReadOnly: true })
  ));
