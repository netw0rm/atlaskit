import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import {
  ValidatorMinLength,
  ValidatorMaxLength,
  ValidatorRequired,
} from '../src';
import React from 'react';

const ReactValidatorMinLength = reactify(ValidatorMinLength);
const ReactValidatorMaxLength = reactify(ValidatorMaxLength);
const ReactValidatorRequired = reactify(ValidatorRequired);

storiesOf(name, module)
  .add('pre-defined validators with default content', () => (
    <div>
      <div><ReactValidatorMinLength minLength="1" /></div>
      <div><ReactValidatorMaxLength maxLength="10" /></div>
      <div><ReactValidatorRequired /></div>
    </div>
  ))
  .add('pre-defined validators with custom mesages', () => (
    <div>
      <div><ReactValidatorMinLength minLength="10">
        Custom message for min-length validator
      </ReactValidatorMinLength></div>
      <div><ReactValidatorMaxLength maxLength="10">
        Custom message for max-length validator
      </ReactValidatorMaxLength></div>
      <div><ReactValidatorRequired>
        Custom message for required validator
      </ReactValidatorRequired></div>
    </div>
  ));
