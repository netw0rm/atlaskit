import 'custom-event-polyfill';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

import { validate } from '../src/internal/validate';
import { createTestValidator } from './_helpers';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

const expect = chai.expect;


describe('ak-field-base', () => {
  describe('validation', () => {
    it('should call the validator function on each provided validator', () => {
      let numTimesValidated = 0;
      const TestValidator = createTestValidator('test-validator', () => (++numTimesValidated));
      const validators = [new TestValidator(), new TestValidator(), new TestValidator()];
      validate('', validators);

      expect(numTimesValidated).to.equal(validators.length);
    });

    it('passes validation for valid input', () => {
      const validValue = 'valid';
      const TestValidator = createTestValidator('test-validator-valid', value => (value === validValue));
      const validators = [new TestValidator()];

      const isValid = validate(validValue, validators);
      expect(isValid).to.equal(true);
    });

    it('fails validation for invalid input', () => {
      const validValue = 'valid';
      const TestValidator = createTestValidator('test-validator-valid', value => (value === validValue));
      const validators = [new TestValidator()];

      const isValid = validate(`not ${validValue}`, validators);
      expect(isValid).to.equal(false);
    });

    describe('with multiple validators', () => {
      const TestValidatorValid = createTestValidator('test-validator-valid', () => true);
      const TestValidatorInvalid = createTestValidator('test-validator-invalid', () => false);

      it('passes validation if all validators pass', () => {
        const validators = [
          new TestValidatorValid(),
          new TestValidatorValid(),
          new TestValidatorValid(),
        ];

        const isValid = validate('some value', validators);
        expect(isValid).to.equal(true);
      });

      it('fails validation if at least one validator fails', () => {
        const validators = [
          new TestValidatorValid(),
          new TestValidatorInvalid(),
          new TestValidatorValid(),
        ];

        const isValid = validate('some value', validators);
        expect(isValid).to.equal(false);
      });
    });
  });
});
