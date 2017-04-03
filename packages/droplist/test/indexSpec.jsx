import sinon from 'sinon';

import React from 'react';
import { shallow, mount } from 'enzyme';
import Group from '@atlaskit/droplist-group';
import Trigger from '@atlaskit/droplist-trigger';
import Item from '@atlaskit/droplist-item';
import Layer from '@atlaskit/layer';

import { name } from '../package.json';
import { locals as styles } from '../src/styles.less';

import Droplist from '../src';

const itemsList = (<Group heading="test1">
  <Item>Some text</Item>
</Group>);

describe(name, () => {
  it('should be possible to create a component', () => {
    expect(shallow(<Droplist>test</Droplist>)).not.to.equal(undefined);
  });

  describe('render', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<Droplist trigger="text" isOpen>{itemsList}</Droplist>);
    });

    it('should render Layer component', () => {
      expect(wrapper.find(`.${styles.dropWrapper}`)).to.have.length.above(0);
      const layer = wrapper.find(`.${styles.dropWrapper}`).children().first();
      const layerNode = layer.node;
      expect(layerNode instanceof Layer).to.equal(true);
      expect(layer.find(`.${styles.dropContent}`).length).to.equal(1);
      expect(layer.find(`.${styles.dropTrigger}`).length).to.equal(1);
    });

    it('should pass required properties to Layer', () => {
      const layer = wrapper.find(`.${styles.dropWrapper}`).children().first();
      expect(layer.prop('offset')).to.equal('0 4');
      expect(layer.prop('position')).to.equal('bottom left');
      expect(layer.prop('autoPosition')).to.equal(wrapper.props().shouldFlip);
      expect(layer.prop('content')).to.not.equal(undefined);
    });

    it('should render droplist content', () => {
      const content = wrapper.find(`.${styles.dropContent}`);
      expect(content.children().nodes[0] instanceof Group).to.equal(true);
    });

    it('should render trigger', () => {
      const triggerWrapper = wrapper.find(`.${styles.dropTrigger}`);
      const trigger = triggerWrapper.children().nodes[0];

      expect(trigger instanceof Trigger).to.equal(true);
      expect(triggerWrapper.text()).to.equal('text');
    });
  });

  describe('onOpenChange', () => {
    it('should be open when the isOpen property set to true', () => {
      expect(mount(<Droplist trigger="text">{itemsList}</Droplist>).find(`.${styles.dropContent}`).length).to.equal(0);
      expect(mount(<Droplist trigger="text" isOpen>{itemsList}</Droplist>).find(`.${styles.dropContent}`).length).to.equal(1);
    });

    it('interacting with trigger should call onOpenChange callback', () => {
      const spy = sinon.spy();
      const wrapper = mount(<Droplist trigger="text" onOpenChange={spy}>{itemsList}</Droplist>);
      const trigger = wrapper.find(`.${styles.dropTrigger}`).children().first();
      trigger.simulate('click');
      expect(spy.called).to.equal(true);
      expect(spy.callCount).to.equal(1);
    });
  });

  describe('focus', () => {
    describe('getPrevFocusable', () => {
      it('should return previous item when passed an item', () => {
        const Items = (<Group heading="group">
          <Item>0</Item><Item>1</Item><Item>2</Item>
        </Group>);

        const wrapper = mount(<Droplist trigger="test" isOpen>{Items}</Droplist>);

        expect(wrapper.instance().getPrevFocusable(1)).to.equal(0);
      });

      it('should skip hidden items', () => {
        const Items = (<Group heading="group">
          <Item>0</Item><Item>1</Item><Item isHidden>2</Item><Item isHidden>3</Item><Item>4</Item>
        </Group>);

        const wrapper = mount(<Droplist trigger="test" isOpen>{Items}</Droplist>);

        expect(wrapper.instance().getPrevFocusable(4)).to.equal(1);
      });

      it('should return the first item if there is nothing before', () => {
        const Items = (<Group heading="group">
          <Item>0</Item><Item>1</Item><Item>2</Item>
        </Group>);

        const wrapper = mount(<Droplist trigger="test" isOpen>{Items}</Droplist>);

        expect(wrapper.instance().getPrevFocusable(0)).to.equal(0);
      });

      it('should return the first non-hidden item if the first item is hidden', () => {
        const Items = (<Group heading="group">
          <Item isHidden>0</Item><Item isHidden>1</Item><Item>2</Item>
        </Group>);

        const wrapper = mount(<Droplist trigger="test" isOpen>{Items}</Droplist>);

        expect(wrapper.instance().getPrevFocusable(2)).to.equal(2);
      });
    });

    describe('getNextFocusable', () => {
      it('should return the first item when called without an argument', () => {
        const Items = (<Group heading="group">
          <Item>0</Item><Item>1</Item>
        </Group>);

        const wrapper = mount(<Droplist trigger="test" isOpen>{Items}</Droplist>);

        expect(wrapper.instance().getNextFocusable()).to.equal(0);
      });

      it('if the first item is hidden it should return next available item', () => {
        const Items = (<Group heading="group">
          <Item isHidden>0</Item><Item isHidden>1</Item><Item>2</Item>
        </Group>);

        const wrapper = mount(<Droplist trigger="test" isOpen>{Items}</Droplist>);

        expect(wrapper.instance().getNextFocusable()).to.equal(2);
      });

      it('should return next item when passed an item', () => {
        const Items = (<Group heading="group">
          <Item>0</Item><Item>1</Item><Item>2</Item>
        </Group>);

        const wrapper = mount(<Droplist trigger="test" isOpen>{Items}</Droplist>);

        expect(wrapper.instance().getNextFocusable(1)).to.equal(2);
      });

      it('should skip hidden items', () => {
        const Items = (<Group heading="group">
          <Item>0</Item><Item>1</Item><Item isHidden>2</Item><Item isHidden>3</Item><Item>4</Item>
        </Group>);

        const wrapper = mount(<Droplist trigger="test" isOpen>{Items}</Droplist>);

        expect(wrapper.instance().getNextFocusable(1)).to.equal(4);
      });

      it('should return the latest item if there is nothing beyond', () => {
        const Items = (<Group heading="group">
          <Item>0</Item><Item>1</Item><Item>2</Item>
        </Group>);

        const wrapper = mount(<Droplist trigger="test" isOpen>{Items}</Droplist>);

        expect(wrapper.instance().getNextFocusable(2)).to.equal(2);
      });

      it('should return the latest non-hidden item if the latest item is hidden', () => {
        const Items = (<Group heading="group">
          <Item>0</Item><Item>1</Item><Item>2</Item><Item isHidden>3</Item><Item isHidden>4</Item>
        </Group>);

        const wrapper = mount(<Droplist trigger="test" isOpen>{Items}</Droplist>);

        expect(wrapper.instance().getNextFocusable(2)).to.equal(2);
      });
    });
  });
});
