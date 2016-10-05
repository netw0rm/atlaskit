import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import { Component } from 'skatejs';

import {
  ValidatorBase,
  ValidatorMinlength,
  ValidatorMaxlength,
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
      expect(new ValidatorMinlength).to.be.an.instanceof(Component);
      expect(new ValidatorMaxlength).to.be.an.instanceof(Component);
      expect(new ValidatorRequired).to.be.an.instanceof(Component);
    });
  });
});
