import 'custom-event-polyfill';
import { waitUntil, getShadowRoot } from 'akutil-common-test';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import { props } from 'skatejs';

import FieldBase from '../src';
import { validate } from '../src/internal/validate';
import { defineTestValidator, insertValidator, insertLightDomInput } from './_helpers';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

const expect = chai.expect;

function setupComponent() {
  const component = new FieldBase();
  const componentHasShadowRoot = () => getShadowRoot(component);

  document.body.appendChild(component);

  return waitUntil(componentHasShadowRoot).then(() => component);
}

function tearDownComponent(component) {
  document.body.removeChild(component);
}

describe('ak-field-base', () => {
  describe('validation', () => {
    describe('validator helper function', () => {
      it('should call the validator function on each provided validator', () => {
        let numTimesValidated = 0;
        const TestValidator = defineTestValidator('test-validator', () => (++numTimesValidated));
        const validators = [new TestValidator(), new TestValidator(), new TestValidator()];
        validate('', validators);

        expect(numTimesValidated).to.equal(validators.length);
      });

      it('validates valid input correctly', () => {
        const validValue = 'valid';
        const TestValidatorValid = defineTestValidator('test-validator-valid', value => (value === validValue));
        const validators = [new TestValidatorValid()];

        const isValid = validate(validValue, validators);
        expect(isValid).to.equal(true);
      });

      it('validates invalid input correctly', () => {
        const validValue = 'valid';
        const TestValidatorInvalid = defineTestValidator('test-validator-valid', value => (value === validValue));
        const validators = [new TestValidatorInvalid()];


        const isValid = validate(`not ${validValue}`, validators);
        expect(isValid).to.equal(false);
      });

      describe('with multiple validators', () => {
        const TestValidatorValid = defineTestValidator('test-validator-valid', () => true);
        const TestValidatorInvalid = defineTestValidator('test-validator-invalid', () => false);

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

    describe('validateOn', () => {
      let component;

      beforeEach(() => setupComponent().then((newComponent) => {
        component = newComponent;
      }));
      afterEach(() => tearDownComponent(component));

      it('prop should be serialized to a space-separated string', () => {
        component.validateOn = [];
        expect(component.getAttribute('validate-on')).to.equal('');

        component.validateOn = ['event'];
        expect(component.getAttribute('validate-on')).to.equal('event');

        component.validateOn = ['eventA', 'eventB'];
        expect(component.getAttribute('validate-on')).to.equal('eventA eventB');
      });

      describe('behaviour', () => {
        let inputChild;
        let validator;
        const TestValidator = defineTestValidator('test-validator', () => false);
        const eventName = 'my-event';

        beforeEach(() => {
          inputChild = insertLightDomInput(component);
          validator = insertValidator(component, new TestValidator());
        });
        afterEach(() => {
          component.removeChild(inputChild);
          component.removeChild(validator);
        });

        it('is triggered by blur event by default', () => {
          const myEvent = new CustomEvent('blur');

          const validationWasRun = () => component.invalid;
          expect(validationWasRun()).to.be.false;

          inputChild.dispatchEvent(myEvent);
          return waitUntil(validationWasRun).should.be.fulfilled;
        });

        it('can be triggered by custom event', () => {
          props(component, { validateOn: [eventName] });
          const myEvent = new CustomEvent(eventName, { bubbles: true });

          const validationWasRun = () => component.invalid;
          expect(validationWasRun()).to.be.false;

          inputChild.dispatchEvent(myEvent);
          return waitUntil(validationWasRun).should.be.fulfilled;
        });
      });
    });
  });
});
