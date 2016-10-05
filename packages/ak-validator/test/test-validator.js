import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import { Component } from 'skatejs';

import {
  ValidatorBase,
  ValidatorMinLength,
  ValidatorMaxLength,
  ValidatorRequired,
} from '../src';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();


describe('ak-validator', () => {
  describe('exports', () => {
    it('should export the base class', () => {
      expect(ValidatorBase).to.be.a('function');
    });

    it('should export validator components for min length, max length, and required', () => {
      expect(new ValidatorMinLength).to.be.an.instanceof(Component);
      expect(new ValidatorMaxLength).to.be.an.instanceof(Component);
      expect(new ValidatorRequired).to.be.an.instanceof(Component);
    });
  });
});
