import chai from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import {
  isSelected,
  isCompact,
  navigationItemOuter,
  link,
} from 'style!../src/components/less/NavigationItem.less';
import NavigationItem from '../src/components/js/NavigationItem';

chai.should();
const expect = chai.expect;

describe('<NavigationItem />', () => {
  describe('props', () => {
    it('icon should render an image', () => {
      expect(mount(<NavigationItem icon={<img alt="foo" />} />).find('img').length).to.equal(1);
    });
    it('isSelected=true should render with the isSelected class', () => {
      expect((mount(<NavigationItem isSelected />).find(`.${navigationItemOuter}`)).hasClass((isSelected))).to.equal(true);
    });
    it('isSelected=false should not render with the isSelected class', () => {
      expect(mount(<NavigationItem />).find(`.${navigationItemOuter}`)).to.not.have.className(isSelected);
    });
    it('isCompact=true should render with the isCompact class', () => {
      expect((mount(<NavigationItem isCompact />).find(`.${navigationItemOuter}`)).hasClass((isCompact))).to.equal(true);
    });
    it('href should render onto the link', () => {
      expect(mount(<NavigationItem href="foo" />).find(`.${link}`).props().href).to.equal('foo');
    });
    it('with no href should not render a link', () => {
      expect(mount(<NavigationItem />).find('a').length).to.equal(0);
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
    it('textAfter and action should both be renderable at the same time', () => {
      const both = mount(
        <NavigationItem
          textAfter={<span className="TEXTAFTER" />}
          action={<span className="ACTION" />}
        />
      );
      expect(both.find('.ACTION')).to.have.length.above(0);
      expect(both.find('.TEXTAFTER')).to.have.length.above(0);
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
