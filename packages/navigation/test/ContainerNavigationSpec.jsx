import { shallow, mount } from 'enzyme';
import React from 'react';
import {
  containerNavigationInner,
  hasGlobalAppearance,
  hasProjectSettingsAppearance,
} from 'style!../src/components/less/ContainerNavigation.less';
import ContainerNavigation from '../src/components/js/ContainerNavigation';
import Spacer from '../src/components/js/Spacer';
import { containerClosedWidth } from '../src/shared-variables';

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
    it('appearance="settings" should render with the settings appearance class', () => {
      expect((mount(<ContainerNavigation appearance="settings" />).find(`.${containerNavigationInner}`)).hasClass((hasProjectSettingsAppearance))).to.equal(true);
    });
  });
  describe('behaviour', () => {
    it('renders [data-__ak-navigation-container-closed="true"] if and only if it is closed', () => {
      expect(mount(<ContainerNavigation width={containerClosedWidth} />).getDOMNode().matches('[data-__ak-navigation-container-closed="true"]')).to.equal(true);
      expect(mount(<ContainerNavigation width={200} />).getDOMNode().matches('[data-__ak-navigation-container-closed="true"]')).to.equal(false);
    });
    it('collapses the container header when closed', () => {
      const headerComponent = sinon.spy();
      shallow(<ContainerNavigation width={0} headerComponent={headerComponent} />);
      expect(headerComponent.calledWith({ isCollapsed: true })).to.equal(true);
    });
  });
});
