import sinon from 'sinon';

import React from 'react';
import { mount, shallow } from 'enzyme';
import Layer from '@atlaskit/layer';
import sinon from 'sinon';

import InlineDialog from '../../src';
import Container from '../../src/styled/Container';

describe('inline-dialog', () => {
  describe('default', () => {
    it('should have the expected default props', () => {
      const wrapper = mount(<InlineDialog />);

      expect(wrapper.prop('position')).to.equal('bottom center');
      expect(wrapper.prop('isOpen')).to.equal(false);
      expect(wrapper.prop('content')).to.equal(undefined);
      expect(wrapper.prop('shouldFlip')).to.equal(false);
    });

    it('should pass the expected default props to Layer', () => {
      const wrapper = mount(<InlineDialog />);
      const layer = wrapper.find(Layer);
      expect(layer.prop('autoFlip')).to.equal(false);
      expect(layer.prop('content')).to.equal(null);
      expect(layer.prop('position')).to.equal('bottom center');
      expect(layer.prop('offset')).to.equal('0 8');
    });

    it('should render any children passed to it', () => {
      const wrapper = shallow(<InlineDialog><div id="children" /></InlineDialog>);
      expect(wrapper.find('#children').exists()).to.equal(true);
    });
  });

  describe('isOpen prop', () => {
    it('should render the content container if isOpen is set', () => {
      const wrapper = mount(<InlineDialog isOpen />);
      expect(wrapper.find(Container).exists()).to.equal(true);
    });

    it('should not render the content container if isOpen is not set', () => {
      const wrapper = mount(<InlineDialog />);
      expect(wrapper.find(Container).exists()).to.equal(false);
    });
  });

  describe('content prop', () => {
    const content = (<div id="someContent">This is some content</div>);

    it('should render content if isOpen is set', () => {
      const wrapper = mount(<InlineDialog content={content} isOpen />);
      expect(wrapper.find('#someContent').exists()).to.equal(true);
    });

    it('should not render content if isOpen is not set', () => {
      const wrapper = mount(<InlineDialog content={content} />);
      expect(wrapper.find('#content').exists()).to.equal(false);
    });

    it('should reflect content prop onto Layer if isOpen is set', () => {
      const wrapper = shallow(<InlineDialog content={content} isOpen />);
      const layer = wrapper.find(Layer);
      const foo = shallow(layer.prop('content'));
      expect(foo.find('#someContent')).to.have.length.above(0);
    });
  });

  describe('position prop', () => {
    it('should be reflected onto the Layer component', () => {
      const wrapper = shallow(<InlineDialog position="right middle" />);
      const layer = wrapper.find(Layer);
      expect(layer).to.have.length.above(0);
      expect(layer.prop('position')).to.equal('right middle');
    });
  });

  describe('shouldFlip prop', () => {
    describe('should be reflected onto the Layer component', () => {
      it('for a boolean value', () => {
        const wrapper = mount(<InlineDialog shouldFlip />);
        const layer = wrapper.find(Layer);
        expect(layer).to.have.length.above(0);
        expect(layer.prop('autoFlip')).to.equal(true);
      });

      it('for an array of strings', () => {
        const shouldFlipValue = ['top', 'bottom'];
        const wrapper = mount(<InlineDialog shouldFlip={shouldFlipValue} />);
        const layer = wrapper.find(Layer);
        expect(layer).to.have.length.above(0);
        expect(layer.prop('autoFlip')).to.equal(shouldFlipValue);
      });
    });
  });

  describe('onContentClick', () => {
    it('should be triggered when the content is clicked', () => {
      const spy = sinon.spy();
      const wrapper = mount(
        <InlineDialog onContentClick={spy} content={<div>content</div>} isOpen />
      );
      const content = mount(wrapper.find(Layer).props().content);

      content.simulate('click');
      expect(spy.callCount).to.equal(1);
    });
  });

  describe('onContentFocus', () => {
    it('should be triggered when an element in the content is focused', () => {
      const spy = sinon.spy();
      const linkEl = <a id="link" href="/test">a link</a>;
      const wrapper = mount(<InlineDialog onContentFocus={spy} content={linkEl} isOpen />);
      const content = mount(wrapper.find(Layer).props().content);

      content.find('#link').simulate('focus');
      expect(spy.callCount).to.equal(1);
    });
  });

  describe('onContentBlur', () => {
    it('should be triggered when an element in the content is blurred', () => {
      const spy = sinon.spy();
      const linkEl = <a id="link" href="/test">a link</a>;
      const wrapper = mount(<InlineDialog onContentBlur={spy} content={linkEl} isOpen />);
      const content = mount(wrapper.find(Layer).props().content);

      content.find('#link').simulate('blur');
      expect(spy.callCount).to.equal(1);
    });
  });

  describe('handleClickOutside', () => {
    it('should trigger the onClose prop', () => {
      const spy = sinon.spy();
      const wrapper = mount(<InlineDialog onClose={spy} isOpen />);
      const event = {
        target: document.createElement('div'),
      };

      wrapper.instance().handleClickOutside(event);

      expect(spy.callCount).to.equal(1);
      expect(spy.getCall(0).args[0].isOpen).to.equal(false);
    });

    it('should NOT trigger the onClose prop when isOpen is false', () => {
      const spy = sinon.spy();
      const wrapper = mount(<InlineDialog onClose={spy} />);
      const event = {
        target: document.createElement('div'),
      };

      wrapper.instance().handleClickOutside(event);

      expect(spy.callCount).to.equal(0);
    });
  });
});
