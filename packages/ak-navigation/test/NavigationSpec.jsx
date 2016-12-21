import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow, mount } from 'enzyme';
import React from 'react';
import Navigation from '../src/components/js/Navigation';
import {
  containerClosedWidth,
  navigationOpenWidth,
} from '../src/shared-variables';

chai.use(chaiEnzyme());

describe('<Navigation />', () => {
  describe('children', () => {
    it('should render a <ContainerNavigation />', () => {
      expect(shallow(<Navigation />)).to.have.exactly(1).descendants('ContainerNavigation');
    });
    it('should render a <GlobalNavigation />', () => {
      expect(shallow(<Navigation />)).to.have.exactly(1).descendants('GlobalNavigation');
    });
    it('should render a <Resizer />', () => {
      expect(shallow(<Navigation />)).to.have.exactly(1).descendants('Resizer');
    });
    it('should render two <Drawer />', () => {
      expect(shallow(<Navigation />)).to.have.exactly(2).descendants('Drawer');
    });
  });

  describe('props', () => {
    it('width prop is reflected on <Spacer />', () => {
      expect(shallow(<Navigation width={500} />).find('Spacer').props().width).to.equal(500);
      expect(shallow(<Navigation width={200} />).find('Spacer').props().width).to.equal(200);
    });
    it('open=false overrides width prop on <Spacer />', () => {
      expect(shallow(<Navigation isOpen={false} width={500} />)
        .find('Spacer').props().width).to.equal(containerClosedWidth);
      expect(shallow(<Navigation isOpen={false} width={200} />)
        .find('Spacer').props().width).to.equal(containerClosedWidth);
    });
    it('isResizeable=false does not render a <Resizer />', () => {
      expect(shallow(<Navigation isResizeable={false} />))
      .to.not.have.descendants('Resizer');
    });
    it('isCollapsible=false does render a <Resizer />', () => {
      expect(shallow(<Navigation isCollapsible={false} />))
      .to.have.descendants('Resizer');
    });
    it('can pass in an element for the container header', () => {
      const header = <div>foo</div>;
      expect(shallow(<Navigation containerHeader={header} />)
        .find('ContainerNavigation').props().header).to.equal(header);
    });
    it('globalSearchIcon should insert search icon into navigation', () => {
      expect(mount(<Navigation globalSearchIcon={<span className="SEARCH_ICON" />} />)).to.have.exactly(1).descendants('.SEARCH_ICON');
    });
    it('globalCreateIcon should insert create icon into navigation', () => {
      expect(mount(<Navigation globalCreateIcon={<span className="CREATE_ICON" />} />)).to.have.exactly(1).descendants('.CREATE_ICON');
    });
    it('when isSearchDrawerOpen=true should set open=true on the SearchDrawer', () => {
      expect(mount(<Navigation isSearchDrawerOpen />).find('Drawer').at(0).props().isOpen).to.equal(true);
    });
    it('when isSearchDrawerOpen=false should set open=false on the SearchDrawer', () => {
      expect(mount(<Navigation isSearchDrawerOpen={false} />).find('Drawer').at(0).props().isOpen).to.equal(false);
    });
    it('when isCreateDrawerOpen=true should set open=true on the CreateDrawer', () => {
      expect(mount(<Navigation isCreateDrawerOpen />).find('Drawer').at(1).props().isOpen).to.equal(true);
    });
    it('when isCreateDrawerOpen=true should set open=true on the CreateDrawer', () => {
      expect(mount(<Navigation isCreateDrawerOpen={false} />).find('Drawer').at(1).props().isOpen).to.equal(false);
    });
    it('onResize is called after the resizeDelta has been reset to 0 (so that animations are enabled again)', (done) => {
      const navigation = shallow(<Navigation />);
      navigation.setProps({
        onResize: () => expect(navigation.state().resizeDelta).to.equal(0),
      });
      navigation.find('Resizer').simulate('resizeStart');
      navigation.find('Resizer').simulate('resize', -300);
      navigation.find('Resizer').simulate('resizeEnd');
      done();
    });
    it('globalPrimaryItem should map to global navigation\'s primaryItem', () => {
      const primaryItem = <span className="PRIMARY_ITEM" />;
      expect(mount(
        <Navigation
          globalPrimaryItem={primaryItem}
        />).find('GlobalNavigation').props().primaryItem).to.equal(primaryItem);
    });
    it('globalHelpItem should map to global navigation\'s helpItem', () => {
      const helpItem = <span className="HELP_ITEM" />;
      expect(mount(
        <Navigation
          globalHelpItem={helpItem}
        />).find('GlobalNavigation').props().helpItem).to.equal(helpItem);
    });
    it('globalAccountItem should map to global navigation\'s accountItem', () => {
      const accountItem = <span className="ACCOUNT_ITEM" />;
      expect(mount(
        <Navigation
          globalAccountItem={accountItem}
        />).find('GlobalNavigation').props().accountItem).to.equal(accountItem);
    });
  });

  describe('interaction', () => {
    it('resize changes internal resize state', () => {
      const navigation = shallow(<Navigation />);
      navigation.find('Resizer').simulate('resize', 50);
      expect(navigation.state().resizeDelta).to.equal(50);
    });
    it('rendered width is never less than the container width', () => {
      const navigation = shallow(<Navigation />);
      navigation.find('Resizer').simulate('resize', -300);
      expect(navigation.find('Spacer').props().width).to.be.at.least(containerClosedWidth);
    });
    it('with isCollapsible=false, rendered width is never less than the navigation open width', () => {
      const navigation = shallow(<Navigation isCollapsible={false} />);
      navigation.find('Resizer').simulate('resize', -300);
      expect(navigation.find('Spacer').props().width).to.be.at.least(navigationOpenWidth);
    });
  });
});
