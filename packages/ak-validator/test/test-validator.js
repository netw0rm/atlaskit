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
      expect(defineValidator).to.be.a('function');
    });

    it('should export validator components for min length, max length, and required', () => {
      expect(new ValidatorMinLength).to.be.an.instanceof(Component);
      expect(new ValidatorMaxLength).to.be.an.instanceof(Component);
      expect(new ValidatorRequired).to.be.an.instanceof(Component);
    });
  });

  it('behaviour', () => {
    it('should be able to define a new validator component from the exported function', () => {
      const NewValidator = defineValidator('new-validator', () => false);
      const newValidator = new NewValidator();

      expect(newValidator).to.be.an.instanceof(Component);
      expect(newValidator.validate).to.be.a('function');
    });
  });
});
