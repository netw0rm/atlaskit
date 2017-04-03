import sinon from 'sinon';

import { shallow } from 'enzyme';
import React from 'react';
import DefaultLinkComponent from '../src/components/js/DefaultLinkComponent';

describe('<DefaultLinkComponent />', () => {
  describe('props', () => {
    it('should pass on href to the a tag', () => {
      expect(shallow(<DefaultLinkComponent href="foo" />)
        .find('a').props().href).to.equal('foo');
    });
    it('should pass on className to the a tag', () => {
      expect(shallow(<DefaultLinkComponent href="foo" className="foo" />)
        .find('a').props().className).to.equal('foo');
    });
    it('should pass on mouseDown to the a tag', () => {
      const mouseDown = sinon.spy();
      shallow(<DefaultLinkComponent href="foo" onMouseDown={mouseDown} />)
        .find('a').simulate('mouseDown');
      expect(mouseDown.called).to.equal(true);
    });
    it('should pass on onClick to the a tag', () => {
      const onClick = sinon.spy();
      shallow(<DefaultLinkComponent href="foo" onClick={onClick} />)
        .find('a').simulate('click');
      expect(onClick.called).to.equal(true);
    });
    it('renders children directly when no href is given', () => {
      expect(shallow(<DefaultLinkComponent><span>foo</span></DefaultLinkComponent>)
        .find('a').length).to.equal(0);
    });
  });
});
