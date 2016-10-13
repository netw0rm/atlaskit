import { defineValidator } from '../src/';

const CustomValidator = defineValidator('custom-validator-expected-value',
  (value, elem) => (value === elem.expected),
  { expected: {} }
);

const CustomValidatorWithError = defineValidator('custom-validator-error',
  () => { throw new Error('error'); }
);

export { CustomValidator, CustomValidatorWithError };

