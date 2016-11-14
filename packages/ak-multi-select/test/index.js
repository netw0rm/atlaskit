import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import { Component } from 'skatejs';

import MultiSelect from '../src';
import { setupComponent, tearDownComponent } from './_helpers';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();


describe('ak-multi-select', () => {
  describe('exports', () => {
    it('should export a base component', () => {
      (new MultiSelect()).should.be.an.instanceof(Component);
    });
  });

  describe('logic', () => {
    let component;

    beforeEach(() => setupComponent(MultiSelect).then((newComponent) => {
      component = newComponent;
    }));
    afterEach(() => tearDownComponent(component));
  });
});
