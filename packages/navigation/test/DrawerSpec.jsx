import { mount } from 'enzyme';
import React from 'react';
import Drawer from '../src/components/js/Drawer';

describe('<Drawer />', () => {
  describe('props', () => {
    it('isOpen prop defaults to `false`', () => {
      expect(mount(<Drawer />).props().isOpen).to.equal(false);
    });
    it('width defaults to `narrow`', () => {
      expect(mount(<Drawer />).props().width).to.equal('narrow');
    });
    it('width="full" does not render the <ContainerHeader />', () => {
      expect(mount(<Drawer width="full" />).find('ContainerHeader').length).to.equal(0);
    });
    it('primaryIcon is rendered', () => {
      const icon = <img alt="foo" />;
      expect(mount(<Drawer primaryIcon={icon} />)
        .find(`.${styles.icon}`).props().children).to.equal(icon);
    });
    it('backIcon is rendered inside a <DrawerBackIcon />', () => {
      const icon = <img alt="foo" />;
      expect(mount(<Drawer backIcon={icon} />)
        .find('DrawerBackIcon').props().children).to.equal(icon);
    });
    it('header is rendered', () => {
      const header = <div className="foo" />;
      expect(mount(<Drawer header={header} />)
        .contains(header)).to.equal(true);
    });
    it('children is rendered', () => {
      const content = <div className="foo" />;
      expect(mount(<Drawer>{content}</Drawer>)
        .contains(content)).to.equal(true);
    });
    it('onBackButton is triggered on activate of <DrawerTrigger />', () => {
      const spy = sinon.spy();
      mount(<Drawer onBackButton={spy} />).find('DrawerTrigger').simulate('click');
      expect(spy.called).to.equal(true);
    });
    it('backIconOffset defaults the back icon position to 0px', () => {
      expect(mount(
        <Drawer />
      ).find(`.${styles.backIconOuter}`).props().style.top).to.equal('0px');
    });
    it('backIconOffset changes the Y offset of where the backIcon is rendered', () => {
      expect(mount(
        <Drawer backIconOffset={123} />
      ).find(`.${styles.backIconOuter}`).props().style.top).to.equal('123px');
    });
  });
  describe('renders', () => {
    it('a <DrawerTrigger /> with a <DrawerBackIcon /> inside', () => {
      expect(mount(<Drawer />).find('DrawerTrigger').childAt(0).is('DrawerBackIcon')).to.equal(true);
    });
    it('a blanket', () => {
      expect(mount(<Drawer />).find('Blanket').length).to.equal(1);
    });
    it('a <ContainerHeader />', () => {
      expect(mount(<Drawer />).find('ContainerHeader').length).to.equal(1);
    });
  });
  describe('blanket', () => {
    it('when Drawer.isOpen=true, Blanket.isTinted and Blanket.canClickThrough=false', () => {
      const blanket = mount(<Drawer isOpen />).find('Blanket');
      expect(blanket.props().isTinted).to.equal(true);
      expect(blanket.props().canClickThrough).to.equal(false);
    });
    it('when Drawer.isOpen=false, Blanket.isTinted=false and Blanket.canClickThrough', () => {
      const blanket = mount(<Drawer />).find('Blanket');
      expect(blanket.props().isTinted).to.equal(false);
      expect(blanket.props().canClickThrough).to.equal(true);
    });
    it('clicking on the blanket is the same as clicking the back button', () => {
      const onBackButton = () => {};
      const blanket = mount(<Drawer onBackButton={onBackButton} />).find('Blanket');
      expect(blanket.props().onBlanketClicked).to.equal(onBackButton);
    });
  });
});

