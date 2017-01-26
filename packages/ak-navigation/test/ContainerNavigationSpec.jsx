import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { shallow, mount } from 'enzyme';
import React from 'react';
import {
  containerNavigationInner,
  hasGlobalAppearance,
} from 'style!../src/components/less/ContainerNavigation.less';
import ContainerNavigation from '../src/components/js/ContainerNavigation';
import Spacer from '../src/components/js/Spacer';
import { containerClosedWidth } from '../src/shared-variables';

chai.use(chaiAsPromised);
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
    it('appearnace="global" should render with the global appearance class', () => {
      expect((mount(<ContainerNavigation appearance="global" />).find(`.${containerNavigationInner}`)).hasClass((hasGlobalAppearance))).to.equal(true);
    });
  });
  describe('behaviour', () => {
    it('renders [data-__ak-navigation-container-closed="true"] if and only if it is closed', () => {
      expect(mount(<ContainerNavigation width={containerClosedWidth} />).find('[data-__ak-navigation-container-closed]').length).to.equal(1);
      expect(mount(<ContainerNavigation width={200} />).find('[data-__ak-navigation-container-closed]').length).to.equal(0);
    });
  });
});
