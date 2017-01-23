import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
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

chai.use(chaiEnzyme());
chai.should();
const expect = chai.expect;

describe('<NavigationItem />', () => {
  describe('props', () => {
    it('icon should render an image', () => {
      expect(mount(<NavigationItem icon={<img alt="foo" />} />)).to.have.exactly(1).descendants('img');
    });
    it('isSelected=true should render with the isSelected class', () => {
      expect(mount(<NavigationItem isSelected />).find(`.${navigationItemOuter}`)).to.have.className(isSelected);
    });
    it('isSelected=false should not render with the isSelected class', () => {
      expect(mount(<NavigationItem />).find(`.${navigationItemOuter}`)).to.not.have.className(isSelected);
    });
    it('isCompact=true should render with the isCompact class', () => {
      expect(mount(<NavigationItem isCompact />).find(`.${navigationItemOuter}`)).to.have.className(isCompact);
    });
    it('href should render onto the link', () => {
      expect(mount(<NavigationItem href="foo" />).find(`.${link}`).props().href).to.equal('foo');
    });
    it('with no href should not render a link', () => {
      expect(mount(<NavigationItem />).find('a')).to.not.exist;
    });
    it('linkComponent should render a custom link component', () => {
      const customLink = mount(
        <NavigationItem
          href="#custom-href"
          linkComponent={({ children, href }) => <a className="custom" href={href}>{children}</a>}
        />
      ).find('.custom');
      expect(customLink).to.exist;
      expect(customLink.props().href).to.equal('#custom-href');
    });
    it('textAfter should render in the navigation item', () => {
      expect(mount(<NavigationItem action={<span className="ACTION" />} />).find('.ACTION')).to.exist;
    });
    it('action should render in the navigation item', () => {
      expect(mount(<NavigationItem textAfter={<span className="TEXTAFTER" />} />).find('.TEXTAFTER')).to.exist;
    });
    it('textAfter should not render if the prop is not set', () => {
      expect(mount(<NavigationItem />).find('TextAfter')).to.not.be.present();
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
      expect(both.find('.ACTION')).to.exist;
      expect(both.find('.TEXTAFTER')).to.exist;
    });
    it('subText should render in the navigation item', () => {
      expect(mount(<NavigationItem subText="SUBTEXT" />).html()).to.contain('SUBTEXT');
    });
    it('subText should not render in the navigation item when it is compact', () => {
      expect(mount(<NavigationItem isCompact subText="SUBTEXT" />).html()).to.not.contain('SUBTEXT');
    });
  });
  describe('behaviour', () => {
    it('mousedown on the link is prevented', () => {
      const spy = sinon.spy();
      mount(<NavigationItem href="foo" />).find(`.${link}`).simulate('mouseDown', {
        preventDefault: spy,
      });
      expect(spy).to.have.been.called;
    });
  });
});
