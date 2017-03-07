import { storiesOf } from '@kadira/storybook';
import Button from '@atlaskit/button';
import React from 'react';

import AkFieldText from '../src';
import { name } from '../package.json';

const formTestUrl = '//httpbin.org/get';

function generateInput(opts) {
  const props = { label: 'Example label', ...opts };
  return (
    <AkFieldText {...props} />
  );
}

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
      <h2>AtlasKit form</h2>
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
        {generateInput({ type: 'email', label: 'Email', name: 'email' })}
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

storiesOf(name, module)
  .add('standard field-text', () => (
    generateFormWithInput({ placeholder: 'Oh wow, such input' })
  ))
  .add('standard field-text that fits container width', () => (
    generateFormWithInput({ placeholder: 'Oh wow, such input', shouldFitContainer: true })
  ))
  .add('standard field-text [type=email]', () => (
    generateFormWithInput({ type: 'email', placeholder: 'Enter your email' })
  ))
  .add('required password field-text', () => (
    generateFormWithInput({ type: 'password', required: true })
  ))
  .add('disabled field-text with placeholder', () => (
    generateFormWithInput({ disabled: true, placeholder: 'Such input, very uneditable' })
  ))
  .add('compact field-text', () => (
    generateFormWithInput({ compact: true, placeholder: 'Oh wow, such input' })
  ))
  .add('invalid field-text', () => (
    <div>
      {generateFormWithInput({
        label: 'A field-text with `isInvalid` set will display a warning icon',
        isInvalid: true,
        value: 'Icon only',
      })}
      {generateFormWithInput({
        label: 'A field-text with both `isInvalid` and `invalidMessage` set will display a warning icon and a message in an inline-dialog when the icon is clicked',
        isInvalid: true,
        invalidMessage: 'The value is invalid',
        value: 'Icon and message',
      })}
    </div>
  ))
  .add('field-text with all options', () => (
    generateFormWithInput({
      compact: true,
      disabled: true,
      required: true,
      isInvalid: true,
      placeholder: 'This field-text has all the options set on it',
      invalidMessage: 'This message should not be shown',
    })
  ))
  .add('field-text with really long label', () => (
    generateFormWithInput({ label: 'Example label with a realllly reallly reallly reallly reallly long label that goes past the edge of the input!' }) // eslint-disable-line max-len
  ))
  .add('field-text with multiline label string', () => (
    generateFormWithInput({ label: 'Example\nlabel' })
  ))
  .add('field-text with label string containing HTML', () => (
    generateFormWithInput({ label: 'Example <marquee>label</marquee>' })
  ))
  .add('field-text for autofill test', () => (
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
      {generateInput({ type: 'email', label: 'Email', name: 'email' })}
      {generateInput({ label: 'Full name', name: 'name' })}
      <p>
        <Button type="submit" appearance="primary">Submit</Button>
      </p>
    </form>
  ))
  .add('field-text submission test (native submit button)', () => (
    submitTestForm(true)
  ))
  .add('field-text submission test (ak-button submit button)', () => (
    submitTestForm(false)
  ))
  .add('ak-field-text with autofocus', () => (
    generateFormWithInput({ autoFocus: true })
  ));
