import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import { Component } from 'skatejs';

import defineValidator, {
  ValidatorMinLength,
  ValidatorMaxLength,
  ValidatorRequired,
} from '../src';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();


describe('ak-validator', () => {
  describe('exports', () => {
    it('should export a function', () => {
      (defineValidator).should.be.a('function');
    });

    it('should export validator components for min length, max length, and required', () => {
      (new ValidatorMinLength).should.be.an.instanceof(Component);
      (new ValidatorMaxLength).should.be.an.instanceof(Component);
      (new ValidatorRequired).should.be.an.instanceof(Component);
    });
  });

  it('behaviour', () => {
    it('should be able to define a new validator component from the exported function', () => {
      const NewValidator = defineValidator('new-validator', () => false);
      const newValidator = new NewValidator();
      (newValidator).should.be.an.instanceof(Component);
      (newValidator.validate).should.be.a('function');
    });
  });
});
