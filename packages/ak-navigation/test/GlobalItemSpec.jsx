import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import React from 'react';
import sinonChai from 'sinon-chai';
import styles from 'style-loader!../src/components/less/GlobalItem.less';
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
      shallow(<GlobalItem onActivate={spy} />).find('button').simulate('click');
      expect(spy.called).to.equal(true);
    });
  });
  describe('props', () => {
    it('small prop is renders small global item', () => {
      expect(shallow(<GlobalItem size="small" />).find('button')).to.have.className(styles.smallGlobalItem);
    });
    it('medium prop is renders small global item', () => {
      expect(shallow(<GlobalItem size="medium" />).find('button')).to.have.className(styles.mediumGlobalItem);
    });
    it('large prop is renders small global item', () => {
      expect(shallow(<GlobalItem size="large" />).find('button')).to.have.className(styles.largeGlobalItem);
    });
  });
});
