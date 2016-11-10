import { storiesOf } from '@kadira/storybook';
import React from 'react';
import reactify from 'akutil-react';
import { ValidatorMinlength, ValidatorMaxlength, ValidatorRequired } from 'ak-field-validator';
import ButtonWC from 'ak-button';

import { name } from '../package.json';
import { InputFieldBase } from './shared-components';


const ReactValidatorMin = reactify(ValidatorMinlength);
const ReactValidatorMax = reactify(ValidatorMaxlength);
const ReactValidatorReq = reactify(ValidatorRequired);
const Button = reactify(ButtonWC);

const formStyle = {
  padding: '20px',
  backgroundColor: 'white',
  width: '500px',
};

storiesOf(name, module)
  .add('fieldbase with single validator', () => (
    <div>
      <form action="" style={formStyle}>
        <div>
          <p>This ak-field-base is required.</p>
        </div>
        <InputFieldBase
          label="Slotted input"
          text=""
        >
          <ReactValidatorReq slot="validator-slot">
            This field is required
          </ReactValidatorReq>
        </InputFieldBase>
      </form>
    </div>
  ))
  .add('fieldbase with all default validators', () => (
    <div>
      <form action="" style={formStyle}>
        <div>
          <p>This ak-field-base is required and must be 3-5 characters long.</p>
        </div>
        <InputFieldBase
          label="Slotted input"
          text=""
          required
        >
          <ReactValidatorReq slot="validator-slot">
            This field is required
          </ReactValidatorReq>
          <ReactValidatorMin minlength="3" slot="validator-slot">
            Must have at least 3 characters
          </ReactValidatorMin>
          <ReactValidatorMax maxlength="5" slot="validator-slot">
            Must have at most 5 characters
          </ReactValidatorMax>
        </InputFieldBase>
      </form>
    </div>
  ))
  .add('fieldbase with validation on input', () => (
    <div>
      <form action="" style={formStyle}>
        <div>
          <p>This must be at least 3 characters long.</p>
          <p>This field performs validation on input.</p>
        </div>
        <InputFieldBase
          label="Slotted input"
          text=""
          required
          validateOn={['input']}
        >
          <ReactValidatorMin minlength="3" slot="validator-slot">
            Must have at least 3 characters
          </ReactValidatorMin>
        </InputFieldBase>
      </form>
    </div>
  ))
  .add('fieldbase with validation on click', () => (
    <div>
      <form action="" style={formStyle}>
        <div>
          <p>This must be at least 3 characters long.</p>
          <p>This field performs validation when clicked.</p>
        </div>
        <InputFieldBase
          label="Slotted input"
          text=""
          required
          validateOn={['click']}
        >
          <ReactValidatorMin minlength="3" slot="validator-slot">
            Must have at least 3 characters
          </ReactValidatorMin>
        </InputFieldBase>
      </form>
    </div>
  ))
  .add('fieldbase with validation on custom event', () => (
    <div>
      <form action="" style={formStyle}>
        <div>
          <p>This input must be at least 3 characters long.</p>
          <p>Click the Validate button to validate the input.</p>
        </div>
        <InputFieldBase
          id="field-base"
          label="Slotted input"
          text=""
          required
          validateOn={'my-custom-event'}
        >
          <ReactValidatorMin minlength="3" slot="validator-slot">
            Must have at least 3 characters
          </ReactValidatorMin>
        </InputFieldBase>
      </form>
      <div>
        <Button
          appearance="primary"
          type="button"
          onClick={() => {
            const input = document.getElementById('field-base').querySelector('input');
            const customEvent = new CustomEvent('my-custom-event', { bubbles: true });
            input.dispatchEvent(customEvent);
          }}
        >Validate</Button>
      </div>
    </div>
  ));
