import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import { Component } from 'skatejs';

import { ValidatorMinlength } from '../src';
import { setupComponent, tearDownComponent } from './_helpers';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();


describe.skip('ak-field-validator-minlength', () => {
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

    it('should correctly validate values', () => {
      component.minlength = 1;
      expect(component.validate('')).to.equal(false);
      expect(component.invalid).to.equal(true);
      expect(component.validate('h')).to.equal(true);
      expect(component.invalid).to.equal(false);
      expect(component.validate('he')).to.equal(true);
      expect(component.invalid).to.equal(false);

      component.minlength = 2;
      expect(component.validate('h')).to.equal(false);
      expect(component.invalid).to.equal(true);
      expect(component.validate('he')).to.equal(true);
      expect(component.invalid).to.equal(false);
      expect(component.validate('hel')).to.equal(true);
      expect(component.invalid).to.equal(false);

      component.minlength = 10;
      expect(component.validate('hello wor')).to.equal(false);
      expect(component.invalid).to.equal(true);
      expect(component.validate('hello worl')).to.equal(true);
      expect(component.invalid).to.equal(false);
      expect(component.validate('hello world')).to.equal(true);
      expect(component.invalid).to.equal(false);
    });
  });
});
