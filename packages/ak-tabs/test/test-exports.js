import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Tabs, * as exports from '../src';
import { Component } from 'skatejs';

chai.use(chaiAsPromised);
chai.should();

describe(name, () => {
  describe('exports', () => {
    it('should export a base component', () => {
      Tabs.should.be.equals(exports.default);
      (new Tabs).should.be.an.instanceof(Component);
    });

    it('should export a Tab component', () => {
      (new exports.Tab).should.be.an.instanceof(Component);
    });

    it('should have an events export with defined events', () => {
      exports.events.should.be.defined;
      Object.keys(exports.events).should.be.deep.equal(['tabChange']);
    });
  });
});
