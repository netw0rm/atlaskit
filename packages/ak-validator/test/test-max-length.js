import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import { Component } from 'skatejs';

import { ValidatorMaxLength } from '../src';
import { setupComponent, tearDownComponent } from './_helpers';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();


describe('ak-validator-max-length', () => {
  describe('exports', () => {
    it('should export a base component', () => {
      (new ValidatorMaxLength).should.be.an.instanceof(Component);
    });
  });

  describe('behaviour', () => {
    let component;

    beforeEach(() => (component = setupComponent(ValidatorMaxLength)));
    afterEach(() => tearDownComponent(component));

    it('should define a validator function', () => {
      expect(component.validate).to.be.a('function');
    });

    it('should correctly validate values', () => {
      component.maxLength = 1;
      expect(component.validate('')).to.equal(true);
      expect(component.validate('h')).to.equal(true);
      expect(component.validate('he')).to.equal(false);

      component.maxLength = 2;
      expect(component.validate('h')).to.equal(true);
      expect(component.validate('he')).to.equal(true);
      expect(component.validate('hel')).to.equal(false);

      component.maxLength = 10;
      expect(component.validate('hello wor')).to.equal(true);
      expect(component.validate('hello worl')).to.equal(true);
      expect(component.validate('hello world')).to.equal(false);
    });
  });
});
