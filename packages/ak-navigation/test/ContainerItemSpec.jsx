import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import React from 'react';
import {
  isSelected,
  isCompact,
  containerItemOuter,
  link,
} from 'style!../src/components/less/ContainerItem.less';
import ContainerItem from '../src/components/js/ContainerItem';

chai.use(chaiAsPromised);
chai.use(chaiEnzyme());
chai.should();
const expect = chai.expect;

describe('<ContainerItem />', () => {
  describe('props', () => {
    it('icon should render an image', () => {
      expect(mount(<ContainerItem icon={<img alt="foo" />} />)).to.have.exactly(1).descendants('img');
    });
    it('isSelected=true should render with the isSelected class', () => {
      expect(mount(<ContainerItem isSelected />).find(`.${containerItemOuter}`)).to.have.className(isSelected);
    });
    it('isSelected=false should not render with the isSelected class', () => {
      expect(mount(<ContainerItem />).find(`.${containerItemOuter}`)).to.not.have.className(isSelected);
    });
    it('isCompact=true should render with the isCompact class', () => {
      expect(mount(<ContainerItem isCompact />).find(`.${containerItemOuter}`)).to.have.className(isCompact);
    });
    it('href should render onto the link', () => {
      expect(mount(<ContainerItem href="foo" />).find(`.${link}`).props().href).to.equal('foo');
    });
    it('with no href should not render a link', () => {
      expect(mount(<ContainerItem />).find('a')).to.not.exist;
    });
    it('linkComponent should render a custom link component', () => {
      const customLink = mount(
        <ContainerItem
          href="#custom-href"
          linkComponent={({ children, href }) => <a className="custom" href={href}>{children}</a>}
        />
      ).find('.custom');
      expect(customLink).to.exist;
      expect(customLink.props().href).to.equal('#custom-href');
    });
    it('textAfter should render in the container item', () => {
      expect(mount(<ContainerItem action={<span className="ACTION" />} />).find('.ACTION')).to.exist;
    });
    it('action should render in the container item', () => {
      expect(mount(<ContainerItem textAfter={<span className="TEXTAFTER" />} />).find('.TEXTAFTER')).to.exist;
    });
    it('textAfter and action should both be renderable at the same time', () => {
      const both = mount(
        <ContainerItem
          textAfter={<span className="TEXTAFTER" />}
          action={<span className="ACTION" />}
        />
      );
      expect(both.find('.ACTION')).to.exist;
      expect(both.find('.TEXTAFTER')).to.exist;
    });
  });
  describe('behaviour', () => {
    it('mousedown on the link is prevented', () => {
      const spy = sinon.spy();
      mount(<ContainerItem href="foo" />).find(`.${link}`).simulate('mouseDown', {
        preventDefault: spy,
      });
      expect(spy).to.have.been.called;
    });
  });
});
