import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';
import AkField from '../src';
import { Component } from 'skatejs';


chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();


describe('ak-field', () => {
  describe('exports', () => {
    it('should export a base component', () => {
      (new AkField).should.be.an.instanceof(Component);
    });
  });
});
