import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import { Component } from 'skatejs';

import { ValidatorMinLength } from '../src';
import { setupComponent, tearDownComponent } from './_helpers';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();


describe('ak-validator-min-length', () => {
  describe('exports', () => {
    it('should export a base component', () => {
      (new ValidatorMinLength).should.be.an.instanceof(Component);
    });
  });

  describe('behaviour', () => {
    let component;

    beforeEach(() => (component = setupComponent(ValidatorMinLength)));
    afterEach(() => tearDownComponent(component));

    it('should define a validator function', () => {
      expect(component.validate).to.be.a('function');
    });

    it('should correctly validate values', () => {
      component.minLength = 1;
      expect(component.validate('')).to.equal(false);
      expect(component.validate('h')).to.equal(true);
      expect(component.validate('he')).to.equal(true);

      component.minLength = 2;
      expect(component.validate('h')).to.equal(false);
      expect(component.validate('he')).to.equal(true);
      expect(component.validate('hel')).to.equal(true);

      component.minLength = 10;
      expect(component.validate('hello wor')).to.equal(false);
      expect(component.validate('hello worl')).to.equal(true);
      expect(component.validate('hello world')).to.equal(true);
    });
  });
});
