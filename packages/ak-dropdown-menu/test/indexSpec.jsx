import chai from 'chai';
import React from 'react';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import { shallow, mount } from 'enzyme';
import Droplist from 'ak-droplist';

import { name } from '../package.json';

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
    expect(shallow(<Menu>test</Menu>)).to.exist;
  });

  describe('render', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<Menu items={itemsList}>text</Menu>);
    });

    it('should render Droplist component', () => {
      expect(wrapper).to.have.exactly(1).descendants(Droplist);
    });

    it('should pass required properties to Droplist', () => {
      const droplist = wrapper.find(Droplist);
      expect(droplist).to.have.prop('position', wrapper.props().position);
      expect(droplist).to.have.prop('appearance', wrapper.props().appearance);
      expect(droplist).to.have.prop('isTriggerNotTabbable', wrapper.props().isTriggerNotTabbable);
      expect(droplist).to.have.prop('listContext', 'menu');
      expect(droplist).to.have.prop('items', wrapper.state().items);
      expect(droplist).to.have.prop('isOpen', wrapper.state().isOpen);
    });
  });

  describe('show/hide logic', () => {
    it('should be open when the defaultOpen property set to true', () => {
      expect(shallow(<Menu defaultOpen>text</Menu>).state().isOpen).to.be.true;
    });

    it('interacting with trigger should open the dropdown', () => {
      const wrapper = mount(<Menu items={itemsList}><div id="trigger">test</div></Menu>);
      const trigger = wrapper.find('#trigger');
      expect(wrapper.state().isOpen).to.be.false;
      trigger.simulate('click');
      expect(wrapper.state().isOpen).to.be.true;
    });

    // TODO: AK-1299
    // it('interacting with link item should close the dropdown', () => {
    //   const items = [{
    //     heading: 'group',
    //     items: [
    //       { content: 'item 1', href: '#' },
    //     ],
    //   }];
    //   const wrapper = mount(<Menu items={items} defaultOpen>test</Menu>);
    //   const item = wrapper.find('[role="menuitem"]');
    //   expect(wrapper.state().isOpen).to.be.true;
    //   item.simulate('click');
    //   expect(wrapper.state().isOpen).to.be.false;
    // });

    it('interacting with checkbox item should not close the menu', () => {
      const items = [{
        heading: 'group',
        items: [
          { content: 'item 1', type: 'checkbox' },
        ],
      }];
      const wrapper = mount(<Menu items={items} defaultOpen>test</Menu>);
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
      const wrapper = mount(<Menu items={items} defaultOpen>test</Menu>);
      const item = wrapper.find('[role="menuitemradio"]');
      expect(wrapper.state().isOpen).to.be.true;
      item.simulate('click');
      expect(wrapper.state().isOpen).to.be.true;
    });
  });

  describe('onItemActivated', () => {
    it('should be call when an item was activated', () => {
      const items = [{
        heading: 'group',
        items: [
          { content: 'item 1', type: 'checkbox' },
        ],
      }];
      const spy = sinon.spy();
      const wrapper = mount(<Menu items={items} defaultOpen onItemActivated={spy}>
        test</Menu>);
      const item = wrapper.find('[role="menuitemcheckbox"]');
      item.simulate('click');
      expect(spy.called).to.equal(true);
    });

    it('should pass the item when activated', () => {
      const items = [{
        heading: 'group',
        items: [
          { content: 'item 1', type: 'checkbox' },
        ],
      }];
      let attrs;
      const wrapper = mount(<Menu items={items} defaultOpen onItemActivated={a => (attrs = a)}>
        test</Menu>);
      const item = wrapper.find('[role="menuitemcheckbox"]');
      item.simulate('click');
      expect(attrs).to.exist;
      expect(attrs.item).to.exist;
      expect(attrs.item).to.equal(items[0].items[0]);
      expect(attrs.item).to.deep.equal({ content: 'item 1', type: 'checkbox', isChecked: true });
    });
  });

  describe('handleItemActivation', () => {
    describe('radio', () => {
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
        wrapper = mount(<Menu items={items} defaultOpen>test</Menu>);
        handler = wrapper.instance().handleItemActivation;
      });

      it('should set `checked` to true when the radio item is activated', () => {
        handler({ item: item1 });
        const stateItems = wrapper.state('items');
        expect(stateItems[0].items[0].isChecked).to.be.true;
      });

      it('should stay `checked` if the item is activated more then once', () => {
        handler({ item: item1 });
        handler({ item: item1 });
        const stateItems = wrapper.state('items');
        expect(stateItems[0].items[0].isChecked).to.be.true;
      });

      it('should switch `checked` item to the new one, only one item can be checked', () => {
        handler({ item: item1 });
        const stateItems = wrapper.state('items');
        expect(stateItems[0].items[0].isChecked).to.be.true;
        expect(stateItems[0].items[1].isChecked).to.be.false;
        handler({ item: item2 });
        expect(stateItems[0].items[0].isChecked).to.be.false;
        expect(stateItems[0].items[1].isChecked).to.be.true;
      });
    });

    describe('checkbox', () => {
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
        item1 = { content: 'item 1', type: 'checkbox' };
        item2 = { content: 'item 2', type: 'checkbox' };
        group = {
          heading: 'group',
          items: [item1, item2],
        };
        items = [group];
        wrapper = shallow(<Menu items={items} defaultOpen>test</Menu>);
        handler = wrapper.instance().handleItemActivation;
      });

      it('should set `checked` to true when the checkbox item is activated', () => {
        handler({ item: item1 });
        const stateItems = wrapper.state('items');
        expect(stateItems[0].items[0].isChecked).to.be.true;
      });

      it('should toggle `checked` if the item is activated more then once', () => {
        const stateItems = wrapper.state('items');
        handler({ item: item1 });
        handler({ item: item1 });
        expect(stateItems[0].items[0].isChecked).to.be.false;
      });

      it('should not affect neighbours', () => {
        const stateItems = wrapper.state('items');
        handler({ item: item1 });
        expect(stateItems[0].items[0].isChecked).to.be.true;
        expect(stateItems[0].items[1].isChecked).to.be.undefined;
        handler({ item: item2 });
        expect(stateItems[0].items[0].isChecked).to.be.true;
        expect(stateItems[0].items[1].isChecked).to.be.true;
      });
    });
  });
});
