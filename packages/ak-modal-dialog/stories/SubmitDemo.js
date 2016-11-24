import React from 'react';
import reactify from 'akutil-react';
import Button from 'ak-button';
import AkFieldText from 'ak-field-text';
import ModalDialog from '../src';

const ReactFieldText = reactify(AkFieldText);

const testFormId = 'test-form';

export default function () {
  return (
    <div>
      <ModalDialog
        isOpen
        header={
          <span>Submit demo</span>
        }
        footer={
          <Button
            form={testFormId}
            appearance="primary"
            type="submit"
          >Create issue</Button>
        }
      >
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
      </ModalDialog>

      <iframe title="Form POST test" name="submit-frame" />
    </div>
  );
}
