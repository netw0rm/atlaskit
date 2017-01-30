import { mount } from 'enzyme';
import React from 'react';
import styles from 'style!../src/components/less/Drawer.less';
import Drawer from '../src/components/js/Drawer';

describe('<Drawer />', () => {
  describe('props', () => {
    it('isOpen prop defaults to `false`', () => {
      expect(mount(<Drawer />).props().isOpen).to.equal(false);
    });
    it('isWide prop defaults to `false`', () => {
      expect(mount(<Drawer />).props().isWide).to.equal(false);
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
    it('onBackButton is triggered on activate of <DrawerTrigger />', () => {
      const spy = sinon.spy();
      mount(<Drawer onBackButton={spy} />).find('DrawerTrigger').simulate('click');
      expect(spy.called).to.equal(true);
    });
  });
  describe('renders', () => {
    it('a <DrawerTrigger /> with a <DrawerBackIcon /> inside', () => {
      expect(mount(<Drawer />).find('DrawerTrigger').childAt(0).is('DrawerBackIcon')).to.equal(true);
    });
  });
});

