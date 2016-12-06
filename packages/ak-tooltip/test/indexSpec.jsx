import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React from 'react';
import { shallow } from 'enzyme';

// Testing the dumb component
import { Tooltip } from '../src';


const { expect } = chai;
chai.use(chaiEnzyme());


describe('ak-tooltip', () => {
  it('should be possible to create a component', () => {
    const wrapper = shallow(<Tooltip />);
    expect(wrapper).to.be.defined;
  });

  describe('position prop', () => {
    it('should be reflected into Layers position prop when Tooltip is visible', () => {
      const wrapper = shallow(<Tooltip position="bottom" visible><div>Foo</div></Tooltip>);

      expect(wrapper.find('Layer')).to.have.prop('position', 'bottom center');
    });
  });

  describe('description prop', () => {
    it('should be reflected in the Layer content prop when Tooltip is visible', () => {
      const wrapper = shallow(<Tooltip description="Some words!" visible><div>Foo</div></Tooltip>);

      const layer = wrapper.find('Layer');
      expect(layer).to.exist;

      // have to wrap the prop in shallow so that we can run assertions against it.
      const layerContentProp = shallow(layer.prop('content'));
      expect(layerContentProp).to.exist;
      expect(layerContentProp.text()).to.equal('Some words!');
    });

    it('should not be reflected in the Layer content prop when Tooltip is not visible', () => {
      const wrapper = shallow(<Tooltip description="Some words!"><div>Foo</div></Tooltip>);

      const layer = wrapper.find('Layer');
      expect(layer).to.exist;

      expect(layer).to.not.have.prop('content');
    });
  });

  describe('children', () => {
    const wrapper = shallow(<Tooltip><div id="shouldBeRendered">Target</div></Tooltip>);

    it('should be rendered by Tooltip', () => {
      expect(wrapper).to.have.exactly(1).descendants('#shouldBeRendered');
    });
  });

  describe('onMouseOver callback', () => {
    it('should be called when a mouse enters', () => {
      const spy = sinon.spy();
      const wrapper = shallow(<Tooltip onMouseOver={spy} />);

      wrapper.simulate('mouseOver');
      expect(spy).to.have.been.calledOnce;
    });
  });

  describe('onMouseOut callback', () => {
    it('should be called when a mouse leaves', () => {
      const spy = sinon.spy();
      const wrapper = shallow(<Tooltip onMouseOut={spy} />);

      wrapper.simulate('mouseOut');
      expect(spy).to.have.been.calledOnce;
    });
  });
});
