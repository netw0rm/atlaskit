import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import { Component } from 'skatejs';

import { ValidatorMaxlength } from '../src';
import { setupComponent, tearDownComponent } from './_helpers';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();


describe('ak-field-validator-maxlength', () => {
  describe('exports', () => {
    it('should export a base component', () => {
      (new ValidatorMaxlength()).should.be.an.instanceof(Component);
    });
  });

  describe('behaviour', () => {
    let component;

    beforeEach(() => (component = setupComponent(ValidatorMaxlength)));
    afterEach(() => tearDownComponent(component));

    it('should define a validator function', () => {
      expect(component.validate).to.be.a('function');
    });

    describe('should correctly validate', () => {
      const testsForLength = [
        {
          maxlength: 1,
          tests: [
            { value: '', valid: true },
            { value: 'h', valid: true },
            { value: 'he', valid: false },
          ],
        },
        {
          maxlength: 2,
          tests: [
            { value: 'h', valid: true },
            { value: 'he', valid: true },
            { value: 'hel', valid: false },
          ],
        },
        {
          maxlength: 10,
          tests: [
            { value: 'hello wor', valid: true },
            { value: 'hello worl', valid: true },
            { value: 'hello world', valid: false },
          ],
        },
      ];

      testsForLength.forEach((testForLength) => {
        describe(`with maxlength of ${testForLength.maxlength}`, () => {
          testForLength.tests.forEach((test) => {
            it(`and value of ${test.value}`, () => {
              component.maxlength = testForLength.maxlength;
              return component.validate(test.value).then((isValid) => {
                expect(isValid).to.equal(test.valid);
                expect(component.invalid).to.equal(!test.valid);
              });
            });
          });
        });
      });
    });
  });
});
