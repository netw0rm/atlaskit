import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import React from 'react';
import sinonChai from 'sinon-chai';
import DefaultLinkComponent from '../src/components/js/DefaultLinkComponent';

chai.use(chaiAsPromised);
chai.use(chaiEnzyme());
chai.use(sinonChai);
chai.should();
const expect = chai.expect;

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
      expect(mouseDown).to.have.been.called;
    });
    it('renders children directly when no href is given', () => {
      expect(shallow(<DefaultLinkComponent><span>foo</span></DefaultLinkComponent>)
        .find('a').length).to.equal(0);
    });
  });
});

