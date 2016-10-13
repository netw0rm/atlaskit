import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import { Component } from 'skatejs';

import { ValidatorRequired } from '../src';
import { setupComponent, tearDownComponent } from './_helpers';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();


describe('ak-field-validator-required', () => {
  describe('exports', () => {
    it('should export a base component', () => {
      (new ValidatorRequired).should.be.an.instanceof(Component);
    });
  });

  describe('behaviour', () => {
    let component;

    beforeEach(() => (component = (setupComponent(ValidatorRequired))));
    afterEach(() => tearDownComponent(component));

    it('should define a validator function', () => {
      expect(component.validate).to.be.a('function');
    });

    describe('should correctly validate', () => {
      const tests = [
        { value: '', valid: false },
        { value: 'hello world', valid: true },
      ];

      tests.forEach(test => {
        it(`with value of ${test.value}`, () =>
          component.validate(test.value).then(isValid => {
            expect(isValid).to.equal(test.valid);
            expect(component.invalid).to.equal(!test.valid);
          })
        );
      });
    });
  });
});
