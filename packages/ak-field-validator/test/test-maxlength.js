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
      (new ValidatorMaxlength).should.be.an.instanceof(Component);
    });
  });

  describe('behaviour', () => {
    let component;

    beforeEach(() => (component = setupComponent(ValidatorMaxlength)));
    afterEach(() => tearDownComponent(component));

    it('should define a validator function', () => {
      expect(component.validate).to.be.a('function');
    });

    it('should correctly validate values', () => {
      component.maxlength = 1;
      expect(component.validate('')).to.equal(true);
      expect(component.valid).to.equal(true);
      expect(component.validate('h')).to.equal(true);
      expect(component.valid).to.equal(true);
      expect(component.validate('he')).to.equal(false);
      expect(component.valid).to.equal(false);

      component.maxlength = 2;
      expect(component.validate('h')).to.equal(true);
      expect(component.valid).to.equal(true);
      expect(component.validate('he')).to.equal(true);
      expect(component.valid).to.equal(true);
      expect(component.validate('hel')).to.equal(false);
      expect(component.valid).to.equal(false);

      component.maxlength = 10;
      expect(component.validate('hello wor')).to.equal(true);
      expect(component.valid).to.equal(true);
      expect(component.validate('hello worl')).to.equal(true);
      expect(component.valid).to.equal(true);
      expect(component.validate('hello world')).to.equal(false);
      expect(component.valid).to.equal(false);
    });
  });
});
