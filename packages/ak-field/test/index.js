import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import { Component } from 'skatejs';

import MyComponent from '../src';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();


describe('ak-field', () => {
  describe('exports', () => {
    it('should export a base component', () => {
      (new MyComponent).should.be.an.instanceof(Component);
    });
  });
});
