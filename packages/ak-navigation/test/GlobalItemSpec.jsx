import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import React from 'react';
import sinonChai from 'sinon-chai';
import GlobalItem from '../src/components/js/GlobalItem';

chai.use(chaiAsPromised);
chai.use(chaiEnzyme);
chai.use(sinonChai);
chai.should();
const expect = chai.expect; // eslint-disable-line no-unused-vars

describe('<GlobalItem />', () => {
  describe('interacting', () => {
    it('click should call the onActivate handler', () => {
      const spy = sinon.spy();
      shallow(<GlobalItem onActivate={spy} />).find('button').simulate('click');
      expect(spy.called).to.equal(true);
    });
  });
});
