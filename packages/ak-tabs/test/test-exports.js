import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Component } from 'skatejs';

import Tabs, * as exports from '../src';


chai.use(chaiAsPromised);
chai.should();

describe(name, () => {
  describe('exports', () => {
    it('should have a well-defined set of exports', () => {
      Object.keys(exports).should.be.deep.equal([
        'Tab',
        'events',
        'default',
      ]);
    });

    it('should export a base component', () => {
      Tabs.should.be.equals(exports.default);
      (new Tabs()).should.be.an.instanceof(Component);
    });

    it('should export a Tab component', () => {
      (new exports.Tab()).should.be.an.instanceof(Component);
    });

    it('should have an events export with defined events', () => {
      exports.events.should.be.defined;
      Object.keys(exports.events).should.be.deep.equal(['tabChange']);
    });
  });
});
