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
      expect(mount(<NavigationItem icon={<img alt="foo" />} />).find('img').length).to.equal(1);
    });
    it('isSelected=true should render with the isSelected class', () => {
      expect((mount(<NavigationItem isSelected />).find(`.${navigationItemOuter}`)).hasClass((isSelected))).to.equal(true);
    });
    it('isSelected=false should not render with the isSelected class', () => {
      expect(mount(<NavigationItem />).find(`.${navigationItemOuter}`).hasClass(isSelected)).to.equal(false);
    });
    it('isCompact=true should render with the isCompact class', () => {
      expect((mount(<NavigationItem isCompact />).find(`.${navigationItemOuter}`)).hasClass((isCompact))).to.equal(true);
    });
    it('with a href should render onto the link', () => {
      expect(mount(<NavigationItem href="foo" />).find(`.${link}`).props().href).to.equal('foo');
    });
    it('with no href should not render a link', () => {
      expect(mount(<NavigationItem />).find('a').length).to.equal(0);
    });
    it('with an onClick should call the onClick', () => {
      const spy = sinon.spy();
      const navigation = mount(<NavigationItem onClick={spy} />);
      navigation.find('button').simulate('click');
      expect(spy.calledOnce).to.equal(true);
    });
    it('with an onClick and href should render the href on a link, and bind the onClick to it', () => {
      const spy = sinon.spy();
      const navigation = mount(<NavigationItem href="foo" onClick={spy} />);
      navigation.find('a').simulate('click');
      expect(spy.calledOnce).to.equal(true);
      expect(navigation.find('a').props().href).to.equal('foo');
    });
    it('linkComponent should render a custom link component', () => {
      const customLink = mount(
        <NavigationItem
          href="#custom-href"
          linkComponent={({ children, href }) => <a className="custom" href={href}>{children}</a>}
        />
      ).find('.custom');
      expect(customLink).not.to.equal(undefined);
      expect(customLink.props().href).to.equal('#custom-href');
    });
    it('textAfter should render in the navigation item', () => {
      expect(mount(<NavigationItem action={<span className="ACTION" />} />).find('.ACTION')).to.have.length.above(0);
    });
    it('action should render in the navigation item', () => {
      expect(mount(<NavigationItem textAfter={<span className="TEXTAFTER" />} />).find('.TEXTAFTER')).to.have.length.above(0);
    });
    it('textAfter should not render if the prop is not set', () => {
      expect(mount(<NavigationItem />).find('TextAfter').length).to.equal(0);
    });
    it('action should not render if the prop is not set', () => {
      expect(mount(<NavigationItem />).find(`.${action}`).length).to.equal(0);
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
    });
    it('subText should render in the navigation item', () => {
      expect(mount(<NavigationItem subText="SUBTEXT" />).html()).to.contain('SUBTEXT');
    });
    it('subText should render in the navigation item when it is compact', () => {
      expect(mount(<NavigationItem isCompact subText="SUBTEXT" />).html()).to.contain('SUBTEXT');
    });
  });
  describe('behaviour', () => {
    it('mousedown on the link is prevented', () => {
      const spy = sinon.spy();
      mount(<NavigationItem href="foo" />).find(`.${link}`).simulate('mouseDown', {
        preventDefault: spy,
      });
      expect(spy.called).to.equal(true);
    });
  });
});
