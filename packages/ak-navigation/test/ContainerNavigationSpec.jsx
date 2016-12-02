import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { mountWithContext } from './utils';
import ContainerNavigation from '../src/components/js/ContainerNavigation';
import Spacer from '../src/components/js/Spacer';

chai.use(chaiAsPromised);
chai.use(chaiEnzyme());
chai.should();
const expect = chai.expect;

describe('<ContainerNavigation />', () => {
  describe('children', () => {
    it('should render a <Spacer />', () => {
      expect(mountWithContext(<ContainerNavigation />)
        .find(Spacer)).to.have.length(1);
    });
  });
  describe('props', () => {
    it('width prop is reflected directly on <Spacer />', () => {
      expect(mountWithContext(<ContainerNavigation width={500} />).find(Spacer)
        .props().width).to.equal(500);
      expect(mountWithContext(<ContainerNavigation width={200} />).find(Spacer)
        .props().width).to.equal(200);
    });
  });
});
