import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import { Component } from 'skatejs';

import { ValidatorMinlength } from '../src';
import { setupComponent, tearDownComponent } from './_helpers';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();


describe('ak-field-validator-minlength', () => {
  describe('exports', () => {
    it('should export a base component', () => {
      (new ValidatorMinlength()).should.be.an.instanceof(Component);
    });
  });

  describe('behaviour', () => {
    let component;

    beforeEach(() => (component = setupComponent(ValidatorMinlength)));
    afterEach(() => tearDownComponent(component));

    it('should define a validator function', () => {
      expect(component.validate).to.be.a('function');
    });

    describe('should correctly validate', () => {
      const testsForLength = [
        {
          minlength: 1,
          tests: [
            { value: '', valid: false },
            { value: 'h', valid: true },
            { value: 'he', valid: true },
          ],
        },
        {
          minlength: 2,
          tests: [
            { value: 'h', valid: false },
            { value: 'he', valid: true },
            { value: 'hel', valid: true },
          ],
        },
        {
          minlength: 10,
          tests: [
            { value: 'hello wor', valid: false },
            { value: 'hello worl', valid: true },
            { value: 'hello world', valid: true },
          ],
        },
      ];

      testsForLength.forEach((testForLength) => {
        describe(`with minlength of ${testForLength.minlength}`, () => {
          testForLength.tests.forEach((test) => {
            it(`and value of ${test.value}`, () => {
              component.minlength = testForLength.minlength;
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
