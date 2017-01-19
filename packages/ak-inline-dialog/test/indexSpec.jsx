import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';
import React from 'react';
import { shallow, mount } from 'enzyme';
import Layer from 'ak-layer';

import InlineDialog from '../src';
import styles from '../src/styles.less';

const { expect } = chai;
chai.use(chaiEnzyme());
chai.use(sinonChai);

const containerClass = styles.locals.inlineDialogContainer;

describe('ak-inline-dialog', () => {
  it('should be possible to create a component', () => {
    const wrapper = shallow(<InlineDialog />);
    expect(wrapper).not.to.equal(undefined);
  });

  describe('default', () => {
    it('should have the expected default props', () => {
      const wrapper = mount(<InlineDialog />);
      expect(wrapper).to.have.prop('position', 'bottom center');
      expect(wrapper).to.have.prop('isOpen', false);
      expect(wrapper).to.have.prop('content', null);
      expect(wrapper).to.have.prop('shouldFlip', false);
    });

    it('should pass the expected default props to Layer', () => {
      const wrapper = mount(<InlineDialog />);
      const layer = wrapper.find(Layer);
      expect(layer).to.have.prop('autoPosition', false);
      expect(layer).to.have.prop('content', null);
      expect(layer).to.have.prop('position', 'bottom center');
      expect(layer).to.have.prop('offset', '0 8');
    });

    it('should render any children passed to it', () => {
      const wrapper = mount(<InlineDialog><div id="children" /></InlineDialog>);
      expect(wrapper.find('#children')).not.to.equal(undefined);
    });
  });

  describe('isOpen prop', () => {
    it('should render the content container if isOpen is set', () => {
      const wrapper = mount(<InlineDialog isOpen />);
      expect(wrapper.find(`.${containerClass}`)).not.to.equal(undefined);
    });

    it('should not render the content container if isOpen is not set', () => {
      const wrapper = mount(<InlineDialog />);
      expect(wrapper.find(`.${containerClass}`)).to.not.exist;
    });
  });

  describe('content prop', () => {
    const content = (<div id="someContent">This is some content</div>);

    it('should render content if isOpen is set', () => {
      const wrapper = mount(<InlineDialog content={content} isOpen />);
      expect(wrapper.find('#someContent')).not.to.equal(undefined);
    });

    it('should not render content if isOpen is not set', () => {
      const wrapper = mount(<InlineDialog content={content} />);
      expect(wrapper.find('#content')).to.not.exist;
    });

    it('should reflect content prop onto Layer if isOpen is set', () => {
      const wrapper = mount(<InlineDialog content={content} isOpen />);
      const layer = wrapper.find(Layer);
      const foo = mount(layer.prop('content'));
      expect(foo.find('#someContent')).not.to.equal(undefined);
    });
  });

  describe('position prop', () => {
    it('should be reflected onto the Layer component', () => {
      const wrapper = mount(<InlineDialog position="right middle" />);
      const layer = wrapper.find(Layer);
      expect(layer).not.to.equal(undefined);
      expect(layer).to.have.prop('position', 'right middle');
    });
  });

  describe('shouldFlip prop', () => {
    it('should be reflected onto the Layer component', () => {
      const wrapper = mount(<InlineDialog shouldFlip />);
      const layer = wrapper.find(Layer);
      expect(layer).not.to.equal(undefined);
      expect(layer).to.have.prop('autoPosition', true);
    });
  });
});
