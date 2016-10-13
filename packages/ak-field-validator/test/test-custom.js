import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import { Component } from 'skatejs';

import { setupComponent, tearDownComponent } from './_helpers';
import { CustomValidator, CustomValidatorWithError } from './_custom-validator';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();


describe('ak-field-validator-custom', () => {
  describe('defineValidator', () => {
    it('should be able to define a custom validator', () => {
      (new CustomValidator).should.be.an.instanceof(Component);
    });

    it('should define a validator function', () => {
      const component = new CustomValidator();
      expect(component.validate).to.be.a('function');
    });

    describe('should use the given validator function and correctly validate', () => {
      let component;

      beforeEach(() => (component = (setupComponent(CustomValidator))));
      afterEach(() => tearDownComponent(component));

      const expected = 'valid';
      const tests = [
        { value: '', valid: false },
        { value: 'valid', valid: true },
      ];

      tests.forEach(test => {
        it(`with expected value of ${expected} and value of ${test.value}`, () => {
          component.expected = expected;
          return component.validate(test.value).then(isValid => {
            expect(isValid).to.equal(test.valid);
            expect(component.invalid).to.equal(!test.valid);
          });
        });
      });
    });

    it('with error', () => {
      const component = new CustomValidatorWithError();
      return component.validate('').catch(error => {
        expect(error.message).to.equal('error');
      });
    });
  });
});
