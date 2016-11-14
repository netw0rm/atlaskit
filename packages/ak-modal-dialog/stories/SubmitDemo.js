import React from 'react';
import reactify from 'akutil-react';
import AkButton from 'ak-button';
import AkFieldText from 'ak-field-text';
import WebComponent from '../src';

const ReactModal = reactify(WebComponent);
const ReactButton = reactify(AkButton);
const ReactFieldText = reactify(AkFieldText);

const testFormId = 'test-form';

export default function () {
  return (
    <div>
      <ReactModal open>
        <div is slot="header">Submit demo</div>
        <form
          action="https://httpbin.org/post"
          target="submit-frame"
          id={testFormId}
          method="post"
        >
          <p>Enter some text and then try submitting with enter + click.</p>
          <ReactFieldText
            name="my-name"
            label="Name"
            placeholder="Your name"
          />
          <ReactFieldText
            name="my-email"
            label="Email"
            placeholder="gbelson@hooli.com"
          />
        </form>
        <div is slot="footer">
          <ReactButton
            form={testFormId}
            appearance="primary"
          >Create issue</ReactButton>
        </div>
      </ReactModal>
      <iframe title="Form POST test" name="submit-frame" />
    </div>
  );
}
