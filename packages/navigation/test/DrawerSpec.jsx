import { mount } from 'enzyme';
import React from 'react';
import styles from 'style!../src/components/less/Drawer.less';
import Drawer from '../src/components/js/Drawer';

describe('<Drawer />', () => {
  describe('props', () => {
    it('isOpen prop defaults to `false`', () => {
      const wrapper = mount(<Drawer />);
      expect(wrapper.props().isOpen).to.equal(false);
      wrapper.unmount();
    });
    it('width defaults to `narrow`', () => {
      const wrapper = mount(<Drawer />);
      expect(wrapper.props().width).to.equal('narrow');
      wrapper.unmount();
    });
    it('width="full" does not render the <ContainerHeader />', () => {
      const wrapper = mount(<Drawer width="full" />);
      expect(wrapper.find('ContainerHeader').length).to.equal(0);
      wrapper.unmount();
    });
    it('primaryIcon is rendered', () => {
      const icon = <img alt="foo" />;
      const wrapper = mount(<Drawer primaryIcon={icon} />);
      expect(wrapper.find(`.${styles.icon}`).props().children).to.equal(icon);
      wrapper.unmount();
    });
    it('backIcon is rendered inside a <DrawerBackIcon />', () => {
      const icon = <img alt="foo" />;
      const wrapper = mount(<Drawer backIcon={icon} />);
      expect(wrapper.find('DrawerBackIcon').props().children).to.equal(icon);
      wrapper.unmount();
    });
    it('header is rendered', () => {
      const header = <div className="foo" />;
      const wrapper = mount(<Drawer header={header} />);
      expect(wrapper.contains(header)).to.equal(true);
      wrapper.unmount();
    });
    it('children is rendered', () => {
      const content = <div className="foo" />;
      const wrapper = mount(<Drawer>{content}</Drawer>);
      expect(wrapper.contains(content)).to.equal(true);
      wrapper.unmount();
    });
    it('onBackButton is triggered on activate of <DrawerTrigger />', () => {
      const spy = sinon.spy();
      const wrapper = mount(<Drawer onBackButton={spy} />);
      wrapper.find('DrawerTrigger').simulate('click');
      expect(spy.called).to.equal(true);
      wrapper.unmount();
    });
    it('backIconOffset defaults the back icon position to 0px', () => {
      const wrapper = mount(
        <Drawer />
      );
      expect(wrapper.find(`.${styles.backIconOuter}`).props().style.top).to.equal('0px');
      wrapper.unmount();
    });
    it('backIconOffset changes the Y offset of where the backIcon is rendered', () => {
      const wrapper = mount(
        <Drawer backIconOffset={123} />
      );
      expect(wrapper.find(`.${styles.backIconOuter}`).props().style.top).to.equal('123px');
      wrapper.unmount();
    });
  });
  describe('renders', () => {
    it('a <DrawerTrigger /> with a <DrawerBackIcon /> inside', () => {
      const wrapper = mount(<Drawer />);
      expect(wrapper.find('DrawerTrigger').childAt(0).is('DrawerBackIcon')).to.equal(true);
      wrapper.unmount();
    });
    it('a blanket', () => {
      const wrapper = mount(<Drawer />);
      expect(wrapper.find('Blanket').length).to.equal(1);
      wrapper.unmount();
    });
    it('a <ContainerHeader />', () => {
      const wrapper = mount(<Drawer />);
      expect(wrapper.find('ContainerHeader').length).to.equal(1);
      wrapper.unmount();
    });
  });
  describe('blanket', () => {
    it('when Drawer.isOpen=true, Blanket.isTinted and Blanket.canClickThrough=false', () => {
      const drawer = mount(<Drawer isOpen />);
      const blanket = drawer.find('Blanket');
      expect(blanket.props().isTinted).to.equal(true);
      expect(blanket.props().canClickThrough).to.equal(false);
      drawer.unmount();
    });
    it('when Drawer.isOpen=false, Blanket.isTinted=false and Blanket.canClickThrough', () => {
      const drawer = mount(<Drawer />);
      const blanket = drawer.find('Blanket');
      expect(blanket.props().isTinted).to.equal(false);
      expect(blanket.props().canClickThrough).to.equal(true);
      drawer.unmount();
    });
    it('clicking on the blanket is the same as clicking the back button', () => {
      const onBackButton = () => {};
      const drawer = mount(<Drawer onBackButton={onBackButton} />);
      const blanket = drawer.find('Blanket');
      expect(blanket.props().onBlanketClicked).to.equal(onBackButton);
      drawer.unmount();
    });
  });
});

