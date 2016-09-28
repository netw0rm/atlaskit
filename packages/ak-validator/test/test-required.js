import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import { Component } from 'skatejs';

import { ValidatorRequired } from '../src';
import { setupComponent, tearDownComponent } from './_helpers';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();


describe('ak-validator-max-length', () => {
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

    it('should correctly validate values', () => {
      expect(component.validate('')).to.equal(false);
      expect(component.validate('hello world')).to.equal(true);
    });
  });
});
