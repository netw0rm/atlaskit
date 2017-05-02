import React from 'react';
import { shallow, mount } from 'enzyme';
import Layer from '@atlaskit/layer';

import { name } from '../../package.json';

import Droplist, { Item, Group } from '../../src';
import styles from '../../src/styles.less';

const itemsList = (<Group heading="test1">
  <Item>Some text</Item>
</Group>);

describe(`${name} - core`, () => {
  it('should be possible to create a component', () => {
    expect(shallow(<Droplist>test</Droplist>)).not.to.equal(undefined);
  });

  describe('render', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<Droplist trigger="text" isOpen>{itemsList}</Droplist>);
    });

    it('should render Layer component', () => {
      const layer = wrapper.find(Layer);
      const layerNode = layer.node;
      expect(layerNode instanceof Layer).to.equal(true);
      // Check that layer received our content
      expect(layer.find(Group).length).to.equal(1);
      expect(layer.find(`.${styles.trigger}`).length).to.equal(1);
    });

    it('should pass required properties to Layer', () => {
      const layer = wrapper.find(Layer);
      expect(layer.prop('offset')).to.equal('0 8px');
      expect(layer.prop('position')).to.equal('bottom left');
      expect(layer.prop('autoFlip')).to.equal(wrapper.props().shouldFlip);
      expect(layer.prop('content')).to.not.equal(undefined);
    });

    it('should render droplist content', () => {
      // We passed a group as content so we should be able to find one
      expect(wrapper.find(Group).length).to.equal(1);
    });

    it('should render trigger', () => {
      const triggerWrapper = wrapper.find(`.${styles.trigger}`);
      expect(triggerWrapper.text()).to.equal('text');
    });
  });

  describe('onOpenChange', () => {
    it('should be open when the isOpen property set to true', () => {
      expect(mount(<Droplist trigger="text">{itemsList}</Droplist>).find(Group).length).to.equal(0);
      expect(mount(<Droplist trigger="text" isOpen>{itemsList}</Droplist>).find(Group).length).to.equal(1);
    });
  });
});
