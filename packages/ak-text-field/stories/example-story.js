import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import WebComponent from '../src/index';
import ButtonWC from 'ak-button';
import React from 'react';
import { name } from '../package.json';
// import styles from 'style!./../src/host.less';

const ReactField = reactify(WebComponent);
const ReactButton = reactify(ButtonWC);

function generateInput(opts) {
  return (
    <ReactField label={opts.label || 'Example label'}>
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
    <form action="http://www.w3schools.com/html/action_page.php" method="post" style={{ 'background-color': 'white', padding: '40px' }}>
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
        action="http://www.w3schools.com/html/action_page.php"
        method="get"
        style={{ 'background-color': 'white', padding: '40px' }}
        target="myFrame"
      >
        <h2>Submit test</h2>
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
    generateFormWithInput({})
  ))
  .add('standard ak-text-field [type=email]', () => (
    generateFormWithInput({ type: 'email' })
  ))
  .add('disabled ak-text-field', () => (
    generateFormWithInput({ disabled: true })
  ))
  .add('ak-text-field with placeholder', () => (
    generateFormWithInput({ placeholder: 'Oh wow, such input' })
  ))
  .add('disabled ak-text-field with placeholder', () => (
    generateFormWithInput({ disabled: true, placeholder: 'Such input, very uneditable' })
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
    <form action="http://www.w3schools.com/html/action_page.php" method="post" style={{ 'background-color': 'white', padding: '40px' }}>
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
  ))
  .add('ak-text-field that responds to parent resize', () => (
    <div>
      <ol className="ruler">
        <li>0</li>
        <li>100</li>
        <li>200</li>
        <li>300</li>
        <li>400</li>
        <li>500</li>
        <li>600</li>
      </ol>
      <div className="resizing-parent">
        {generateInput({ label: 'First name', id: 'fname' })}
      </div>
      <style>{`
        .ruler {
          margin: 0;
          padding: 0;
          list-style-type:none;
        }

        .ruler li {
          float: left;
          width: 100px;
          border-bottom: 1px solid #333;
        }

        .resizing-parent {
          clear: both;
          width: 700px;
          overflow: hidden;
          background-color: white;
          border-right: 1px dashed #333;
          animation: growshrink 3s ease;
          animation-iteration-count: infinite;
          padding-bottom: 1em;
        }

        @keyframes growshrink {
          0% { width: 700px; }
          50% { width: 0; }
          100% { width: 700px; }
        }
      `}</style>
    </div>
  ));
