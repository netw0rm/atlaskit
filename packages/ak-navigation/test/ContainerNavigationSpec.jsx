import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import { shallow, mount } from 'enzyme';
import React from 'react';
import ContainerNavigation from '../src/components/js/ContainerNavigation';
import Spacer from '../src/components/js/Spacer';
import { containerClosedWidth } from '../src/shared-variables';

chai.use(chaiAsPromised);
chai.use(chaiEnzyme());
chai.should();
const expect = chai.expect;

describe('<ContainerNavigation />', () => {
  describe('children', () => {
    it('should render a <Spacer />', () => {
      expect(shallow(<ContainerNavigation />).find(Spacer)).to.have.length(1);
    });
  });
  describe('props', () => {
    it('width prop is reflected directly on <Spacer />', () => {
      expect(shallow(<ContainerNavigation width={500} />).find(Spacer).props().width).to.equal(500);
      expect(shallow(<ContainerNavigation width={200} />).find(Spacer).props().width).to.equal(200);
    });
  });
  describe('behaviour', () => {
    it('renders [data-__ak-navigation-container-closed="true"] iff it is closed', () => {
      expect(mount(<ContainerNavigation width={containerClosedWidth} />)).to.have.exactly(1).descendants('[data-__ak-navigation-container-closed]');
      expect(mount(<ContainerNavigation width={200} />)).to.have.exactly(0).descendants('[data-__ak-navigation-container-closed]');
    });
  });
});
