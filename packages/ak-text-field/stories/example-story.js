import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import WebComponent from '../src/index';
import ButtonWC from 'ak-button';
import React from 'react';
import { name } from '../package.json';

const ReactField = reactify(WebComponent);
const ReactButton = reactify(ButtonWC);
const formTestUrl = 'http://www.w3schools.com/html/action_page.php';

function generateInput(opts) {
  return (
    <ReactField
      label={opts.label || 'Example label'}
      compact={opts.compact}
      required={opts.required}
    >
      <input
        type={opts.type || 'text'}
        id={opts.id}
        name={opts.id}
        disabled={opts.disabled}
        placeholder={opts.placeholder}
      />
    </ReactField>
  );
}

function generateFormWithInput(opts) {
  return (
    <form
      action={formTestUrl}
      method="post"
      style={{
        'background-color': 'white',
        padding: '40px',
        width: '500px',
      }}
    >
      <h2>AtlasKit form</h2>
      {generateInput(opts)}
      <p>
        <ReactButton type="submit" appearance="primary">Submit</ReactButton>
      </p>
    </form>
  );
}

function submitTestForm(useNativeSubmitBtn) {
  const submitBtn = useNativeSubmitBtn ?
    <input type="submit" /> :
    <ReactButton type="submit" appearance="primary">Submit</ReactButton>;
  return (
    <div>
      <form
        action={formTestUrl}
        method="get"
        style={{ 'background-color': 'white', padding: '40px', width: '500px' }}
        target="myFrame"
      >
        <h2>Submit test</h2>
        <p>Note: Ensure that you are not using HTTPS for this story.</p>
        {generateInput({ label: 'First name', id: 'fname' })}
        {generateInput({ label: 'Last name', id: 'lname' })}
        {generateInput({ type: 'email', label: 'Email', id: 'email' })}
        {generateInput({ label: 'Full name', id: 'name' })}
        <p>
          {submitBtn}
        </p>
      </form>
      <iframe src="" name="myFrame" style={{ width: '50%', height: '300px' }}></iframe>
    </div>
  );
}

storiesOf(name, module)
  .add('standard ak-text-field', () => (
    generateFormWithInput({ placeholder: 'Oh wow, such input' })
  ))
  .add('standard ak-text-field [type=email]', () => (
    generateFormWithInput({ type: 'email', placeholder: 'Enter your email' })
  ))
  .add('required password ak-text-field', () => (
    generateFormWithInput({ type: 'password', required: true })
  ))
  .add('disabled ak-text-field with placeholder', () => (
    generateFormWithInput({ disabled: true, placeholder: 'Such input, very uneditable' })
  ))
  .add('compact ak-text-field', () => (
    generateFormWithInput({ compact: true, placeholder: 'Oh wow, such input' })
  ))
  .add('ak-text-field with all options', () => (
    generateFormWithInput({
      compact: true,
      disabled: true,
      required: true,
      placeholder: 'Such input, very uneditable',
    })
  ))
  .add('ak-text-field with really long label', () => (
    generateFormWithInput({ label: 'Example label with a realllly reallly reallly reallly reallly long label that goes past the edge of the input!' }) // eslint-disable-line max-len
  ))
  .add('ak-text-field with multiline label string', () => (
    generateFormWithInput({ label: `Example\nlabel` })
  ))
  .add('ak-text-field with label string containing HTML', () => (
    generateFormWithInput({ label: 'Example <marquee>label</marquee>' })
  ))
  .add('ak-text-fields for autofill test', () => (
    <form
      action={formTestUrl}
      method="post"
      style={{
        'background-color': 'white',
        padding: '40px',
      }}
    >
      <h2>Autofill test</h2>
      {generateInput({ label: 'First name', id: 'fname' })}
      {generateInput({ label: 'Last name', id: 'lname' })}
      {generateInput({ type: 'email', label: 'Email', id: 'email' })}
      {generateInput({ label: 'Full name', id: 'name' })}
      <p>
        <ReactButton type="submit" appearance="primary">Submit</ReactButton>
      </p>
    </form>
  ))
  .add('ak-text-fields submission test (native submit button)', () => (
    submitTestForm(true)
  ))
  .add('ak-text-fields submission test (ak-button submit button)', () => (
    submitTestForm(false)
  ));
