import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import WebComponent from '../src';
import React from 'react';
import { name } from '../package.json';
import { ValidatorMinlength, ValidatorMaxlength } from 'ak-field-validator';
import TextField from 'ak-field-text';

const Component = reactify(WebComponent);
const ReactValidatorMinlength = reactify(ValidatorMinlength);
const ReactValidatorMaxlength = reactify(ValidatorMaxlength);
const ReactTextField = reactify(TextField);

storiesOf(name, module)
  .add('a simple ak-field', () => (
    <form style={{ width: '500px' }}>
      <Component>
        <ReactTextField is slot="input" label="My text field" />
      </Component>
    </form>
  ))
  .add('ak-field with validation for a text field', () => (
    <form style={{ width: '500px' }}>
      <Component>
        <ReactValidatorMinlength
          is slot="validator"
          minlength="5"
        >Must have at least 5 characters</ReactValidatorMinlength>
        <ReactValidatorMinlength
          is slot="validator"
          minlength="3"
        >Must have at least 3 characters</ReactValidatorMinlength>
        <ReactValidatorMaxlength
          is slot="validator"
          maxlength="10"
        >Must have 10 or less characters</ReactValidatorMaxlength>
        <ReactTextField is slot="input" label="Text field with validation" />
      </Component>
    </form>
  ));
