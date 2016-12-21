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
import getAvailableNextItem from '../src/internal/getAvailableNextItem';
import getAvailablePreviousItem from '../src/internal/getAvailablePreviousItem';

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

    it('should render groups from the first-level children', () => {
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
      const wrapper2 = mount(<Menu items={itemsList} defaultOpen><Trigger>text</Trigger></Menu>);
      const triggerWrapper = wrapper2.find(`.${styles.dropTrigger}`);
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

    it('interacting with link item should close the dropdown', () => {
      const items = [{
        heading: 'group',
        items: [
          { content: 'item 1', href: '#' },
        ],
      }];
      const wrapper = mount(<Menu items={items} defaultOpen><Trigger>text</Trigger></Menu>);
      const item = wrapper.find('[role="menuitem"]');
      expect(wrapper.state().isOpen).to.be.true;
      item.simulate('click');
      expect(wrapper.state().isOpen).to.be.false;
    });

    it('interacting with checkbox item should not close the menu', () => {
      const items = [{
        heading: 'group',
        items: [
          { content: 'item 1', type: 'checkbox' },
        ],
      }];
      const wrapper = mount(<Menu items={items} defaultOpen><Trigger>text</Trigger></Menu>);
      const item = wrapper.find('[role="menuitemcheckbox"]');
      expect(wrapper.state().isOpen).to.be.true;
      item.simulate('click');
      expect(wrapper.state().isOpen).to.be.true;
    });

    it('interacting with radio item should not close the menu', () => {
      const items = [{
        heading: 'group',
        items: [
          { content: 'item 1', type: 'radio' },
        ],
      }];
      const wrapper = mount(<Menu items={items} defaultOpen><Trigger>text</Trigger></Menu>);
      const item = wrapper.find('[role="menuitemradio"]');
      expect(wrapper.state().isOpen).to.be.true;
      item.simulate('click');
      expect(wrapper.state().isOpen).to.be.true;
    });
  });

  describe('handleItemActivation', () => {
    describe('radio', () => {
      const attrs = { item: { props: { type: 'radio' } }, event: { type: 'click' } };
      const item1 = { content: 'item 1', type: 'radio' };
      const item2 = { content: 'item 2', type: 'radio' };
      const group = {
        heading: 'group',
        items: [item1, item2],
      };
      const items = [group];
      let wrapper;
      let handler;

      beforeEach(() => {
        wrapper = mount(<Menu items={items} defaultOpen><Trigger>text</Trigger></Menu>);
        handler = wrapper.instance().handleItemActivation;
      });

      it('should set `checked` to true when the radio item is activated', () => {
        handler(attrs, group, item1);
        const stateItems = wrapper.state('items');
        expect(stateItems[0].items[0].isChecked).to.be.true;
      });

      it('should stay `checked` if the item is activated more then once', () => {
        handler(attrs, group, item1);
        handler(attrs, group, item1);
        const stateItems = wrapper.state('items');
        expect(stateItems[0].items[0].isChecked).to.be.true;
      });

      it('should switch `checked` item to the new one, only one item can be checked', () => {
        handler(attrs, group, item1);
        const stateItems = wrapper.state('items');
        expect(stateItems[0].items[0].isChecked).to.be.true;
        expect(stateItems[0].items[1].isChecked).to.be.false;
        handler(attrs, group, item2);
        expect(stateItems[0].items[0].isChecked).to.be.false;
        expect(stateItems[0].items[1].isChecked).to.be.true;
      });
    });

    describe('checkbox', () => {
      let attrs;
      let item1;
      let item2;
      let group = {
        heading: 'group',
        items: [item1, item2],
      };
      let items = [group];
      let wrapper;
      let handler;

      beforeEach(() => {
        attrs = { item: { props: { type: 'checkbox' } }, event: { type: 'click' } };
        item1 = { content: 'item 1', type: 'checkbox' };
        item2 = { content: 'item 2', type: 'checkbox' };
        group = {
          heading: 'group',
          items: [item1, item2],
        };
        items = [group];
        wrapper = shallow(<Menu items={items} defaultOpen><Trigger>text</Trigger></Menu>);
        handler = wrapper.instance().handleItemActivation;
      });

      it('should set `checked` to true when the checkbox item is activated', () => {
        handler(attrs, group, item1);
        const stateItems = wrapper.state('items');
        expect(stateItems[0].items[0].isChecked).to.be.true;
      });

      it('should toggle `checked` if the item is activated more then once', () => {
        const stateItems = wrapper.state('items');
        handler(attrs, group, item1);
        handler(attrs, group, item1);
        expect(stateItems[0].items[0].isChecked).to.be.false;
      });

      it('should not affect neighbours', () => {
        const stateItems = wrapper.state('items');
        handler(attrs, group, item1);
        expect(stateItems[0].items[0].isChecked).to.be.true;
        expect(stateItems[0].items[1].isChecked).to.be.undefined;
        handler(attrs, group, item2);
        expect(stateItems[0].items[0].isChecked).to.be.true;
        expect(stateItems[0].items[1].isChecked).to.be.true;
      });
    });
  });

  describe('getAvailableNextItem', () => {
    const items = [{
      heading: 'first group',
      items: [
        { content: 'item 1' },
        { content: 'item 2' },
        { content: 'item 3' },
      ],
    }, {
      heading: 'second group',
      items: [
        { content: 'item 4' },
        { content: 'item 5' },
        { content: 'item 6' },
      ],
    }];

    it('should return first item if there is no currentFocus', () => {
      expect(getAvailableNextItem(items, undefined)).to.deep.equal({ item: 0, group: 0 });
    });

    it('should return next item in list', () => {
      expect(getAvailableNextItem(items,
        { item: 0, group: 0 })).to.deep.equal({ item: 1, group: 0 });
    });

    it('should go from group to group', () => {
      expect(getAvailableNextItem(items,
        { item: 2, group: 0 })).to.deep.equal({ item: 0, group: 1 });
    });

    it('should stay on the latest item if there are no items left', () => {
      expect(getAvailableNextItem(items,
        { item: 2, group: 1 })).to.deep.equal({ item: 2, group: 1 });
    });
  });

  describe('getAvailablePreviousItem', () => {
    const items = [{
      heading: 'first group',
      items: [
        { content: 'item 1' },
        { content: 'item 2' },
        { content: 'item 3' },
      ],
    }, {
      heading: 'second group',
      items: [
        { content: 'item 4' },
        { content: 'item 5' },
        { content: 'item 6' },
      ],
    }];

    it('should return previous item in list', () => {
      expect(getAvailablePreviousItem(items,
        { item: 1, group: 0 })).to.deep.equal({ item: 0, group: 0 });
    });

    it('should go from group to group', () => {
      expect(getAvailablePreviousItem(items,
        { item: 0, group: 1 })).to.deep.equal({ item: 2, group: 0 });
    });

    it('should stay on the first item if there are no items left', () => {
      expect(getAvailablePreviousItem(items,
        { item: 0, group: 0 })).to.deep.equal({ item: 0, group: 0 });
    });
  });
});
