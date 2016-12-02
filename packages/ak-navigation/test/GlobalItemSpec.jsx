import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import sinonChai from 'sinon-chai';
import { mountWithContext } from './utils';
import GlobalItem from '../src/components/js/GlobalItem';

chai.use(chaiAsPromised);
chai.use(chaiEnzyme());
chai.use(sinonChai);
chai.should();
const expect = chai.expect;

describe('<GlobalItem />', () => {
  describe('interacting', () => {
    it('click should call the onActivate handler', () => {
      const spy = sinon.spy();
      mountWithContext(<GlobalItem onActivate={spy} />).find('button').simulate('click');
      expect(spy.called).to.equal(true);
    });
  });
});
