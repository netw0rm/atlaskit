import chai from 'chai';
import React from 'react';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import { shallow, mount } from 'enzyme';
import Group from 'ak-droplist-group';
import Trigger from 'ak-droplist-trigger';
import Item from 'ak-droplist-item';
import Layer from 'ak-layer';

import { name } from '../package.json';
import { locals as styles } from '../src/styles.less';

import Menu from '../src';

chai.use(chaiAsPromised);
chai.use(chaiEnzyme());

const { expect } = chai;

const itemsList = [
  {
    heading: 'test1',
    items: [
      {
        content: 'Some text',
      },
    ],
  },
  {
    heading: 'test2',
    items: [],
  },
];

describe(name, () => {
  it('should be possible to create a component', () => {
    expect(shallow(<Menu items={[]}>test</Menu>)).to.exist;
  });

  describe('render', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<Menu items={itemsList} defaultOpen>text</Menu>);
    });

    it('should render Layer component', () => {
      expect(wrapper.find(`.${styles.dropWrapper}`)).to.exist;
      const layer = wrapper.find(`.${styles.dropWrapper}`).children().first();
      const layerNode = layer.node;
      expect(layerNode instanceof Layer).to.be.true;
      expect(layer).to.have.exactly(1).descendants(`.${styles.dropContent}`);
      expect(layer).to.have.exactly(1).descendants(`.${styles.dropTrigger}`);
    });

    it('should pass required properties to Layer', () => {
      const layer = wrapper.find(`.${styles.dropWrapper}`).children().first();
      expect(layer).to.have.prop('offset', '0 4');
      expect(layer).to.have.prop('position', 'bottom left');
      expect(layer).to.have.prop('content');
    });

    it('should render groups from the fist-level children', () => {
      const content = wrapper.find(`.${styles.dropContent}`);
      expect(content.children().nodes[0] instanceof Group).to.be.true;
      expect(content.children().nodes[1] instanceof Group).to.be.true;
    });

    it('should render items inside groups', () => {
      const content = wrapper.find(`.${styles.dropContent}`);
      const group = content.children().nodes[0];
      expect(group.props.children[0].type === Item).to.be.true;
    });

    it('should render trigger', () => {
      const triggerWrapper = wrapper.find(`.${styles.dropTrigger}`);
      const trigger = triggerWrapper.children().nodes[0];

      expect(trigger instanceof Trigger).to.be.true;
      expect(triggerWrapper).to.have.text('text');
    });

    it('should support external trigger rendering', () => {
      wrapper = mount(<Menu items={itemsList} defaultOpen><Trigger>text</Trigger></Menu>);
      const triggerWrapper = wrapper.find(`.${styles.dropTrigger}`);
      const trigger = triggerWrapper.children().nodes[0];

      expect(trigger instanceof Trigger).to.be.true;
      expect(triggerWrapper).to.have.text('text');
    });
  });

  describe('show/hide logic', () => {
    it('should be open when the defaultOpen property set to true', () => {
      expect(shallow(<Menu items={[]} defaultOpen>text</Menu>).state().isOpen).to.be.true;
    });

    it('interacting with trigger should open the dropdown', () => {
      const wrapper = mount(<Menu items={itemsList}><Trigger>text</Trigger></Menu>);
      const trigger = wrapper.find(`.${styles.dropTrigger}`).children().first();
      expect(wrapper.state().isOpen).to.be.false;
      trigger.simulate('click');
      expect(wrapper.state().isOpen).to.be.true;
    });

    it('click outside should close the dropdown', () => {
      const wrapper = mount(<Menu items={itemsList} defaultOpen><Trigger>text</Trigger></Menu>);
      expect(wrapper.state().isOpen).to.be.true;
      document.body.click();
      expect(wrapper.state().isOpen).to.be.false;
    });

    it('interacting with an item should close the dropdown', () => {
      const wrapper = mount(<Menu items={itemsList} defaultOpen><Trigger>text</Trigger></Menu>);
      const item = mount(wrapper.children().props().content.props.children[0].props.children[0]);
      expect(wrapper.state().isOpen).to.be.true;
      item.simulate('click');
      expect(wrapper.state().isOpen).to.be.false;
    });
  });
});
