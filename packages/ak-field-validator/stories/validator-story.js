/* eslint-disable jsx-a11y/href-no-hash */
import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import React from 'react';
import {
  defineValidator,
  ValidatorMinlength,
  ValidatorMaxlength,
  ValidatorRequired,
} from '../src';

const ReactValidatorMinlength = reactify(ValidatorMinlength);
const ReactValidatorMaxlength = reactify(ValidatorMaxlength);
const ReactValidatorRequired = reactify(ValidatorRequired);

// Custom validator
const ValidatorStartsWith = defineValidator('x-validator-starts-with',
  (value, elem) => value.startsWith(elem.start),
  {
    start: {
      attribute: true,
      default: '',
    },
  },
  elem => (`Field value must start with ${elem.start}`)
);
const ReactValidatorStartsWith = reactify(ValidatorStartsWith);


storiesOf(name, module)
  .add('pre-defined validators (invalid)', () => (
    <div>
      <div><ReactValidatorMinlength minlength="10" invalid>
        Custom message for <i>minlength validator</i>
      </ReactValidatorMinlength></div>
      <div><ReactValidatorMaxlength maxlength="10" invalid>
        Custom message for <u>maxlength validator</u>
      </ReactValidatorMaxlength></div>
      <div><ReactValidatorRequired invalid>
        Custom message for <b>required validator</b> and a <a href="#">link</a>
      </ReactValidatorRequired></div>
    </div>
  ))
  .add('pre-defined validators (valid))', () => (
    <div>
      <p>These validators are valid, so they should be hidden</p>
      <div><ReactValidatorMinlength minlength="10" /></div>
      <div><ReactValidatorMaxlength maxlength="10" /></div>
      <div><ReactValidatorRequired /></div>
    </div>
  ))
  .add('custom validator', () => (
    <div>
      <ReactValidatorStartsWith start="foo" invalid>
        Error message for my <b>custom validator</b>
      </ReactValidatorStartsWith>
    </div>
  ));
