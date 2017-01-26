import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import React from 'react';
import Navigation from '../src/components/js/Navigation';
import {
  containerClosedWidth,
  navigationOpenWidth,
} from '../src/shared-variables';

describe('<Navigation />', () => {
  describe('renders', () => {
    it('should render a <ContainerNavigation />', () => {
      expect(shallow(<Navigation />).find('ContainerNavigation').length).to.equal(1);
    });
    it('should render a <GlobalNavigation />', () => {
      expect(shallow(<Navigation />).find('GlobalNavigation').length).to.equal(1);
    });
    it('should render a <GlobalActions /> in GlobalNavigation', () => {
      expect(mount(<Navigation />).find('GlobalNavigation').find('GlobalActions').length).to.equal(1);
    });
    it('should render a <GlobalActions /> in ContainerNavigation', () => {
      expect(mount(<Navigation />).find('ContainerNavigation').find('GlobalActions').length).to.equal(1);
    });
    it('should render a <Resizer />', () => {
      expect(shallow(<Navigation />).find('Resizer').length).to.equal(1);
    });
    it('should render two <Drawer />', () => {
      expect(shallow(<Navigation />).find('Drawer').length).to.equal(2);
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
    it('containerAppearance="global" is passed on to <ContainerNavigation/>', () => {
      expect(shallow(<Navigation containerAppearance="global" />).find('ContainerNavigation').prop('appearance')).to.equal('global');
    });
    it('isCollapsible=false does render a <Resizer />', () => {
      expect(shallow(<Navigation isCollapsible={false} />))
      .to.have.descendants('Resizer');
    });
    it('containerHeader - can pass in an element for the container header', () => {
      const header = <div>foo</div>;
      expect(shallow(<Navigation containerHeader={header} />)
        .find('ContainerNavigation').props().header).to.equal(header);
    });
    it('globalSearchIcon should pass search icon onto <GlobalNavigation />', () => {
      const icon = <img alt="search" />;
      expect(mount(<Navigation globalSearchIcon={icon} />).find('GlobalNavigation').props().searchIcon).to.equal(icon);
    });
    it('globalCreateIcon should pass createIcon onto <GlobalNavigation />', () => {
      const icon = <img alt="create" />;
      expect(mount(<Navigation globalCreateIcon={icon} />).find('GlobalNavigation').props().createIcon).to.equal(icon);
    });
    it('globalSearchIcon should pass globalSearchIcon onto <ContainerNavigation />', () => {
      const icon = <img alt="search" />;
      expect(mount(<Navigation globalSearchIcon={icon} />).find('ContainerNavigation').props().globalSearchIcon).to.equal(icon);
    });
    it('globalCreateIcon should pass globalCreateIcon onto <ContainerNavigation />', () => {
      const icon = <img alt="create" />;
      expect(mount(<Navigation globalCreateIcon={icon} />).find('ContainerNavigation').props().globalCreateIcon).to.equal(icon);
    });
    it('isSearchDrawerOpen=true should set open=true on the SearchDrawer', () => {
      expect(mount(<Navigation isSearchDrawerOpen />).find('Drawer').at(0).props().isOpen).to.equal(true);
    });
    it('isSearchDrawerOpen=false should set open=false on the SearchDrawer', () => {
      expect(mount(<Navigation isSearchDrawerOpen={false} />).find('Drawer').at(0).props().isOpen).to.equal(false);
    });
    it('isCreateDrawerOpen=true should set open=true on the CreateDrawer', () => {
      expect(mount(<Navigation isCreateDrawerOpen />).find('Drawer').at(1).props().isOpen).to.equal(true);
    });
    it('isCreateDrawerOpen=true should set open=true on the CreateDrawer', () => {
      expect(mount(<Navigation isCreateDrawerOpen={false} />).find('Drawer').at(1).props().isOpen).to.equal(false);
    });
    it('onResize is called after the resizeDelta has been reset to 0 (so that animations are enabled again)', (done) => {
      const navigation = shallow(<Navigation />);
      navigation.setProps({
        onResize: () => {
          expect(navigation.state().resizeDelta).to.equal(0);
          done();
        },
      });
      navigation.find('Resizer').simulate('resizeStart');
      navigation.find('Resizer').simulate('resize', -300);
      navigation.find('Resizer').simulate('resizeEnd');
    });
    it('globalPrimaryItem should map to global navigation\'s primaryItem', () => {
      const primaryIcon = <span className="PRIMARY_ICON" />;
      expect(mount(
        <Navigation
          globalPrimaryIcon={primaryIcon}
        />).find('GlobalNavigation').props().primaryIcon).to.equal(primaryIcon);
    });
    it('globalHelpItem should map to global navigation\'s helpItem', () => {
      const helpItem = <span className="HELP_ITEM" />;
      expect(mount(
        <Navigation
          globalHelpItem={helpItem}
        />).find('GlobalNavigation').props().helpItem).to.equal(helpItem);
    });
    it('globalAccountItem should map to <GlobalNavigation/>', () => {
      const accountItem = <span className="ACCOUNT_ITEM" />;
      expect(mount(
        <Navigation
          globalAccountItem={accountItem}
        />).find('GlobalNavigation').props().accountItem).to.equal(accountItem);
    });
    it('linkComponent is passed on to <GlobalNavigation/>', () => {
      const linkComponent = () => null;
      expect(mount(
        <Navigation
          linkComponent={linkComponent}
        />).find('GlobalNavigation').props().linkComponent).to.equal(linkComponent);
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
