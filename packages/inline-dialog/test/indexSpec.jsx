import React from 'react';
import { shallow, mount } from 'enzyme';
import Layer from 'ak-layer';

import InlineDialog from '../src';
import styles from '../src/styles.less';

const containerClass = styles.locals.inlineDialogContainer;

describe('ak-inline-dialog', () => {
  it('should be possible to create a component', () => {
    const wrapper = shallow(<InlineDialog />);
    expect(wrapper).not.to.equal(undefined);
  });

  describe('default', () => {
    it('should have the expected default props', () => {
      const wrapper = mount(<InlineDialog />);
      expect(wrapper.prop('position')).to.equal('bottom center');
      expect(wrapper.prop('isOpen')).to.equal(false);
      expect(wrapper.prop('content')).to.equal(null);
      expect(wrapper.prop('shouldFlip')).to.equal(false);
    });

    it('should pass the expected default props to Layer', () => {
      const wrapper = mount(<InlineDialog />);
      const layer = wrapper.find(Layer);
      expect(layer.prop('autoPosition')).to.equal(false);
      expect(layer.prop('content')).to.equal(null);
      expect(layer.prop('position')).to.equal('bottom center');
      expect(layer.prop('offset')).to.equal('0 8');
    });

    it('should render any children passed to it', () => {
      const wrapper = mount(<InlineDialog><div id="children" /></InlineDialog>);
      expect(wrapper.find('#children')).to.have.length.above(0);
    });
  });

  describe('isOpen prop', () => {
    it('should render the content container if isOpen is set', () => {
      const wrapper = mount(<InlineDialog isOpen />);
      expect(wrapper.find(`.${containerClass}`)).to.have.length.above(0);
    });

    it('should not render the content container if isOpen is not set', () => {
      const wrapper = mount(<InlineDialog />);
      expect(wrapper.find(`.${containerClass}`).length).to.equal(0);
    });
  });

  describe('content prop', () => {
    const content = (<div id="someContent">This is some content</div>);

    it('should render content if isOpen is set', () => {
      const wrapper = mount(<InlineDialog content={content} isOpen />);
      expect(wrapper.find('#someContent')).to.have.length.above(0);
    });

    it('should not render content if isOpen is not set', () => {
      const wrapper = mount(<InlineDialog content={content} />);
      expect(wrapper.find('#content').length).to.equal(0);
    });

    it('should reflect content prop onto Layer if isOpen is set', () => {
      const wrapper = mount(<InlineDialog content={content} isOpen />);
      const layer = wrapper.find(Layer);
      const foo = mount(layer.prop('content'));
      expect(foo.find('#someContent')).to.have.length.above(0);
    });
  });

  describe('position prop', () => {
    it('should be reflected onto the Layer component', () => {
      const wrapper = mount(<InlineDialog position="right middle" />);
      const layer = wrapper.find(Layer);
      expect(layer).to.have.length.above(0);
      expect(layer.prop('position')).to.equal('right middle');
    });
  });

  describe('shouldFlip prop', () => {
    it('should be reflected onto the Layer component', () => {
      const wrapper = mount(<InlineDialog shouldFlip />);
      const layer = wrapper.find(Layer);
      expect(layer).to.have.length.above(0);
      expect(layer.prop('autoPosition')).to.equal(true);
    });
  });
});
