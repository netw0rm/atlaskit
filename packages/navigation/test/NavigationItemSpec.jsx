import { mount } from 'enzyme';
import React from 'react';
import {
  action,
  isSelected,
  isCompact,
  navigationItemOuter,
  link,
} from 'style!../src/components/less/NavigationItem.less';
import NavigationItem from '../src/components/js/NavigationItem';

describe('<NavigationItem />', () => {
  describe('props', () => {
    it('icon should render an image', () => {
      const wrapper = mount(<NavigationItem icon={<img alt="foo" />} />);
      expect(wrapper.find('img').length).to.equal(1);
      wrapper.unmount();
    });
    it('isSelected=true should render with the isSelected class', () => {
      const wrapper = mount(<NavigationItem isSelected />);
      expect((wrapper.find(`.${navigationItemOuter}`)).hasClass((isSelected))).to.equal(true);
      wrapper.unmount();
    });
    it('isSelected=false should not render with the isSelected class', () => {
      const wrapper = mount(<NavigationItem />);
      expect(wrapper.find(`.${navigationItemOuter}`).hasClass(isSelected)).to.equal(false);
      wrapper.unmount();
    });
    it('isCompact=true should render with the isCompact class', () => {
      const wrapper = mount(<NavigationItem isCompact />);
      expect((wrapper.find(`.${navigationItemOuter}`)).hasClass((isCompact))).to.equal(true);
      wrapper.unmount();
    });
    it('with a href should render onto the link', () => {
      const wrapper = mount(<NavigationItem href="foo" />);
      expect(wrapper.find(`.${link}`).props().href).to.equal('foo');
      wrapper.unmount();
    });
    it('with no href should not render a link', () => {
      const wrapper = mount(<NavigationItem />);
      expect(wrapper.find('a').length).to.equal(0);
      wrapper.unmount();
    });
    it('with an onClick should call the onClick', () => {
      const spy = sinon.spy();
      const navigation = mount(<NavigationItem onClick={spy} />);
      navigation.find('button').simulate('click');
      expect(spy.calledOnce).to.equal(true);
      navigation.unmount();
    });
    it('with an onClick and href should render the href on a link, and bind the onClick to it', () => {
      const spy = sinon.spy();
      const navigation = mount(<NavigationItem href="foo" onClick={spy} />);
      navigation.find('a').simulate('click');
      expect(spy.calledOnce).to.equal(true);
      expect(navigation.find('a').props().href).to.equal('foo');
      navigation.unmount();
    });
    it('linkComponent should render a custom link component', () => {
      const wrapper = mount(
        <NavigationItem
          href="#custom-href"
          linkComponent={({ children, href }) => <a className="custom" href={href}>{children}</a>}
        />
      );
      const customLink = wrapper.find('.custom');
      expect(customLink).not.to.equal(undefined);
      expect(customLink.props().href).to.equal('#custom-href');
      wrapper.unmount();
    });
    it('textAfter should render in the navigation item', () => {
      const wrapper = mount(<NavigationItem action={<span className="ACTION" />} />);
      expect(wrapper.find('.ACTION')).to.have.length.above(0);
      wrapper.unmount();
    });
    it('action should render in the navigation item', () => {
      const wrapper = mount(<NavigationItem textAfter={<span className="TEXTAFTER" />} />);
      expect(wrapper.find('.TEXTAFTER')).to.have.length.above(0);
      wrapper.unmount();
    });
    it('textAfter should not render if the prop is not set', () => {
      const wrapper = mount(<NavigationItem />);
      expect(wrapper.find('TextAfter').length).to.equal(0);
      wrapper.unmount();
    });
    it('action should not render if the prop is not set', () => {
      const wrapper = mount(<NavigationItem />);
      expect(wrapper.find(`.${action}`).length).to.equal(0);
      wrapper.unmount();
    });
    it('textAfter and action should both be renderable at the same time', () => {
      const both = mount(
        <NavigationItem
          action={<span className="ACTION" />}
          textAfter={<span className="TEXTAFTER" />}
        />
      );
      expect(both.find('.ACTION')).to.have.length.above(0);
      expect(both.find('.TEXTAFTER')).to.have.length.above(0);
      both.unmount();
    });
    it('subText should render in the navigation item', () => {
      const wrapper = mount(<NavigationItem subText="SUBTEXT" />);
      expect(wrapper.html()).to.contain('SUBTEXT');
      wrapper.unmount();
    });
    it('subText should render in the navigation item when it is compact', () => {
      const wrapper = mount(<NavigationItem isCompact subText="SUBTEXT" />);
      expect(wrapper.html()).to.contain('SUBTEXT');
      wrapper.unmount();
    });
  });
  describe('behaviour', () => {
    it('mousedown on the link is prevented', () => {
      const spy = sinon.spy();
      const wrapper = mount(<NavigationItem href="foo" />);
      wrapper.find(`.${link}`).simulate('mouseDown', {
        preventDefault: spy,
      });
      expect(spy.called).to.equal(true);
      wrapper.unmount();
    });
  });
});
